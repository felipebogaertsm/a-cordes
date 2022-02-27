# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.test import TestCase

from apps.accounts.models import User, SellerProfile
from apps.cart.models import CartItem
from apps.products.models import Product


class CartTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(
            email="admin@email.com", password="wc4Xzsbc2.%w"
        )

        self.seller_profile = SellerProfile.objects.create(
            user=self.user,
            name="Seller",
            is_active=True,
        )

        self.product_1 = Product.objects.create(
            seller_profile=self.seller_profile,
            name="Product 1",
            price="1000.00",
            count_in_stock=10,
        )

    def test_cart_item_creation(self):
        """
        Testing simple cart item creation.
        """

        cart_item_1 = CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=1,
        )

        cart_item_from_query = CartItem.objects.get(
            user=self.user, product=self.product_1
        )

        self.assertEqual(cart_item_1, cart_item_from_query)

    def test_duplicate_cart_item_creation(self):
        """
        Testing what happens if two cart items objects get created for the
        same user and the same product.
        """
        quantity_cart_item_1 = 2
        quantity_cart_item_2 = 1

        CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=1,
        )

        CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=2,
        )

        all_cart_items = CartItem.objects.filter(user=self.user).filter(
            product=self.product_1
        )

        self.assertEqual(len(all_cart_items), 1)

        cart_item = all_cart_items[0]

        self.assertEqual(
            cart_item.quantity,
            quantity_cart_item_1 + quantity_cart_item_2,
        )

    def test_cart_item_creation_count_in_stock(self):
        """
        Testing how the cart item creation behaves when over or under
        quantifying in relation to the product's count in stock.
        """
        cart_item = CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=1,
        )

        self.assertEqual(
            cart_item.quantity,
            CartItem.objects.filter(user=self.user)
            .filter(product=self.product_1)[0]
            .quantity,
        )

        cart_item = CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=self.product_1.count_in_stock - 1,
        )

        self.assertEqual(
            cart_item.quantity,
            self.product_1.count_in_stock,
        )

        cart_item = CartItem.objects.create_item(
            user=self.user,
            product=self.product_1,
            quantity=1,
        )

        self.assertEqual(
            cart_item.quantity,
            self.product_1.count_in_stock,
        )
