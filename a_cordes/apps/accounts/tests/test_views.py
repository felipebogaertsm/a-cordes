# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

import pytest

from django.urls import reverse

from .conftest import USER_PASSWORD
from apps.accounts.models import User


@pytest.mark.django_db
def test_user_login_fail(client):
    response = client.post(
        reverse("token-obtain-pair"),
        {"email": "notanuser@email.com", "password": "wrongPass123!"},
    )

    assert int(response.status_code / 100) != 2  # not in 200 range


@pytest.mark.django_db
def test_user_login(client, user_superuser):
    # Getting JWT from credentials:
    response = client.post(
        reverse("token-obtain-pair"),
        {"email": user_superuser.email, "password": USER_PASSWORD},
    )

    assert response.status_code == 200

    access_token = response.data["access"]

    # Verifying token validity:
    response = client.post(reverse("token-verify"), {"token": access_token})
    assert response.status_code == 200


@pytest.mark.django_db
def test_get_user_not_authenticated_client(
    client, user_superuser, user_common
):
    # List mode:
    response = client.get(reverse("users-list"))
    assert response.status_code != 200

    # Detail mode:
    response = client.get(reverse("users-detail", args=[1]))
    assert response.status_code != 200

    # Action mode:
    response = client.get(reverse("users-me"))
    assert response.status_code != 200


@pytest.mark.django_db
def test_get_user_authenticated_non_admin(client, user_common, user_superuser):
    client.force_authenticate(user=user_common)

    # List mode:
    response = client.get(reverse("users-list"))
    assert response.status_code != 200

    # Detail mode with other user's id:
    response = client.get(reverse("users-detail", args=[user_superuser._id]))
    assert response.status_code != 200

    # Detail mode with same user id:
    response = client.get(reverse("users-detail", args=[user_common._id]))
    assert response.status_code != 200

    # Detail mode with same user id:
    response = client.get(reverse("users-me"))
    assert response.status_code == 200


@pytest.mark.django_db
def test_user_signin_different_passwords(client):
    wrong_password = USER_PASSWORD + "1"

    response = client.post(
        reverse("users-list"),
        {
            "email": "sample@email.com",
            "password1": USER_PASSWORD,
            "password2": wrong_password,
        },
    )

    assert response.status_code != 200


@pytest.mark.django_db
def test_user_signin_not_authenticated_client(client):
    response = client.post(
        reverse("users-list"),
        {
            "email": "sample@email.com",
            "password1": USER_PASSWORD,
            "password2": USER_PASSWORD,
        },
    )

    new_user = response.data

    assert response.status_code == 201
    assert User.objects.get(_id=new_user["_id"]).email == new_user["email"]
