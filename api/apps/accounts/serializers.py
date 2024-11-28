from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken

from apps.accounts.models import User, Dealer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User) -> AccessToken:
        token: AccessToken = super().get_token(user)

        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]
        read_only_fields = ["id"]


class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = [
            "id",
            "name",
            "profile_picture",
            "description",
            "country_of_origin",
            "contact_email",
            "contact_phone",
            "created_at",
            "updated_at",
            "users",
        ]
        read_only_fields = ["created_at", "updated_at"]
