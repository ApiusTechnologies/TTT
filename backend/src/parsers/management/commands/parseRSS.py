from django.core.management.base import BaseCommand
from parsers.feedburner_rss import FeedburnerRss

class Command(BaseCommand):
    help = 'Scraps RSS for RSS'

    def handle(self, *args, **options):
        FeedburnerRss("https://www.cert.pl/feed/",
                      "link", 'published_parsed').handle()
        FeedburnerRss("http://feeds.feedburner.com/sekurak",
                      "link", 'published_parsed').handle()
        FeedburnerRss("https://feeds.feedburner.com/niebezpiecznik/",
                      "link", 'updated').handle()
