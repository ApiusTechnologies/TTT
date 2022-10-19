from django.core.management.base import BaseCommand
from parsers.tasks import handleFeedburner


class Command(BaseCommand):
    help = 'Scraps RSS for RSS'

    def handle(self, *args, **options):
        handleFeedburner()
