from django.db import models

class Categories(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
