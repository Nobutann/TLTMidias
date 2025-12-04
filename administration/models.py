from django.db import models
from django.contrib.auth.models import User

class Columnist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='columnists/', blank=True, null=True)
    theme = models.CharField(max_length=200)

    def __str__(self):
        return self.user.get_full_name() or self.user.username
    