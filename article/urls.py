from django.urls import path
from . import views

app_name = 'article'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('article/<int:pk>/', views.article_details, name='details'),
    path('categoria/<slug:category_slug>/', views.category_page, name='category_page'),
]
