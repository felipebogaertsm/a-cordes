# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import BasePermission


class UsersAPIPermissions(BasePermission):
    def is_authenticated(self, request):
        try:
            _id = request.user._id
            return True
        except AttributeError:
            pass

        return False

    def has_permission(self, request, view):
        if self.is_authenticated(request) or request.method == "post":
            return True

        return False

    def has_object_permission(self, request, view, obj):
        user = request.user

        if self.is_authenticated(request) and user.is_admin:
            return True  # admins have permission over everything

        if (
            self.is_authenticated(request) and user._id == obj._id
        ) or request.method == "post":
            return True

        return False
