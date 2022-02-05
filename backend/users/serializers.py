from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from . import models
from rest_framework import status
from rest_framework.exceptions import APIException

class UniqueEmailException(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Error Message'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            "id",
            "avatar",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "collection",
            "finished_voca",

   
        )
    read_only_fields = ("id","username")

    def create(self, validated_data):
        password = validated_data.get("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user