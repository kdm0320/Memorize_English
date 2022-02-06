from django.db import models
from core.models import CoreModel


class QnaBoard(CoreModel):
    title = models.CharField(max_length=30)
    content = models.TextField()
    writer = models.ForeignKey("users.User",on_delete=models.CASCADE,related_name="wirter")
    views = models.IntegerField(default=0)
    is_solved = models.BooleanField(default=False)

    def __str__(self):
        return self.title
