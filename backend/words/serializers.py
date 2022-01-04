from rest_framework import serializers
from . import models


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Word
        fields = ("pk", "title", "content")


class BigWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Word
        exclude = ()
