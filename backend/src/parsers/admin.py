from django.contrib import admin
from .models import SourceBase, TwitterAccount, FeedburnerWebsite


admin.site.register(SourceBase)
admin.site.register(TwitterAccount)
admin.site.register(FeedburnerWebsite)
