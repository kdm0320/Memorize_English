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
        )


class BigNoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QnaBoard
        exclude = ()
