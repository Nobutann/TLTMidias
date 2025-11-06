from django.db import models
from django.conf import settings
from django.utils import timezone

class NotificationPreference(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notification_preference')
    enabled = models.BooleanField(default=True)
    channels = models.JSONField(default=dict)
    categories = models.JSONField(default=list)

class BreakingNewsNotification(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField(unique=True)
    category = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(default=timezone.now)

class NotificationDelivery(models.Model):
    notification = models.ForeignKey(BreakingNewsNotification, on_delete=models.CASCADE, related_name='deliveries')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notification_deliveries')
    channel = models.CharField(max_length=20, choices=[('email','email'),('push','push'),('site','site')])
    status = models.CharField(max_length=20, choices=[('pending','pending'),('sent','sent'),('failed','failed')], default='pending')
    last_error = models.TextField(blank=True)
    retry_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    seen = models.BooleanField(default=False)

    class Meta:
        unique_together = ('notification','user','channel')
