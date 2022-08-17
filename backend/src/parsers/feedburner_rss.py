import feedparser
import re
import time
from django.core.management.base import BaseCommand, CommandError
from urllib.parse import urlparse
from parsers.abstract_parser import AbstractParser
from api.models import News, Tag


class FeedburnerRss(AbstractParser):

    def __init__(self, sources):
        self.sources = sources

    def handleAll(self):
        for source in self.sources:
            self._handle(
                source["url"],
                source["href_field"],
                source["date_field"]
            )

    def _handle(self, url, href_field, date_field):
        NewsFeed = feedparser.parse(url)
        entries = reversed(NewsFeed.entries)
        for entry in entries:
            date = entry[date_field]
            href = entry[href_field]

            parsedDomain = urlparse(href)
            source = parsedDomain.netloc.replace('www.', '')
            title = entry['title']
            summary = entry['summary']

            if type(date) is not str:
                date = time.strftime('%Y-%m-%dT%H:%M:%SZ', date)

            news, news_created = News.objects.get_or_create(
                title=title,
                summary=self._remove_html_tags(summary),
                source=source,
                href=href,
                date=date)
            if(news_created):
                for tag_entry in entry['tags']:
                    tag, _ = Tag.objects.get_or_create(name=tag_entry['term'])
                    news.tags.add(tag)

    def _remove_html_tags(self, text):
        clean = re.compile('<.*?>')
        return re.sub(clean, '', text)
