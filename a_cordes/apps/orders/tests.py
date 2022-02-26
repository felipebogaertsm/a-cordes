# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.test import TestCase

from apps.accounts.models import User, SellerProfile
from apps.cart.models import CartItem
from apps.orders.models import Order, OrderItem
from apps.products.models import Product


class OrderTestCase(TestCase):
    def setUp(self):
        self.user_1 = User.objects.create_superuser(
            email="admin1@email.com", password="wc4Xzsbc2.%w"
        )

        self.user_2 = User.objects.create_superuser(
            email="admin2@email.com", password="wc4Xzsbc2.%z"
        )

        self.seller_profile = SellerProfile.objects.create(
            user=self.user_1,
            name="Seller",
            is_approved=True,
        )

        self.product_1 = Product.objects.create(
            seller_profile=self.seller_profile,
            name="Product 1",
            price="1000.00",
            count_in_stock=10,
        )

        self.product_2 = Product.objects.create(
            seller_profile=self.seller_profile,
            name="Product 2",
            price="2000.00",
            count_in_stock=2,
        )

        self.product_3 = Product.objects.create(
            seller_profile=self.seller_profile,
            name="Product 3",
            price="3000.00",
            count_in_stock=1,
        )

        self.cart_items = [
            CartItem.objects.create(
                user=self.user_1, product=self.product_1, quantity=9
            ),
            CartItem.objects.create(
                user=self.user_2, product=self.product_2, quantity=1
            ),
            CartItem.objects.create(
                user=self.user_2, product=self.product_1, quantity=1
            ),
        ]  # only used in some tests

    def test_simple_order_creation(self):
        """
        Tests a simple Order/OrderItem creation based on existing CartItems.
        """
