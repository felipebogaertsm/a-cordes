# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib import admin

from apps.orders.models import Order, OrderItem, ShippingAddress


class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


class OrderItemAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


class ShippingAddressAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
