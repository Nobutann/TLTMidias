# article/models.py (Conteúdo COMPLETO)

from django.db import models
from django.db.models import SlugField # Se você usa o SlugField

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    
    def __str__(self):
        return self.title

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    # FK para Category (Obrigatório para o Cenário 3)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='articles')
    # Opcional, mas altamente recomendado para subcategoria, se quiser filtrar por ela
    subcategory = models.ForeignKey('Subcategory', on_delete=models.SET_NULL, null=True, blank=True, related_name='articles') 
    published_date = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, unique=True, null=True) # Campo para URL amigável

    def __str__(self):
        return self.title

class Subcategory(models.Model):
    # FK para Category (Obrigatório para o Cenário 1)
    category = models.ForeignKey(Category, on_delete=models.CASCADE) 
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return f"({self.category.title}) {self.title}"