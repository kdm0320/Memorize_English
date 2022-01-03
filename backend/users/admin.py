from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


@admin.register(models.User)
class UserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Profile",
            {
                "fields": (
                    "nickname",
                    "collection",
                    "voca",
                    "finished_collection",
                    "finished_voca",
                )
            },
        ),
    )
    list_display = (
        "username",
        "nickname",
    )
