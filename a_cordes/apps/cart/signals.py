# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.db.models.signals import pre_save
from django.dispatch import receiver

from apps.cart.models import CartItem


@receiver([pre_save], sender=CartItem)
def quantity_cart_item(sender, instance, **kwargs):
    product = instance.product

    if product.count_in_stock < instance.quantity:
        instance.quantity = product.count_in_stock
