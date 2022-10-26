import json
from rest_framework.viewsets import ModelViewSet
from .models import News, Tag, UserProfile, Preset, CustomPreset
from .serializers import NewsSerializer, TagSerializer, UserProfileSerializer, PresetSerializer, CustomPresetSerializer
from .filters import NewsFilter, TagFilter
from rest_framework.decorators import authentication_classes, permission_classes, action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filterset_class = TagFilter


class NewsViewSet(ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filterset_class = NewsFilter


class PresetViewSet(ModelViewSet):
    queryset = Preset.objects.all()
    serializer_class = PresetSerializer

class CustomPresetViewSet(ModelViewSet):
    queryset = CustomPreset.objects.all()
    serializer_class = CustomPresetSerializer

@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @action(methods=['get', 'patch'], detail=False, url_path='self')
    def handle_self(self, request):
        if (request.method == 'GET'):
            return self.get_self(request)
        elif (request.method == 'PATCH'):
            return self.patch_self(request)

    def get_self(self, request):
        profile = get_object_or_404(self.queryset, user=request.user.id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def patch_self(self, request):
        profile = get_object_or_404(self.queryset, user=request.user.id)
        body = json.loads(request.body)
        if 'presets' in body:
            presets_ids = body['presets']
            presets = [get_object_or_404(Preset, id=preset_id)
                       for preset_id in presets_ids]
            profile.presets.set(presets)
        if 'read_news' in body:
            read_news_ids = body['read_news']
            profile.read_news.add(*read_news_ids)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
