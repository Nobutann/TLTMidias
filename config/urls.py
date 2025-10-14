"""
URL configuration for JornalDoCommercio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# config/urls.py (Conteúdo CORRETO)

from django.contrib import admin
from django.urls import path, include 
# REMOVA A LINHA: from article import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # REMOVA A LINHA: path('', views.home, name='home'),
    
    # Esta linha faz todo o trabalho de roteamento para o app 'article'
    path('', include('article.urls')), 
]