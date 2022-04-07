# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.db.utils import IntegrityError
from django.template.defaultfilters import slugify
from django.test import TransactionTestCase

from apps.accounts.models import User, SellerProfile
from apps.products.models import Product


USER_1_EMAIL = "john@email.com"
USER_2_EMAIL = "jane@email.com"

USER_PASS = "VerySecurePass@!123"

SELLER_NAME = "Seller 1"


class TestProduct(TransactionTestCase):
    def setUp(self):
        self.user_1 = User.objects.create_user(
            email=USER_1_EMAIL, password=USER_PASS
        )
        self.seller_profile = SellerProfile.objects.create(
            user=self.user_1, name=SELLER_NAME
        )

    def test_product_crud(self):
        product_name = "Product 1"
        product_count_in_stock = 3

        product = Product.objects.create(
            name=product_name,
            seller_profile=self.seller_profile,
            price=1000,
            count_in_stock=product_count_in_stock,
        )

        self.assertIsNotNone(product.slug)  # make sure slug is created
        self.assertEqual(product.slug, slugify(product_name))
        self.assertEqual(product, Product.objects.get(_id=product._id))

        product_count_in_stock -= 1
        product.count_in_stock = product_count_in_stock
        product.save()

        self.assertEqual(product.count_in_stock, product_count_in_stock)

        product.delete()
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(_id=product._id)

    def test_product_count_in_stock_validation(self):
        product_name = "Product 1"

        with self.assertRaises(IntegrityError):
            Product.objects.create(
                name=product_name,
                seller_profile=self.seller_profile,
                price=1000,
                count_in_stock=-1,
            )

        Product.objects.create(
            name=product_name,
            seller_profile=self.seller_profile,
            price=1000,
            count_in_stock=3,
        )
