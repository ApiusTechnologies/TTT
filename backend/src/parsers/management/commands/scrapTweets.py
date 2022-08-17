from django.conf import settings
from django.core.management.base import BaseCommand
from parsers.twitter_parser import TwitterParser


class Command(BaseCommand):
    help = 'Scraps Twitter for tweets'

    def handle(self, *args, **options):
        parser = TwitterParser(settings.TWITTER_SOURCE_LIST)
        parser.handleAll()
