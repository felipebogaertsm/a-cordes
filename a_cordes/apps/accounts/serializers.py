# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.models import User, SellerProfile


class SellerProfileSerializer(ModelSerializer):
    class Meta:
        model = SellerProfile
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UserSerializerWithToken(UserSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        exclude = ("password",)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
