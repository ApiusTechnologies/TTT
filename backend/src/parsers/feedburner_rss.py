import feedparser
import re
import time
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from urllib.parse import urlparse
from api.models import News, Tag


class FeedburnerRss:
    def remove_html_tags(self, text):
        clean = re.compile('<.*?>')
        return re.sub(clean, '', text)

    def __init__(self, url, href_field, date_field):
        self.url = url
        self.href_field = href_field
        self.date_field = date_field

    def handle(self, *args, **options):
        NewsFeed = feedparser.parse(self.url)
        entries = reversed(NewsFeed.entries)
        for entry in entries:
            date = entry[self.date_field]
            href = entry[self.href_field]

            parsedDomain = urlparse(href)
            source = parsedDomain.netloc.replace('www.', '')
            title = entry['title']
            summary = entry['summary']

            if type(date) is not str:
                date = time.strftime('%Y-%m-%dT%H:%M:%SZ', date)

            news, news_created = News.objects.get_or_create(
                title=title,
                summary=self.remove_html_tags(summary),
                source=source,
                href=href,
                date=date)
            if(news_created):
                for tag_entry in entry['tags']:
                    tag, _ = Tag.objects.get_or_create(name=tag_entry['term'])
                    news.tags.add(tag)
