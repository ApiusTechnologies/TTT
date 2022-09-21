from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import viewsets
from itertools import chain
from .models import News, Tag, TwitterAccount, UserProfile, SavedSet
from .serializers import NewsSerializer, TagSerializer, UserProfileSerializer, SavedSetSerializer
from .filters import NewsFilter, TagFilter
from rest_framework.decorators import authentication_classes, permission_classes
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
    
    # def retrieve(self, request, pk=None):
    #     user = None
    #     if pk is None and request.user:
    #         user = get_object_or_404(queryset, user=request.user.id)
    #     else:
    #         user = get_object_or_404(queryset, pk=pk)

    #     serializer = UserProfileSerializer(user)
    #     return Response(serializer.data)

    def get_self(self, request):
        user = get_object_or_404(self.queryset, user=request.user.id)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


# @authentication_classes([])
# @permission_classes([])
class SavedSetViewSet(viewsets.ModelViewSet):
    queryset = SavedSet.objects.all()
    serializer_class = SavedSetSerializer



