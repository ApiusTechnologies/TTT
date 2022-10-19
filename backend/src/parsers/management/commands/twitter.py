from django.core.management.base import BaseCommand
from parsers.tasks import handleTwitter


class Command(BaseCommand):
    help = 'Scraps Twitter for tweets'

    def handle(self, *args, **options):
        handleTwitter()
