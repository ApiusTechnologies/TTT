from .views import NewsViewSet, TagViewSet, UserProfileViewSet, SavedSetViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag')
router.register(r'savedset', SavedSetViewSet, basename='savedset')
router.register(r'userprofile', UserProfileViewSet, basename='userprofile')

urlpatterns = router.urls
