from django.db import models


class Word(models.Model):
    wordsets = models.TextField()
