# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

import uuid

from django.db import models
from django.template.defaultfilters import slugify

from apps.accounts.models import SellerProfile, User


class Product(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)

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
        blank=True,
        default="products/placeholder.jpeg",
        upload_to="products/",
    )

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.name}_{self.seller_profile.name}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)


class Review(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
    )  # product that got reviewed
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
    )  # user that did the review
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.rating}_{self.product.name}_{self.user}"
