# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer, UserSerializerWithToken


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


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    """
    Returns all registered users.
    """
    users = User.objects.filter()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.email = data["email"]
    user.is_active = data["is_active"]
    user.is_staff = data["is_staff"]
    user.is_admin = data["is_admin"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()

    serializer = UserSerializerWithToken(user, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_user(request):
    user_for_deletion = User.objects.get(id=pk)
    user_for_deletion.delete()
    return Response("User was deleted.")
