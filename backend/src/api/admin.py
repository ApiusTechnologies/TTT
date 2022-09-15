from django.contrib import admin
from .models import Tag, News, TwitterAccount, Keyword, SavedSet, UserProfile
# Register your models here.
admin.site.register(Tag)
admin.site.register(News)
admin.site.register(TwitterAccount)
admin.site.register(Keyword)
admin.site.register(SavedSet)
admin.site.register(UserProfile)
