# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

import pytest

from rest_framework.test import APIClient

from apps.accounts.models import User

USER_1_EMAIL = "john@email.com"
USER_EMAIL = "jane@email.com"
ADMIN_USER_EMAIL = "admin@email.com"

USER_PASSWORD = "RandomPass123!"


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def user_superuser():
    return User.objects.create_superuser(
        email=USER_1_EMAIL,
        password=USER_PASSWORD,
    )


@pytest.fixture
def user_common():
    return User.objects.create_user(
        email=USER_EMAIL,
        password=USER_PASSWORD,
    )
