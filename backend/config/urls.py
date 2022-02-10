from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/words/", include("words.urls")),
    path("api/v1/qnaboards/", include("qnaBoards.urls")),
    path("api/v1/users/", include("users.urls")),
]
