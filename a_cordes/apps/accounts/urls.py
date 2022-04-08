# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView

import apps.accounts.views as views

router = DefaultRouter()

router.register("users", views.UsersAPI, basename="users")
router.register("sellers", views.SellerProfilesAPI, basename="sellers")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "token/obtain-pair/",
        views.MyTokenObtainPairView.as_view(),
        name="token-obtain-pair",
    ),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
]
