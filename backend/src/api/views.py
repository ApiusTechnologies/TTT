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

    @action(methods=['get', 'patch', 'post'], detail=False, url_path='self')
    def handle_self(self, request):
        if (request.method == 'GET'):
            return self.get_self(request)
        elif (request.method == 'PATCH'):
            return self.patch_self(request)
        elif (request.method == 'POST'):
            return self.post_self(request)

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
        if 'custom_presets' in body:
            custom_presets_objects_list = body['custom_presets']

            for element in custom_presets_objects_list:
                current_custom_preset = get_object_or_404(CustomPreset, id=element['id'])
                current_custom_preset.query = element['query']
                current_custom_preset.name = element['name']
                current_custom_preset.save()
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def post_self(self, request):
        profile = get_object_or_404(self.queryset, user=request.user.id)
        body = json.loads(request.body)
        user_id = request.user.id
        # custom_presets_to_create = body['custom_presets']

        print(body)
        if 'delete_id' in body:
            id_to_delete = body['delete_id']
            if(id_to_delete):
                obj = get_object_or_404(CustomPreset, id=id_to_delete)
                if(obj.user_profile_id == user_id):
                    CustomPreset.objects.filter(id=id_to_delete).delete()
        else:
            cp = CustomPreset(name='New Custom', query="", user_profile_id=user_id)
            cp.save()
            
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
