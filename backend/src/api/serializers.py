from rest_framework import serializers
from .models import Tag, News, UserProfile, SavedSet, Keyword


class TagSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ('id', 'name', 'count')

    def get_count(self, obj):
        return obj.news.count()


class NewsSerializer(serializers.ModelSerializer):
    source = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = News
        fields = ('id', 'title', 'summary', 'source', 'href', 'tags', 'date')


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ('id', 'value')


class SavedSetSerializer(serializers.ModelSerializer):
    keywords = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='value'
    )

    class Meta:
        model = SavedSet
        fields = ('id', 'name', 'keywords')


class UserProfileSerializer(serializers.ModelSerializer):
    savedsets = SavedSetSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'savedsets', 'user')
