from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.accounts.views import AuthViewSet, UserViewSet

router = DefaultRouter()
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
]
