# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path

import apps.products.views as views

urlpatterns = [
    path("all/", views.get_products),
    path("create/", views.create_product),
    path("upload-image/", views.upload_image),
    path("top/", views.get_top_products),
    path("<str:pk>/reviews/", views.create_product_review),
    path("<str:pk>/", views.get_product),
    path("update/<str:pk>/", views.update_product),
    path("delete/<str:pk>/", views.delete_product),
]
