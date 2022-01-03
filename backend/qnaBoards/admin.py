from django.contrib import admin
from . import models


@admin.register(models.QnaBoard)
class Qnadmin(admin.ModelAdmin):
    list_display = (
        "title",
        "writer",
        "views",
    )
