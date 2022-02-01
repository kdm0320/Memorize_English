from django.db import models
from core.models import CoreModel


class QnaBoard(CoreModel):
    title = models.CharField(max_length=30)
    content = models.TextField()
    writer = models.CharField(max_length=30,default="Unknown")
    views = models.IntegerField(default=0)
    is_solved = models.BooleanField(default=False)

    def __str__(self):
        return self.title
