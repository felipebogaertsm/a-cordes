# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import pytest

from apps.accounts.models import User, SellerProfile
from apps.cart.models import CartItem
from apps.products.models import Product


@pytest.fixture
def user_1():
    return User.objects.create_superuser(
        email="admin1@email.com", password="wc4Xzsbc2.%w"
    )


@pytest.fixture
def user_2():
    return User.objects.create_superuser(
        email="admin2@email.com", password="wc4Xzsbc2.%z"
    )


@pytest.fixture
def seller_1(user_1):
    return SellerProfile.objects.create(
        user=user_1,
        name="Seller",
        is_active=True,
    )


@pytest.fixture
def products(seller_1):
    Product.objects.create(
        seller_profile=seller_1,
        name="Product 1",
        price="1000.00",
        count_in_stock=10,
    )
    Product.objects.create(
        seller_profile=seller_1,
        name="Product 2",
        price="2000.00",
        count_in_stock=2,
    )
    Product.objects.create(
        seller_profile=seller_1,
        name="Product 3",
        price="3000.00",
        count_in_stock=1,
    )

    return Product.objects.all()


@pytest.fixture
def cart_items(user_1, user_2, products):
    CartItem.objects.create(user=user_1, product=products[0], quantity=9)
    CartItem.objects.create(user=user_2, product=products[1], quantity=1)
    CartItem.objects.create(user=user_2, product=products[0], quantity=1)
    return CartItem.objects.all()
