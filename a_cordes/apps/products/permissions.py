# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework.permissions import BasePermission


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.auth:
            return True
        else:
            return request.method.lower() in ["get"]

    def has_object_permission(self, request, view, obj):
        self.has_permission(self, request, view)
