from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'), 
    path('categoria/<slug:slug>/', views.category_articles, name='categoria'),
    path('subcategoria/<slug:slug>/', views.subcategory_articles, name='subcategoria'),
]