from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Transaction(models.Model):
    category = models.TextField()
    date = models.DateField()
    users = models.ManyToManyField(User)
    amount = models.IntegerField()
    count_splitters = models.IntegerField()

class FriendshipKey(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    key = models.TextField()

