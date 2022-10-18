from rest_framework.pagination import LimitOffsetPagination
from rest_framework.utils.urls import replace_query_param
from rest_framework.response import Response
from collections import OrderedDict


class NoHostnameLimitOffsetPagination(LimitOffsetPagination):

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.count),
            ('next', self.get_next_link()),
            ('results', data)
        ]))

    def get_next_link(self):
        if self.offset + self.limit >= self.count:
            return None

        url = self.request.get_full_path()[1:]
        url = replace_query_param(url, self.limit_query_param, self.limit)

        offset = self.offset + self.limit
        return replace_query_param(url, self.offset_query_param, offset)
