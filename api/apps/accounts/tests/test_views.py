import pytest
from rest_framework.test import APIClient
from django.urls import reverse


@pytest.mark.django_db
def test_login(test_user):
    client = APIClient()
    url = reverse("auth-login")
    response = client.post(
        url,
        {"email": "testuser@example.com", "password": "testpassword"},
        format="json",
    )
    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data
