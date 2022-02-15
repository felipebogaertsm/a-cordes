# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

import apps.accounts.views as views

urlpatterns = [
    path("login/", views.MyTokenObtainPairView.as_view()),
    path("my-user/", views.MyUserAPI.as_view()),
    path("verify-token/", TokenVerifyView.as_view()),
    path("user/all/", views.get_users),
    path("user/register/", views.register_user),
    path("user/<str:pk>/", views.get_user_by_id),
    path("user/profile/", views.get_user_profile),
    path("user/update/<str:pk>/", views.update_user),
    path("user/update/profile/", views.update_user_profile),
    path("user/delete/<str:pk>/", views.delete_user),
]
