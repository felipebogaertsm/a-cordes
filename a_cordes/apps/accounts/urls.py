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

urlpatterns = [
    path("", include(router.urls)),
    path(
        "token/obtain-pair/",
        views.MyTokenObtainPairView.as_view(),
        name="token-obtain-pair",
    ),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
    path("my-user/", views.MyUserAPI.as_view()),
    path("user/<str:pk>/", views.UserAPI.as_view(), name="user"),
    path("seller/<str:pk>/", views.SellerProfileAPI.as_view()),
    path("sellers/", views.SellerProfilesAPI.as_view()),
    path("user/all/", views.get_users),
    path("user/register/", views.register_user),
    path("user/<str:pk>/", views.get_user_by_id),
    path("user/profile/", views.get_user_profile),
    path("user/update/<str:pk>/", views.update_user),
    path("user/update/profile/", views.update_user_profile),
    path("user/delete/<str:pk>/", views.delete_user),
]
