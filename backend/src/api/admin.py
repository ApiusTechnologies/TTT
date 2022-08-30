from django.contrib import admin
from .models import Tag, News, TwitterAccount
# Register your models here.
admin.site.register(Tag)
admin.site.register(News)
admin.site.register(TwitterAccount)