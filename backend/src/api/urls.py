from .views import NewsViewSet, TagViewSet, UserProfileViewSet, PresetViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag')
router.register(r'presets', PresetViewSet, basename='presets')
router.register(r'userprofile', UserProfileViewSet, basename='userprofile')

urlpatterns = router.urls
