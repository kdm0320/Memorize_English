from rest_framework import serializers

from users.serializers import UserSerializer
from . import models


class WordSerializer(serializers.ModelSerializer):
    user = UserSerializer
    is_learning = serializers.SerializerMethodField()

    class Meta:
        model = models.Word
        fields = (
            "pk",
            "title",
            "is_learning",
        )

    def get_is_learning(self, obj):

        request = self.context.get("request")
        if request:
            user = request.user
            if user.is_authenticated:
                return obj in user.collection.all()

        return False
