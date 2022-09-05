# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework import serializers

from apps.accounts.models import User
from apps.cart.models import CartItem
from apps.products.models import Product
from apps.products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.CharField()
    user = serializers.CharField()

    class Meta:
        model = CartItem
        fields = "__all__"
        depth = 2

    def create(self, validated_data):
        user = User.objects.get(_id=validated_data["user"])
        product = Product.objects.get(_id=validated_data["product"])

        return CartItem.objects.create_item(
            user=user,
            product=product,
            quantity=validated_data["quantity"],
        )

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr["product"] = ProductSerializer(instance.product).data
        return repr
