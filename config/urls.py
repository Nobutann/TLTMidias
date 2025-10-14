from django.contrib import admin
from django.urls import path, include # Adicione 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    # Inclui todas as URLs do arquivo 'main/urls.py'
    # quando o usuário acessar a raiz do site.
    path('', include('main.urls')),
]