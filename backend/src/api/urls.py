from django.contrib import admin
from django.urls import path, include, re_path
from .views import NewsViewSet, TagViewSet, RegisterView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag') 

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register_atuh'),
]
urlpatterns += router.urls