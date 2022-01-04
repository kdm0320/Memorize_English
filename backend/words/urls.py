# from rest_framework.routers import DefaultRouter
# from . import views
from django.urls import path

# from rest_framework import urlpatterns
from . import views

app_name = "words"

urlpatterns = [
    path("", views.ListWordsView.as_view()),
    path("<int:pk>/", views.SeeWordView.as_view()),
]

# router = DefaultRouter()
# router.register("")
