from django.db import models
from django.db.models import SlugField
from administration.models import Columnist

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    
    def __str__(self):
        return self.title

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
   
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='articles')
    
    subcategory = models.ForeignKey('Subcategory', on_delete=models.SET_NULL, null=True, blank=True, related_name='articles') 
    published_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Columnist, on_delete=models.SET_NULL, null=True, related_name='articles')
    slug = models.SlugField(max_length=200, unique=True, null=True)

    image = models.ImageField(upload_to='articles/', blank=True, null=True)

    def __str__(self):
        return self.title

class Subcategory(models.Model):
 
    category = models.ForeignKey(Category, on_delete=models.CASCADE) 
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return f"({self.category.title}) {self.title}"