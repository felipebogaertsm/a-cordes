from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.accounts.views import AuthViewSet, UserViewSet, DealerViewSet

router = DefaultRouter()
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"users", UserViewSet, basename="user")
router.register(r"dealers", DealerViewSet, basename="dealer")

urlpatterns = [
    path("", include(router.urls)),
]
