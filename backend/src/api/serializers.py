from rest_framework import serializers
from .models import Tag, News


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('id', 'title', 'summary', 'source', 'href', 'tags', 'date')
