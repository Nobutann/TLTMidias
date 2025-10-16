from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('categoria/<slug:slug>/', views.category_articles, name='categoria'),
    path('subcategoria/<slug:slug>/', views.subcategory_articles, name='subcategoria'),
    path('artigo/<slug:slug>/', views.article_detail, name='artigo'),
    path('publish/', views.publish_article, name = 'publish_article'),
    path('edit/<int:pk>/', views.edit_article, name= 'edit_article'),
    path('delete/<int:pk>/', views.delete_article, name= 'delete_article'),
]
