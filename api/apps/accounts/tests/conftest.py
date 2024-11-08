import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def test_user(db):
    user = User.objects.create_user(
        email="testuser@example.com", password="testpassword"
    )
    return user
