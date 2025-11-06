from django.core.management.base import BaseCommand
from notifications.services import publish_breaking_news

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--title', required=True)
        parser.add_argument('--url', required=True)
        parser.add_argument('--category', default='')
    def handle(self, *args, **options):
        publish_breaking_news(options['title'], options['url'], options['category'])
