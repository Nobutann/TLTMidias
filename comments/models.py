from django.db import models
from article.models import Article

class Comments(models.Model):
    article = models.ForeignKey(Article, related_name="comments", on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Responses(models.Model):
    author = models.CharField(max_length=100)
    comment = models.ForeignKey(Comments, related_name='responses', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
