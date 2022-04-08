# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.accounts.models import User

USER_1_EMAIL = "john@email.com"
USER_EMAIL = "jane@email.com"
ADMIN_USER_EMAIL = "admin@email.com"

USER_PASSWORD = "RandomPass123!"


class TestViews(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.admin_user = User.objects.create_superuser(
            email=ADMIN_USER_EMAIL, password=USER_PASSWORD
        )
        self.user = User.objects.create_user(
            email=USER_EMAIL, password=USER_PASSWORD
        )

    def test_user_login_fail(self):
        client = APIClient()

        # Wrong user and password:
        response = client.post(
            reverse("token-obtain-pair"),
            {"email": "nouser@email.com", "password": "WrongPass123@"},
        )
        self.assertNotEqual(int(response.status_code / 100), 2)

        # Wrong password:
        response = client.post(
            reverse("token-obtain-pair"),
            {"email": USER_EMAIL, "password": "WrongPass123@"},
        )
        self.assertNotEqual(int(response.status_code / 100), 2)

    def test_user_login(self):
        client = APIClient()

        # Getting JWT from credentials:
        response = client.post(
            reverse("token-obtain-pair"),
            {"email": USER_EMAIL, "password": USER_PASSWORD},
        )
        self.assertEqual(response.status_code, 200)

        access_token = response.data["access"]

        # Verifying token validity:
        response = client.post(
            reverse("token-verify"), {"token": access_token}
        )
        self.assertEqual(response.status_code, 200)

    def test_get_user_not_authenticated_client(self):
        client = APIClient()

        # List mode:
        response = client.get(reverse("users-list"))
        self.assertNotEqual(response.status_code, 200)

        # Detail mode:
        response = client.get(reverse("users-detail", args=[1]))
        self.assertNotEqual(response.status_code, 200)

        # Action mode:
        response = client.get(reverse("users-me"))
        self.assertNotEqual(response.status_code, 200)

    def test_get_user_authenticated_non_admin(self):
        client = APIClient()
        client.force_authenticate(user=self.user)

        # List mode:
        response = client.get(reverse("users-list"))
        self.assertNotEqual(response.status_code, 200)

        # Detail mode with other user's id:
        response = client.get(
            reverse("users-detail", args=[self.admin_user._id])
        )
        self.assertNotEqual(response.status_code, 200)

        # Detail mode with same user id:
        response = client.get(reverse("users-detail", args=[self.user._id]))
        self.assertNotEqual(response.status_code, 200)

        # Detail mode with same user id:
        response = client.get(reverse("users-me"))
        self.assertEqual(response.status_code, 200)

    def test_user_signin_different_passwords(self):
        wrong_password = USER_PASSWORD + "1"

        response = self.client.post(
            reverse("user", kwargs={"pk": "0"}),
            {
                "email": USER_1_EMAIL,
                "password1": USER_PASSWORD,
                "password2": wrong_password,
            },
        )

        self.assertNotEqual(response.status_code, 200)

    def test_user_signin_not_authenticated_client(self):
        response = self.client.post(
            reverse("user", kwargs={"pk": "0"}),
            {
                "email": USER_1_EMAIL,
                "password1": USER_PASSWORD,
                "password2": USER_PASSWORD,
            },
        )

        new_user = response.data

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            User.objects.get(_id=new_user["_id"]).email, new_user["email"]
        )
