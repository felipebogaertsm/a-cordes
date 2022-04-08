# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework.permissions import BasePermission, SAFE_METHODS


class UsersAPIPermissions(BasePermission):
    def has_permission(self, request, view):
        if request.auth and request.user.is_admin:
            return True  # admins have permission over all

        if request.method in ["post"]:  # user creation
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.auth:
            if obj._id == request.user._id or request.user.is_admin:
                return True

        return False
