from django.core.management.base import BaseCommand
from parsers.feedburner_rss import FeedburnerRss


class Command(BaseCommand):
    help = 'Scraps RSS for RSS'

    def handle(self, *args, **options):
        parser = FeedburnerRss()
        parser.handleAll()
