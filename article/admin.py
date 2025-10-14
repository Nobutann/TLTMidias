# article/admin.py (Conteúdo CORRETO)

from django.contrib import admin
# IMPORTAÇÃO CORRETA: Todos os nomes de modelo no singular e com letra maiúscula
from .models import Category, Subcategory, Article 

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Article)