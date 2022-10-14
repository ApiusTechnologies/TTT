from django.contrib import admin
from .models import TwitterAccount, FeedburnerWebsite


admin.site.register(TwitterAccount)
admin.site.register(FeedburnerWebsite)
