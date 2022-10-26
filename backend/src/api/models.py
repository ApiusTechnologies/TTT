from django.db import models
from django.contrib.auth.models import User

from parsers.models import SourceBase


class Tag(models.Model):
    name = models.CharField(name='name', default='', max_length=256)

    def __str__(self):
        return f'{self.name}'


class News(models.Model):
    title = models.CharField(name='title', null=True, max_length=256)
    summary = models.TextField(name='summary')
    source = models.ForeignKey(SourceBase, on_delete=models.DO_NOTHING)
    href = models.CharField(name='href', null=True, max_length=256)
    tags = models.ManyToManyField(Tag, related_name='news')
    date = models.DateTimeField()

    def __str__(self):
        return f'{self.source.name}: {self.date}'

    class Meta:
        ordering = ['-date']
        verbose_name_plural = "News"


class Keyword(models.Model):
    value = models.CharField(name='value', null=True, max_length=256)

    def __str__(self):
        return f'{self.value}'


class Preset(models.Model):
    name = models.CharField(name='name', null=True, max_length=256)
    keywords = models.ManyToManyField(Keyword)

    def __str__(self):
        return f'{self.name}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    presets = models.ManyToManyField(Preset, blank=True)
    read_news = models.ManyToManyField(News, blank=True)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super(UserProfile, self).save(*args, **kwargs)

class CustomPreset(models.Model):
    name = models.CharField(name='name', null=True, max_length=256)
    query = models.CharField(name='query', null=True, max_length=256)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'
