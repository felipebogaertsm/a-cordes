# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.db import models
from a_cordes_backend.base.models import Seller

from apps.accounts.models import SellerProfile


class Product(models.Model):
    seller_profile = models.ForeignKey(SellerProfile, on_delete=models.CASCADE)

    name = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField(max_length=10000, blank=True, default="")
    category = models.CharField(max_length=255, blank=True, default="")

    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, default=0.00
    )
    count_in_stock = models.PositiveIntegerField(blank=True, default=0)
    rating = models.FloatField(blank=True, null=True)
    review_count = models.PositiveIntegerField(blank=True, default=0)

    image = models.ImageField(
        null=True, blank=True, default="/placeholder.jpeg"
    )

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.name}_{self.seller.name}"
