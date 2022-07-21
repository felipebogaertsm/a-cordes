# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework import serializers

from apps.cart.models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"
        depth = 2

    def create(self, validated_data):
        return CartItem.objects.create_item(
            user=validated_data["user"],
            product=validated_data["product"],
            quantity=validated_data["quantity"],
        )
