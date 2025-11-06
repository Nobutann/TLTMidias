from django.db import transaction
from .models import NotificationPreference, BreakingNewsNotification, NotificationDelivery
from django.utils import timezone

def ensure_channels(ch):
    d = {'email': False, 'push': False, 'site': True}
    if ch:
        d.update(ch)
    return d

@transaction.atomic
def publish_breaking_news(title, url, category=''):
    n, _ = BreakingNewsNotification.objects.get_or_create(url=url, defaults={'title': title, 'category': category, 'published_at': timezone.now()})
    prefs = NotificationPreference.objects.filter(enabled=True).select_related('user')
    for pref in prefs:
        cats = pref.categories or []
        if cats and category and category not in cats:
            continue
        channels = ensure_channels(pref.channels)
        for ch, enabled in channels.items():
            if enabled:
                NotificationDelivery.objects.get_or_create(notification=n, user=pref.user, channel=ch)
    return n.id
