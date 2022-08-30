from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import viewsets
from itertools import chain
from .models import News, Tag, TwitterAccount
from .serializers import NewsSerializer, TagSerializer, TwitterAccountsSerializer
from .filters import NewsFilter, TagFilter
from rest_framework.decorators import authentication_classes, permission_classes

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

class TwitterAccountViewSet(viewsets.ModelViewSet):
    queryset = TwitterAccount.objects.all()
    serializer_class = TwitterAccountsSerializer
