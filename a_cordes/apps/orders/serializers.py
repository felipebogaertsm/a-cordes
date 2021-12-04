# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework import serializers

from apps.orders.models import Order, OrderItem, ShippingAddress
from apps.accounts.serializers import UserSerializer


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    createdAt = serializers.DateTimeField(source="created_at")
    deliveredAt = serializers.DateTimeField(source="delivered_at")
    isDelivered = serializers.BooleanField(source="is_delivered")
    paidAt = serializers.BooleanField(source="paid_at")
    isPaid = serializers.BooleanField(source="is_paid")
    paymentMethod = serializers.BooleanField(source="payment_method")
    shippingPrice = serializers.BooleanField(source="shipping_price")
    totalPrice = serializers.BooleanField(source="total_price")

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False
            ).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
