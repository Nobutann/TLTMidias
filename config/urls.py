from django.contrib import admin
from django.urls import path, include
from article import views # (Não usado aqui, mas pode ser mantido)

# Se quiser voltar a visualizar FrontEnd de Marco so tirar o path article.urls#

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('article.urls')),     
]
