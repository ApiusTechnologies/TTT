from django.contrib import admin
from .models import Tag, News, Keyword, SavedSet, UserProfile


admin.site.register(Tag)
admin.site.register(News)
admin.site.register(Keyword)
admin.site.register(SavedSet)
admin.site.register(UserProfile)
