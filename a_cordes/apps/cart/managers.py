# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.db import models


class CartItemManager(models.Manager):
    def create_item(self, user, product, quantity):
        existing_cart_item = self.model.objects.filter(user=user).filter(
            product=product
        )

        if existing_cart_item.exists():
            cart_item = existing_cart_item[0]
            cart_item.quantity += quantity
        else:
            cart_item = self.model(
                user=user,
                product=product,
                quantity=quantity,
            )

        cart_item.save(using=self._db)

        return cart_item
