# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br


from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer, UserSerializerWithToken


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    """
    Returns all registered users.
    """
    users = User.objects.filter()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def register_user(request):
    """
    Registers user.
    """
    data = request.data

    try:
        user = User.objects.create_user(
            email=data["email"],
            password=data["password"],
        )
    except:
        message = {"detail": "User creation failed."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializerWithToken(user, many=False)
