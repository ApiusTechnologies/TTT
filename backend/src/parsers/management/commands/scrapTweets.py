from django.core.management.base import BaseCommand
from parsers.twitter_parser import TwitterParser
from django.conf import settings



class Command(BaseCommand):
    help = 'Scraps Twitter for tweets'

    def __init__(self):
        self.SOURCE_LIST = settings.TWITTER_SOURCE_LIST

    def handle(self, *args, **options):
        for i in self.SOURCE_LIST:
            parser = TwitterParser(i["id"], i["name"])
            parser.handle()

