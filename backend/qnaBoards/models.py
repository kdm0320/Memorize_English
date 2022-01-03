from django.db import models
from core.models import CoreModel


class QnABoard(CoreModel):
    title = models.CharField(max_length=30)
    content = models.TextField()
    writer = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="qna"
    )
    photo = models.ImageField(null=True, blank=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title
