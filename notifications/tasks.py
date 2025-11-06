from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.db.models import Q
from datetime import timedelta
from .models import NotificationDelivery

def send_email(delivery):
    subject = 'Breaking news'
    msg = delivery.notification.title + '\n' + delivery.notification.url
    if getattr(settings, 'NOTIFICATIONS_EMAIL_SIMULATE_FAILURE', False):
        raise RuntimeError('simulated failure')
    if not delivery.user.email:
        raise RuntimeError('missing email')
    send_mail(subject, msg, getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@example.com'), [delivery.user.email])

def send_push(delivery):
    raise RuntimeError('push not configured')

def send_site(delivery):
    pass

def process_pending(now=None):
    now = now or timezone.now()
    qs = NotificationDelivery.objects.select_related('notification','user').filter(Q(retry_at__isnull=True) | Q(retry_at__lte=now)).filter(status__in=['pending','failed'])
    for d in qs:
        try:
            if d.channel == 'email':
                send_email(d)
            elif d.channel == 'push':
                send_push(d)
            elif d.channel == 'site':
                send_site(d)
            d.status = 'sent'
            d.last_error = ''
            d.retry_at = None
            d.save(update_fields=['status','last_error','retry_at','updated_at'])
        except Exception as e:
            d.status = 'failed'
            d.last_error = str(e)
            d.retry_at = now + timedelta(minutes=getattr(settings, 'NOTIFICATIONS_RETRY_MINUTES', 5))
            d.save(update_fields=['status','last_error','retry_at','updated_at'])
