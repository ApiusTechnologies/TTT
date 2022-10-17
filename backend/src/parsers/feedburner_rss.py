import feedparser
import re
import time
from api.models import News, Tag
from parsers.abstract_parser import AbstractParser
from parsers.models import FeedburnerWebsite


class FeedburnerRss(AbstractParser):

    def __init__(self, sources=None):
        self.sources = sources or FeedburnerWebsite.objects.all()

    def handleAll(self):
        for source in self.sources:
            self._handle(source)

    def _handle(self, source):
        url = source.url
        date_field = source.date_field
        href_field = source.href_field

        NewsFeed = feedparser.parse(url)
        entries = reversed(NewsFeed.entries)
        for entry in entries:
            date = entry[date_field]
            href = entry[href_field]

            title = entry['title']
            summary = entry['summary']

            if not isinstance(date, str):
                date = time.strftime('%Y-%m-%dT%H:%M:%SZ', date)

            news, news_created = News.objects.get_or_create(
                title=title,
                summary=self._remove_html_tags(summary),
                source=source,
                href=href,
                date=date)
            if (news_created):
                for tag_entry in entry['tags']:
                    tag, _ = Tag.objects.get_or_create(name=tag_entry['term'])
                    news.tags.add(tag)

    def _remove_html_tags(self, text):
        clean = re.compile('<.*?>')
        return re.sub(clean, '', text)
