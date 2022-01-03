# Generated by Django 4.0 on 2022-01-03 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserBoard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=30)),
                ('content', models.TextField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='')),
                ('views', models.IntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
