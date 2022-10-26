from rest_framework import serializers
from .models import Tag, News, UserProfile, Preset, Keyword, CustomPreset


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


class PresetSerializer(serializers.ModelSerializer):
    keywords = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='value'
    )

    class Meta:
        model = Preset
        fields = ('id', 'name', 'keywords')

class CustomPresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPreset
        fields = ('id', 'name', 'query', 'user_profile')


class UserProfileSerializer(serializers.ModelSerializer):
    presets = PresetSerializer(many=True, read_only=True)
    read_news = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    custom_presets = CustomPresetSerializer(many=True, source='custompreset_set')

    class Meta:
        model = UserProfile
        fields = ('id', 'presets', 'user', 'read_news', 'custom_presets')
