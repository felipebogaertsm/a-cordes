# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.filters import OrderingFilter


class SearchableModelViewSet:
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_fields = "__all__"

    lookup_field = "_id"

    def get_queryset(self):
        return self.model.objects.all()
