# Generated by Django 4.1.2 on 2022-10-23 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_delete_twitteraccount_alter_news_source'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='read_news',
            field=models.ManyToManyField(blank=True, to='api.news'),
        ),
    ]
