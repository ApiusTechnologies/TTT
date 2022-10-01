import json
from django.forms.models import model_to_dict
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import viewsets, status
from itertools import chain
from .models import News, Tag, TwitterAccount, UserProfile, SavedSet
from .serializers import NewsSerializer, TagSerializer, UserProfileSerializer, SavedSetSerializer
from .filters import NewsFilter, TagFilter
from rest_framework.decorators import authentication_classes, permission_classes, action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

@authentication_classes([])
@permission_classes([])
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filterset_class = TagFilter

@authentication_classes([])
@permission_classes([])
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filterset_class = NewsFilter

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    @action(methods=['get','patch'], detail=False, url_path='self')
    def handle_self(self, request):
        if(request.method == 'GET'):
            return self.get_self(request)
        elif(request.method == 'PATCH'):
            return self.patch_self(request)

    def get_self(self, request):
        profile = get_object_or_404(self.queryset, user=request.user.id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def patch_self(self, request):
        profile = get_object_or_404(self.queryset, user=request.user.id)
        body = json.loads(request.body)
        savedsets_ids = body['savedsets']
        savedsets = [get_object_or_404(SavedSet, id=savedset_id) for savedset_id in savedsets_ids]
        profile.savedsets.set(savedsets)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)



class SavedSetViewSet(viewsets.ModelViewSet):
    queryset = SavedSet.objects.all()
    serializer_class = SavedSetSerializer
