from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/words/", include("words.urls")),
    path("api/v1/qnaboards/", include("qnaBoards.urls")),
    path("api/v1/users/", include("users.urls")),
    path('', TemplateView.as_view(template_name="index.html")),
]
