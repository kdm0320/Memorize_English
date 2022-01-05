from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "nickname",
            "collection",
            "user_voca",
            "finished_collection",
            "finished_collection_voca",
            "finished_user_voca",
        )

    read_only_fields = ("id",)
