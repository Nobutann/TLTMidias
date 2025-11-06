from django.contrib import admin
from .models import NotificationPreference, BreakingNewsNotification, NotificationDelivery

@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ('user','enabled')

@admin.register(BreakingNewsNotification)
class BreakingNewsNotificationAdmin(admin.ModelAdmin):
    list_display = ('title','category','published_at','url')

@admin.register(NotificationDelivery)
class NotificationDeliveryAdmin(admin.ModelAdmin):
    list_display = ('notification','user','channel','status','retry_at','seen')
    list_filter = ('channel','status','seen','notification__category')
