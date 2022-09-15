from rest_framework import serializers
from .models import Tag, News, TwitterAccount, UserProfile

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'summary', 'source', 'href', 'tags', 'date')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('savedsets','user', )


