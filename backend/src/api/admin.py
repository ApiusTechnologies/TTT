from django.contrib import admin
from .models import Tag, News, Keyword, Preset, UserProfile, CustomPreset


admin.site.register(Tag)
admin.site.register(News)
admin.site.register(Keyword)
admin.site.register(Preset)
admin.site.register(UserProfile)
admin.site.register(CustomPreset)
