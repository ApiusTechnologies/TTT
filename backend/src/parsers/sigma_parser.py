import logging
import os
from api.models import News, Tag
from parsers.models import Sigma
from parsers.abstract_parser import AbstractParser
import yaml
from yaml.loader import SafeLoader
from datetime import datetime

class SigmaParser(AbstractParser):
    logger = logging.getLogger(__name__)

    def __init__(self, source=None):
        self.source = source or Sigma.objects.all()

    def save_rule_to_db(self, data, repoPath, source):
        title = data["title"]
        summary = f'{data["description"]}\nStatus: {data.get("status")}\nLevel: {data.get("level")}\nFalsepositives: {data.get("falsepositives")}\nReferences: {data.get("references")}'
        repoPathAsString = "/".join(repoPath)
        href = f'https://github.com/SigmaHQ/sigma/blob/master/rules/{repoPathAsString}'

        news, news_created = News.objects.get_or_create(
            title=title, summary=summary, source=source, href=href)

        if (news_created):
            news.date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            news.save()
            for rp in repoPath[:-1]:
                tag, _ = Tag.objects.get_or_create(name=rp)
                news.tags.add(tag)
            origin_tags = data.get("tags")
            if origin_tags:
                for ot in origin_tags:
                    originTag, _ = Tag.objects.get_or_create(name=ot)
                    news.tags.add(originTag)
            

    def _handle(self, source):
        print(os.popen("cd ./sigma/ && git pull").read())
        rule_paths = os.popen(f"find ./sigma/rules -type f | sed -e 's/.\/sigma\/rules\///'g").read().split("\n")
        rules = set()
        for x in rule_paths:
            rules.add(tuple(x.split("/")))
        
        for x in rules:
            if(len(x) == 2):
                with open(f'./sigma/rules/{x[0]}/{x[1]}') as f:
                    data = yaml.load(f, Loader=SafeLoader)
                    self.save_rule_to_db(data, x, source)
            if(len(x) == 3):
                with open(f'./sigma/rules/{x[0]}/{x[1]}/{x[2]}') as f:
                    data = yaml.load(f, Loader=SafeLoader)
                    self.save_rule_to_db(data, x, source)
            if(len(x) == 4):
                with open(f'./sigma/rules/{x[0]}/{x[1]}/{x[2]}/{x[3]}') as f:
                    data = yaml.load(f, Loader=SafeLoader)
                    self.save_rule_to_db(data, x, source)

    def handleAll(self):
        for s in self.source:
            self._handle(s)
