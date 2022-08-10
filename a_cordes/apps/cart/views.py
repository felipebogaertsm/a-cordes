# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from apps.cart.models import CartItem
from apps.cart.serializers import CartItemSerializer


class CartItemsAPI(ModelViewSet):
    model = CartItem
    serializer_class = CartItemSerializer
    lookup_field = "_id"
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return CartItem.objects.filter(user=user)

    @action(methods=("DELETE",), detail=False, url_name="clear")
    def clear(self, request):
        """
        Deletes all cart items associated with the authenticated user.
        """
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        cart_items.delete()
        return Response("Cart cleared")
