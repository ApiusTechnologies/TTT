import json
from rest_framework.viewsets import ModelViewSet
from .models import News, Tag, UserProfile, SavedSet
from .serializers import NewsSerializer, TagSerializer, UserProfileSerializer, SavedSetSerializer
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


class SavedSetViewSet(ModelViewSet):
    queryset = SavedSet.objects.all()
    serializer_class = SavedSetSerializer


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
        savedsets_ids = body['savedsets']
        savedsets = [get_object_or_404(SavedSet, id=savedset_id)
                     for savedset_id in savedsets_ids]
        profile.savedsets.set(savedsets)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
