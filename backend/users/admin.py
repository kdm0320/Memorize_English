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
                    "user_voca",
                    "finished_collection",
                    "finished_collection_voca",
                    "finished_user_voca",
                )
            },
        ),
    )
    list_display = (
        "username",
        "nickname",
    )

    filter_horizontal = ("collection",)
