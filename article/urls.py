from django.urls import path
from . import views

app_name = 'article'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('publish/', views.publish_article, name = 'publish_article'),
    path('edit/<int:pk>/', views.edit_article, name= 'edit_article'),
    path('delete/<int:pk>/', views.delete_article, name= 'delete_article'),
    path('article/<int:pk>/', views.article_details, name='details'),
    path('categoria/<slug:category_slug>/', views.category_page, name='category_page'),
]
