# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.accounts.models import User


USER_1_EMAIL = "test@email.com"
USER_1_PASSWORD = "RandomPass123!"


class TestViews(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_signin_valid(self):
        response = self.client.post(
            reverse("user", kwargs={"pk": "0"}),
            {
                "email": USER_1_EMAIL,
                "password1": USER_1_PASSWORD,
                "password2": USER_1_PASSWORD,
            },
        )

        new_user = response.data

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            User.objects.get(_id=new_user["_id"]).email, new_user["email"]
        )

    def test_user_signin_different_passwords(self):
        wrong_password = USER_1_PASSWORD + "1"

        response = self.client.post(
            reverse("user", kwargs={"pk": "0"}),
            {
                "email": USER_1_EMAIL,
                "password1": USER_1_PASSWORD,
                "password2": wrong_password,
            },
        )

        self.assertNotEqual(response.status_code, 200)
