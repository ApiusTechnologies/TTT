from rest_framework import serializers
from .models import Tag, News, TwitterAccount, UserProfile, SavedSet, Keyword

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'summary', 'source', 'href', 'tags', 'date')

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ('id', 'value')

class SavedSetSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True, read_only=True)
    class Meta:
        model = SavedSet
        fields = ('id', 'name', 'keywords',)
        
class UserProfileSerializer(serializers.ModelSerializer):
    savedsets = SavedSetSerializer(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = ('savedsets','user', )
