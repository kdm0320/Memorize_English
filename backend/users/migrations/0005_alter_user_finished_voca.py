# Generated by Django 4.0.1 on 2022-01-29 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_user_nickname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='finished_voca',
            field=models.JSONField(default=[], null=True),
        ),
    ]