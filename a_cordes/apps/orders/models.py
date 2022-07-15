# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import uuid

from django.db import models

from apps.accounts.models import User
from apps.orders.choices import PAYMENT_METHODS
from apps.products.models import Product


class ShippingAddress(models.Model):
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    address = models.CharField(max_length=200, default="", blank=True)
    city = models.CharField(max_length=200, default="", blank=True)
    postal_code = models.CharField(max_length=200, default="", blank=True)
    country = models.CharField(max_length=200, default="", blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.address}_{self.user.email}"


class Order(models.Model):
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    payment_method = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        choices=PAYMENT_METHODS,
    )

    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, default=0, blank=True
    )

    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)

    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(
        auto_now_add=False, null=True, blank=True
    )

    shipping_address = models.ForeignKey(
        ShippingAddress, on_delete=models.SET_NULL, null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.created_at}_{self.user}"


class OrderItem(models.Model):
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=1)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, default=0, blank=True
    )

    image = models.CharField(max_length=200, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.name}_{self.created_at}"
