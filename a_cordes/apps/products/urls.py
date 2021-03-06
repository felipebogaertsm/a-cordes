# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from django.urls import path, include
from rest_framework.routers import DefaultRouter

import apps.products.views as views

router = DefaultRouter()

router.register("", views.ProductViewSet, basename="products")
router.register("reviews", views.ReviewViewSet, basename="reviews")

urlpatterns = [
    path("", include(router.urls)),
]
