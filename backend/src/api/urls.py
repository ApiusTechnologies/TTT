from django.contrib import admin
from django.urls import path, include, re_path
from .views import NewsViewSet, TagViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'tag', TagViewSet, basename='tag')

urlpatterns = router.urls
# urlpatterns = [
#     path('news/', NewsListView.as_view()),
#     re_path('^single_news/(?P<news_id>.+)/$', NewsFilterIDView.as_view()),
#     re_path('^news_by_source/(?P<source>.+)/$', NewsFilterSourceView.as_view()),
#     re_path('^news_by_tag/(?P<tag>.+)/$', NewsFilterTagView.as_view()),


# ]