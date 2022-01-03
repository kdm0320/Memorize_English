from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    collection = models.TextField(blank=True)
    voca = models.TextField(blank=True)
    finished_collection = models.TextField(blank=True)
    finished_voca = models.TextField(blank=True)

    def __str__(self):
        return self.username
