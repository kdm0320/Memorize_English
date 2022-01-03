from django.contrib import admin
from . import models


@admin.register(models.Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ("wordsets",)
