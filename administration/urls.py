from django.urls import path
from . import views

app_name = 'administration'

urlpatterns = [
    path('columnists/', views.columnists_page, name='columnists_page'),   
    path('publish/', views.publish_article, name = 'publish_article'),
    path('manage/', views.manage_articles, name='manage_articles'),
    path('edit/<slug:slug>/', views.edit_article, name= 'edit_article'),
    path('delete/<slug:slug>/', views.delete_article, name= 'delete_article'),
    path('', views.dashboard_login, name='dashboard_login'),
]