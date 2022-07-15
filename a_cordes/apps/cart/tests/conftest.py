# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import pytest

from apps.accounts.models import User, SellerProfile
from apps.products.models import Product


@pytest.fixture
def user_1():
    return User.objects.create_user(
        email="joe@email.com", password="helloWorld1!"
    )


@pytest.fixture
def seller_1(user_1):
    return SellerProfile.objects.create(
        user=user_1,
        name="Seller 1",
        is_active=True,
    )


@pytest.fixture
def product_1_seller_1(seller_1):
    return Product.objects.create(
        seller_profile=seller_1,
        name="Product 1",
        price="1000.00",
        count_in_stock=10,
    )
