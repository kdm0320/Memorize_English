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
                    "collection",
                    "finished_voca",
                )
            },
        ),
    )
    list_display = (
        "username",
    )

    filter_horizontal = ("collection",)
