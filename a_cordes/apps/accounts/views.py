# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts.models import User, SellerProfile
from apps.accounts.permissions import UsersAPIPermissions
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


class UsersAPI(ModelViewSet):
    model = User
    serializer_class = UserSerializerWithToken

    permission_classes = (UsersAPIPermissions,)
    lookup_field = "_id"
    queryset = model.objects.all()

    @action(
        detail=False,
        url_path="my",
        permission_classes=[IsAuthenticated],
        methods=("GET", "PATCH", "PUT", "DELETE"),
    )
    def my(self, request):
        user = request.user

        if request.method.lower() == "get":
            return Response(UserSerializerWithToken(user, many=False).data)
        elif request.method.lower() in ["patch", "put"]:
            serializer = UserSerializerWithToken(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        elif request.method.lower() == "delete":
            user.delete()
            return Response({"message": "User deleted."})

        return Response(
            {"message": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @action(
        detail=True,
        url_path="set-password",
        permission_classes=[IsAuthenticated],
        methods=("POST",),
    )
    def set_password(self, request, pk=None):
        if request.user._id == pk or request.user.is_admin:
            user = self.model.objects.get(_id=pk)
            user.set_password(request.data["password"])
            user.save()
            return Response(UserSerializerWithToken(user, many=False))

        return Response(
            {"message": "Not allowed"}, status=status.HTTP_401_UNAUTHORIZED
        )


class SellerProfilesAPI(ModelViewSet):
    model = SellerProfile
    serializer_class = SellerProfileSerializer

    lookup_field = "_id"
    queryset = model.objects.all()
