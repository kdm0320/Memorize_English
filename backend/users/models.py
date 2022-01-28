from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    collection = models.ManyToManyField(
        "words.Word", related_name="collection", blank=True
    )
    finished_voca = models.JSONField(default='{}', null=True)

    def __str__(self):
        return self.username
