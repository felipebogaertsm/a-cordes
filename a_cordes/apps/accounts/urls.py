# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path

import apps.accounts.views as views

urlpatterns = [
    path("users/", views.get_users),
    path("register-user/", views.register_user),
    path("user/<str:pk>/", views.get_user_by_id),
    path("user-update/<str:pk>/", views.update_user),
    path("user-delete/<str:pk>/", views.delete_user),
]
