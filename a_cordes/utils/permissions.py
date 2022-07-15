# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method.lower() in ["get"]


class EditIfObjectIsMine(BasePermission):
    def has_permission(self, request, view):
        if request.method not in SAFE_METHODS:
            try:
                requested_user_id = str(
                    request.data[view.protected_user_id_field_name]
                )
                if requested_user_id != str(request.user._id):
                    return False
            except (AttributeError, KeyError):
                return False

        return True

    def has_object_permission(self, request, view, obj):
        if obj.user == request.user:
            return True

        return False
