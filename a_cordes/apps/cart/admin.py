# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib import admin

from apps.cart.models import CartItem


class CartItemAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


admin.site.register(CartItem, CartItemAdmin)
