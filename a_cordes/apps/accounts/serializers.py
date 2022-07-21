# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework.serializers import (
    CharField,
    DateTimeField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.models import User, SellerProfile


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


class SellerProfileSerializer(ModelSerializer):
    class Meta:
        model = SellerProfile
        fields = "__all__"

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.picture:
            ret["picture"] = instance.picture.url
        return ret


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True, source="password1", required=False)

    # Only used when creationg a new user:
    password1 = CharField(write_only=True, required=False)
    password2 = CharField(write_only=True, required=False)

    last_login = DateTimeField(required=False)

    class Meta:
        model = User
        fields = "__all__"

    def validate(self, attrs):
        validated_attrs = super().validate(attrs)

        try:
            if attrs["password1"] != attrs["password2"]:
                raise ValidationError("Passwords must be equal")

            validated_attrs["password"] = validated_attrs["password1"]
            del validated_attrs["password1"]
            del validated_attrs["password2"]
        except KeyError:
            pass

        return validated_attrs


class UserSerializerWithToken(UserSerializer):
    token = SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
