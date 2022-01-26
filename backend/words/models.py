from email.policy import default
from django.db import models


class Word(models.Model):
    title = models.CharField(max_length=100)
    content = models.JSONField(default=[])

    def __str__(self):
        return self.title
