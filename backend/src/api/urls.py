from django.contrib import admin
from django.urls import path, include, re_path
from .views import NewsViewSet, TagViewSet, TwitterAccountViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag')
router.register(r'twitterAccount', TwitterAccountViewSet, basename='twitterAccount') 


urlpatterns = router.urls