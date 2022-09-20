from django.db import models
from datetime import datetime, timedelta
from django.contrib.auth.models import User

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


class Keyword(models.Model):
    value = models.CharField(name='value', null=True, max_length=256)

    def __str__(self):
        return f'{self.value}'

class SavedSet(models.Model):
    name = models.CharField(name='name', null=True, max_length=256)
    keywords = models.ManyToManyField(Keyword)

    def __str__(self):
        return f'{self.name}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    savedsets = models.ManyToManyField(SavedSet, blank=True)

    def __str__(self):
        return self.user.username