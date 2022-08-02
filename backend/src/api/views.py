from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import viewsets
from itertools import chain

from .models import News, Tag
from .serializers import NewsSerializer, TagSerializer
from .filters import NewsFilter, TagFilter

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filterset_class = TagFilter

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filterset_class = NewsFilter