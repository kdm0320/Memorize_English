from rest_framework import serializers
from . import models


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QnaBoard
        fields = (
            "pk",
            "title",
            "content",
            "writer",
            "views",
            "is_solved",
            "created",
        )
    read_only_fields = ("pk","created")

class NoticeViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QnaBoard
        fields = (
            "pk",
            "title",
            "content",
            "writer",
            "views",
            "is_solved",
            "created",
        )
    read_only_fields = ("pk","created","writer","is_solved","title","content")