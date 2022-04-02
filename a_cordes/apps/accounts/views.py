# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from math import perm
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts.models import User, SellerProfile
from apps.accounts.serializers import (
    UserSerializer,
    UserSerializerWithToken,
    SellerProfileSerializer,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["is_superuser"] = user.is_superuser
        token["is_admin"] = user.is_admin
        token["is_staff"] = user.is_staff
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyUserAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Gets the current logged in user serialized with a new set of tokens.
        """
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    def delete(self, request):
        """
        Deletes current logged in user.
        """
        user = request.user
        user.delete()
        return Response("User deleted.")


class UserAPI(APIView):
    def post(self, request, pk=None):
        data = request.data

        if data["password1"] != data["password2"]:
            return Response(
                "Passwords do not match", status=status.HTTP_400_BAD_REQUEST
            )

        new_user = User.objects.create_user(
            email=data["email"],
            password=data["password1"],
        )
        new_user_serializer = UserSerializerWithToken(
            instance=new_user, many=False
        )

        return Response(new_user_serializer.data, status=status.HTTP_200_OK)


class SellerProfileAPI(APIView):
    permission_classes = []

    def get(self, request, pk):
        """
        Gets seller profile from pk.
        """
        seller_profile = SellerProfile.objects.get(_id=pk)

        serializer = SellerProfileSerializer(seller_profile, many=False)
        return Response(serializer.data)


class SellerProfilesAPI(APIView):
    permission_classes = []

    def get(self, request):
        """
        Gets all seller profiles.
        """
        seller_profiles = SellerProfile.objects.all()

        serializer = SellerProfileSerializer(seller_profiles, many=True)
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

    return Response(serializer.data)


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
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


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data

    try:
        user.email = data["email"]
        user.userprofile.first_name = data["firstName"]
        user.userprofile.last_name = data["lastName"]
        user.userprofile.city = data["city"]
        user.userprofile.country = data["country"]

        if data["password"] != "":
            user.password = make_password(data["password"])

        user.save()

        serializer = UserSerializerWithToken(user, many=False)
    except KeyError:
        Response(
            "Not all fields could be updated.",
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_user(request):
    user_for_deletion = User.objects.get(id=pk)
    user_for_deletion.delete()
    return Response("User was deleted.")
