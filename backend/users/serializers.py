from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "collection",
            "finished_voca",

   
        )
    read_only_fields = ("id","username","password")

    def create(self, validated_data):
        password = validated_data.get("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user