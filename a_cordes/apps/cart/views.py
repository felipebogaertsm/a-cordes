# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from apps.cart.models import CartItem
from apps.cart.serializers import CartItemSerializer
from apps.products.models import Product


class CartItemAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        user = request.user

        cart_item = CartItem.objects.filter(user=user).filter(_id=pk)

        if cart_item.exists():
            return Response(CartItemSerializer(cart_item, many=False).data)
        else:
            return Response(
                "Could not find the requested cart item.",
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request, pk=False):
        user = request.user

        try:
            product_id = request.GET.get("product_id")
            product = Product.objects.get(_id=product_id)
        except ValueError:
            return Response(
                "Please enter a valid product id.",
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Product.DoesNotExist:
            return Response(
                "Product could not be found.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        if product.count_in_stock < 1:
            return Response(
                "Product not available.",
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        try:
            quantity = int(request.GET.get("qty"))
        except (KeyError, ValueError):
            quantity = 1

        cart_item = CartItem.objects.create_item(
            user=user,
            product=product,
            quantity=quantity,
        )

        return Response(CartItemSerializer(cart_item, many=False).data)

    def put(self, request, pk):
        cart_item = CartItem.objects.get(_id=pk)

        try:
            quantity = int(request.GET.get("qty"))
        except:
            quantity = 1

        if cart_item.product.count_in_stock < quantity:
            quantity = cart_item.product.count_in_stock

        cart_item.quantity = quantity
        cart_item.save()

        return Response(CartItemSerializer(cart_item, many=False).data)

    def delete(self, request, pk):
        cart_item = CartItem.objects.get(_id=pk)

        if cart_item.user._id != request.user._id:
            return Response(
                "You are not allowed to delete this item.",
                status=status.HTTP_401_UNAUTHORIZED,
            )
        else:
            cart_item.delete()
            return Response(CartItemSerializer(cart_item, many=False).data)


class CartAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        cart_items = CartItem.objects.filter(user=user)
        serializer = CartItemSerializer(cart_items, many=True)

        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        return Response("Cart cleared.")
