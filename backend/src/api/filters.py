import django_filters
from api.models import News, Tag

class TagFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Tag
        fields = ['name']

class NewsFilter(django_filters.FilterSet):
    
    tags = django_filters.CharFilter(field_name='tags', lookup_expr="name")
    title = django_filters.CharFilter(field_name='title', lookup_expr="icontains")
    source = django_filters.CharFilter(field_name='source', lookup_expr="icontains")

    class Meta:
        model = News
        fields = ['tags', 'title', 'source']