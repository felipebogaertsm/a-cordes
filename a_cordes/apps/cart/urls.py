# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from django.urls import path

import apps.cart.views as views

urlpatterns = [
    path("item/<str:pk>/", views.CartItemAPI.as_view()),
    path("", views.CartAPI.as_view()),
]
