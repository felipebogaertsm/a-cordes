# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.urls import path, include
from rest_framework.routers import DefaultRouter

import apps.orders.views as views

router = DefaultRouter()

router.register(
    "shipping-addresses",
    views.ShippingAddressViewSet,
    basename="shipping-addresses",
)

urlpatterns = [
    path("", include(router.urls)),
    path("items/", views.OrderItemAPI.as_view()),
    path("all/", views.get_orders),
    path("my/", views.get_my_orders),
    path("<str:pk>/deliver/", views.update_order_to_delivered),
    path("<str:pk>/", views.get_order_by_id),
    path("<str:pk>/pay/", views.update_order_to_paid),
]
