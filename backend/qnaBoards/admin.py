from django.contrib import admin
from . import models


@admin.register(models.QnABoard)
class QnAAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "writer",
        "views",
    )
