from django.contrib import admin
from . import models


@admin.register(models.UserBoard)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "writer",
        "views",
    )
