from django.urls import path
from . import views

urlpatterns = [
    path('publish/', views.publish, name='notifications_publish'),
    path('inbox/', views.inbox, name='notifications_inbox'),
    path('ack/<int:delivery_id>/', views.ack, name='notifications_ack'),
    path('prefs/', views.prefs, name='notifications_prefs'),
]
