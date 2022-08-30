from django.db import models
from datetime import datetime, timedelta


class Tag(models.Model):
    name = models.CharField(name='name', default='', max_length=256)

    def __str__(self):
        return f'{self.name}'


class News(models.Model):
    title = models.CharField(name='title', null=True, max_length=256)
    summary = models.TextField(name='summary')
    source = models.CharField(name='source', max_length=256)
    href = models.CharField(name='href', null=True, max_length=256)
    tags = models.ManyToManyField(Tag, related_name='news')
    date = models.DateTimeField()

    def __str__(self):
        return f'{self.source}: {self.date}'

    class Meta:
        ordering = ['-date']
        verbose_name_plural = "News"

class TwitterAccount(models.Model):
    name = models.CharField(name='name', max_length=256)
    user_id = models.CharField(name='user_id', max_length=256)

    def __str__(self):
        return f'{self.name}: {self.user_id}'
