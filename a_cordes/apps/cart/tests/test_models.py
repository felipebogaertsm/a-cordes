# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

import pytest

from django.test import TestCase

from apps.accounts.models import User, SellerProfile
from apps.cart.models import CartItem
from apps.products.models import Product


@pytest.mark.django_db
def test_cart_item_creation(user_1, product_1_seller_1):
    """
    Testing simple cart item creation.
    """

    cart_item_1 = CartItem.objects.create_item(
        user=user_1, product=product_1_seller_1, quantity=1
    )

    queryset = CartItem.objects.filter(user=user_1, product=product_1_seller_1)

    assert queryset.exists()
    assert len(queryset) == 1  # single result
    assert cart_item_1 == queryset.first()


@pytest.mark.django_db
def test_duplicate_cart_item_creation(user_1, product_1_seller_1):
    """
    Testing what happens if two cart items objects get created for the
    same user and the same product.
    """
    quantity_cart_item_1 = 2
    quantity_cart_item_2 = 1

    CartItem.objects.create_item(
        user=user_1,
        product=product_1_seller_1,
        quantity=quantity_cart_item_1,
    )

    CartItem.objects.create_item(
        user=user_1,
        product=product_1_seller_1,
        quantity=quantity_cart_item_2,
    )

    queryset = CartItem.objects.filter(user=user_1, product=product_1_seller_1)

    assert len(queryset) == 1
    assert (
        queryset.first().quantity
        == quantity_cart_item_1 + quantity_cart_item_2
    )


@pytest.mark.django_db
def test_cart_item_creation_count_in_stock(user_1, product_1_seller_1):
    """
    Testing how the cart item creation behaves when over or under
    quantifying in relation to the product's count in stock.
    """
    cart_item = CartItem.objects.create_item(
        user=user_1,
        product=product_1_seller_1,
        quantity=1,
    )

    assert (
        cart_item.quantity
        == CartItem.objects.filter(user=user_1, product=product_1_seller_1)
        .first()
        .quantity
    )

    cart_item = CartItem.objects.create_item(
        user=user_1,
        product=product_1_seller_1,
        quantity=product_1_seller_1.count_in_stock - 1,
    )

    assert cart_item.quantity == product_1_seller_1.count_in_stock

    cart_item = CartItem.objects.create_item(
        user=user_1,
        product=product_1_seller_1,
        quantity=1,
    )

    assert cart_item.quantity == product_1_seller_1.count_in_stock
