# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet


class SearchableModelViewSet(ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = "__all__"

    lookup_field = "_id"

    def get_queryset(self):
        return self.model.objects.all()
