from django.core.management.base import BaseCommand
from parsers.twitter_parser import TwitterParser


class Command(BaseCommand):
    help = 'Scraps Twitter for tweets'

    def handle(self, *args, **options):
        parser = TwitterParser()
        parser.handleAll()
