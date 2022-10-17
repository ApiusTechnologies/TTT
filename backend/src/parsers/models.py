from django.db import models
from polymorphic.models import PolymorphicModel


class SourceBase(PolymorphicModel):
    name = models.CharField(name='name', max_length=64)

    def __str__(self):
        return self.name


class TwitterAccount(SourceBase):
    user_id = models.CharField(name='user_id', max_length=32)


class FeedburnerWebsite(SourceBase):
    url = models.CharField(name='url', max_length=256)
    href_field = models.CharField(name='href_field', max_length=32)
    date_field = models.CharField(name='date_field', max_length=32)
