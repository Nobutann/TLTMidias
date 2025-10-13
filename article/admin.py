from django.contrib import admin
from .models import Categories, Article, Subcategory

admin.site.register(Categories)
admin.site.register(Article)
admin.site.register(Subcategory)
