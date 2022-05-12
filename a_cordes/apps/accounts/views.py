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
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.accounts.models import User, SellerProfile
from apps.accounts.permissions import UsersAPIPermissions
from apps.accounts.serializers import (
    UserSerializer,
    UserSerializerWithToken,
    SellerProfileSerializer,
    MyTokenObtainPairSerializer
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UsersAPI(ModelViewSet):
    model = User
    serializer_class = UserSerializer

    permission_classes = (UsersAPIPermissions,)
    lookup_field = "_id"
    queryset = model.objects.all()

    @action(
        detail=False,
        url_path="my",
        url_name="me",
        permission_classes=[IsAuthenticated],
        methods=("GET", "PATCH", "PUT", "DELETE"),
    )
    def my(self, request):
        user = request.user
        serializer_class = UserSerializerWithToken

        if request.method.lower() == "get":
            return Response(serializer_class(user, many=False).data)
        elif request.method.lower() in ["patch", "put"]:
            serializer = serializer_class(user, data=request.data)
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
