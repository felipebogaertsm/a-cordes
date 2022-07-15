# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import pytest

from apps.accounts.models import User, SellerProfile


@pytest.fixture
def user_1():
    return User.objects.create_user(email="joe@email.com", password="pass123!")


@pytest.fixture
def seller_1(user_1):
    return SellerProfile.objects.create(user=user_1, name="Seller 1")
