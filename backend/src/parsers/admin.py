from django.contrib import admin
from .models import TwitterAccount, FeedburnerWebsite, Sigma


admin.site.register(TwitterAccount)
admin.site.register(FeedburnerWebsite)
admin.site.register(Sigma)

