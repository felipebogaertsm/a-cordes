import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(
        email="testuser@example.com", password="testpassword"
    )
    assert user.email == "testuser@example.com"
    assert user.check_password("testpassword") is True
    assert user.is_active
    assert not user.is_staff
    assert not user.is_superuser
