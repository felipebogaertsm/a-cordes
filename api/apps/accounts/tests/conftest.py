import pytest
from rest_framework.test import APIClient

from apps.accounts.models import User, Dealer


@pytest.fixture
def create_user():
    def _create_user(email="user@example.com", password="password123"):
        return User.objects.create_user(email=email, password=password)

    return _create_user


@pytest.fixture
def create_dealer():
    def _create_dealer(name="Dealer One", country_of_origin="USA"):
        return Dealer.objects.create(name=name, country_of_origin=country_of_origin)

    return _create_dealer


@pytest.fixture
def api_client():
    return APIClient()
