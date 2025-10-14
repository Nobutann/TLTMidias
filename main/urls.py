from django.urls import path
from . import views  # Importa as views do app atual


urlpatterns = [
    path('', views.home, name='home'),
]
