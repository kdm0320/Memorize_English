from rest_framework import serializers
from . import models


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserBoard
        fields = (
            "pk",
            "title",
            "content",
            "writer",
            "views",
        )
