# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import uuid

from django.db import models

from apps.accounts.models import User
from apps.cart.managers import CartItemManager
from apps.products.models import Product


class CartItem(models.Model):
    _id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    objects = CartItemManager()
