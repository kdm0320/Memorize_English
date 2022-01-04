from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import WordSerializer, BigWordSerializer
from .models import Word


class ListWordsView(ListAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class SeeWordView(RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = BigWordSerializer
