from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from words.serializers import WordSerializer
from words.models import Word
from .serializers import UserSerializer
from .models import User
from .permissions import IsSelf

import jwt


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [permissions.IsAdminUser]
        elif self.action == "create":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsSelf]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["POST"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(statue=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            encoded_jwt = jwt.encode(
                {"pk": user.pk}, settings.SECRET_KEY, algorithm="HS256"
            )
            return Response(data={"token": encoded_jwt, "id": user.pk})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True)
    def collection(self, request, pk):
        user = self.get_object()
        serializer = WordSerializer(user.collection.all(), many=True).data
        return Response(serializer)

    @collection.mapping.put
    def add_collection(self, request, pk):
        pk = request.data.get("pk", None)
        user = self.get_object()
        if pk is not None:
            try:
                word = Word.objects.get(pk=pk)
                if word in user.collection.all():
                    user.collection.remove(word)
                else:
                    user.collection.add(word)
                return Response()
            except Word.DoesNotExist:
                pass
        return Response(status=status.HTTP_400_BAD_REQUEST)


class CollectionView(APIView):

    permission_classes = [permissions.IsAuthenticated]
