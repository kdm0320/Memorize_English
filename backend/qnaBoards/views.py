from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import action

from .serializers import NoticeSerializer
from .models import QnaBoard
from .permissons import IsWriter


class QnaBoardViewSet(ModelViewSet):
    queryset = QnaBoard.objects.all()
    serializer_class = NoticeSerializer

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [permissions.AllowAny]
        elif self.action == "create":
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsWriter]
        return [permission() for permission in permission_classes]
