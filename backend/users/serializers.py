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
            "username",
            "first_name",
            "last_name",
            "email",
            "collection",
            "finished_voca",
   
        )
    read_only_fields = ("id",)
