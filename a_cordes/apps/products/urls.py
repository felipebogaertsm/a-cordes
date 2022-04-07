# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path, include
from rest_framework.routers import DefaultRouter

import apps.products.views as views

router = DefaultRouter()

router.register("", views.ProductViewSet, basename="products")

urlpatterns = [
    path("", include(router.urls)),
    path("all/", views.get_products),
    path("create/", views.create_product),
    path("upload-image/", views.upload_image),
    path("top/", views.get_top_products),
    path("update/<str:pk>/", views.update_product),
    path("delete/<str:pk>/", views.delete_product),
]
