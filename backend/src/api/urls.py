from django.contrib import admin
from django.urls import path, include, re_path
from .views import NewsViewSet, TagViewSet, UserProfileViewSet, SavedSetViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag')
router.register(r'savedset', SavedSetViewSet, basename='savedset')
router.register(r'userprofile', UserProfileViewSet, basename='userprofile')

# urlpatterns = [
#     path('userprofile/patch_self/', UserProfileViewSet.as_view({"patch" : "patch_self"}), name='userprofile-patch-self'),
#     path('userprofile/get_self/', UserProfileViewSet.as_view({"get" : "get_self"}), name='userprofile-get-self'),
# ]


urlpatterns = router.urls