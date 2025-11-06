from django.core.management.base import BaseCommand
from notifications.tasks import process_pending

class Command(BaseCommand):
    def handle(self, *args, **options):
        process_pending()
