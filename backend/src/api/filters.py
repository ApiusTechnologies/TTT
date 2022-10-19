import django_filters
from api.models import News, Tag
from functools import reduce
from operator import or_
from django.db.models import Q


class TagFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(
        field_name='name', lookup_expr='icontains')

    class Meta:
        model = Tag
        fields = ['name']


class ListFilterField(django_filters.Filter):

    def filter(self, queryset, value):

        if not value:
            return queryset

        self.lookup_expr = 'icontains'
        list_values = value.split(',')
        query = Q(summary__icontains=list_values[0])
        for x in list_values[1:]:
            query |= Q(summary__icontains=x)

        return queryset.filter(query)


class NewsFilter(django_filters.FilterSet):

    tags = django_filters.CharFilter(field_name='tags', lookup_expr="name")
    title = django_filters.CharFilter(
        field_name='title', lookup_expr="icontains")
    source = django_filters.CharFilter(
        field_name='source__name', lookup_expr="icontains")
    summary = ListFilterField(field_name='summary')

    class Meta:
        model = News
        fields = ['tags', 'title', 'source', 'summary']
