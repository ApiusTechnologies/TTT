from django.core.management.base import BaseCommand
from parsers.twitter_parser import TwitterParser
from django.conf import settings
from api.models import TwitterAccount


class Command(BaseCommand):
    help = 'Scraps Twitter for tweets'

    def __init__(self):
        self.SOURCE_LIST = TwitterAccount.objects.all()

    def handle(self, *args, **options):
        for i in self.SOURCE_LIST:
            parser = TwitterParser(i.user_id, i.name)
            parser.handle()

