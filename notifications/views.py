import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import NotificationPreference, NotificationDelivery
from .services import publish_breaking_news
from .tasks import process_pending

@user_passes_test(lambda u: u.is_staff)
@require_http_methods(['POST'])
def publish(request):
    data = json.loads(request.body.decode() or '{}')
    title = data.get('title')
    url = data.get('url')
    category = data.get('category', '')
    if not title or not url:
        return HttpResponseBadRequest('missing fields')
    publish_breaking_news(title, url, category)
    process_pending()
    return JsonResponse({'ok': True})

@login_required
@require_http_methods(['GET'])
def inbox(request):
    deliveries = NotificationDelivery.objects.select_related('notification').filter(user=request.user, channel='site', seen=False).order_by('-created_at')
    items = [{'id': d.id, 'title': d.notification.title, 'url': d.notification.url, 'category': d.notification.category, 'status': d.status, 'created_at': d.created_at} for d in deliveries]
    return JsonResponse({'items': items})

@login_required
@require_http_methods(['POST'])
def ack(request, delivery_id):
    try:
        d = NotificationDelivery.objects.get(id=delivery_id, user=request.user, channel='site')
    except NotificationDelivery.DoesNotExist:
        return HttpResponseBadRequest('not found')
    d.seen = True
    d.status = 'sent'
    d.save(update_fields=['seen','status','updated_at'])
    return JsonResponse({'ok': True})

@login_required
@require_http_methods(['GET','POST'])
def prefs(request):
    if request.method == 'GET':
        pref, _ = NotificationPreference.objects.get_or_create(user=request.user, defaults={'enabled': True, 'channels': {'site': True}, 'categories': []})
        return JsonResponse({'enabled': pref.enabled, 'channels': pref.channels, 'categories': pref.categories})
    data = json.loads(request.body.decode() or '{}')
    pref, _ = NotificationPreference.objects.get_or_create(user=request.user, defaults={'enabled': True, 'channels': {'site': True}, 'categories': []})
    if 'enabled' in data:
        pref.enabled = bool(data['enabled'])
    if 'channels' in data:
        pref.channels = data['channels']
    if 'categories' in data:
        pref.categories = data['categories']
    pref.save()
    return JsonResponse({'enabled': pref.enabled, 'channels': pref.channels, 'categories': pref.categories})
