# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from apps.orders.models import Order, OrderItem, ShippingAddress
from apps.orders.serializers import (
    OrderItem,
    OrderItemSerializer,
    ShippingAddressSerializer,
)
from utils.permissions import ReadOnly, EditIfObjectIsMine


class ShippingAddressViewSet(ModelViewSet):
    model = ShippingAddress
    serializer_class = ShippingAddressSerializer

    protected_user_id_field_name = "user"
    permission_classes = (IsAdminUser | ReadOnly | EditIfObjectIsMine,)

    lookup_field = "_id"
    queryset = model.objects.all()


class OrderItemAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """
        Getting order items for a user.
        """
        user = request.user

        order_items = OrderItem.objects.filter(user=user)
        serializer = OrderItemSerializer(order_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Adding order item to order.
        """
        user = request.user
        data = request.data

        order_items = data["orderItems"]

        if order_items and len(order_items) == 0:
            return Response(
                {"message": "No order items"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = Order.objects.filter(user=user).filter(is_paid=False)
        if not order.exists():
            order = Order.objects.create(
                user=user,
                payment_method=data["paymentMethod"],
                shipping_price=data["shippingPrice"],
                total_price=data["totalPrice"],
            )

        # Create shipping address:
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postal_code=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # Create order items and set order to order_item relationship:
        for item in order_items:
            product = Product.objects.get(_id=item["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=item["qty"],
                price=item["price"],
                image=product.image.url,
            )

            # Update stock of the sold items:
            product.count_in_stock -= item.quantity
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:  # if user is not authenticated to see the particular order:
            Response(
                {"detail": "Not authorized"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"detail": "Order does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was paid")


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()

    return Response("Order was delivered")
