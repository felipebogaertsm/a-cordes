import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(
        email="testuser@example.com", password="password123"
    )
    assert user.email == "testuser@example.com"
    assert user.is_active
    assert not user.is_staff
    assert not user.is_superuser


@pytest.mark.django_db
def test_user_str(create_user):
    user = create_user(email="struser@example.com")
    assert str(user) == "struser@example.com"


@pytest.mark.django_db
def test_create_dealer(create_dealer):
    dealer = create_dealer(name="Elite Instruments", country_of_origin="Italy")
    assert dealer.name == "Elite Instruments"
    assert dealer.country_of_origin == "Italy"
    assert dealer.description == ""
    assert not dealer.profile_picture


@pytest.mark.django_db
def test_dealer_str(create_dealer):
    dealer = create_dealer(name="Premium Dealer")
    assert str(dealer) == "Premium Dealer"


@pytest.mark.django_db
def test_dealer_users_relationship(create_user, create_dealer):
    user = create_user(email="dealeruser@example.com")
    dealer = create_dealer(name="Master Dealer")
    dealer.users.add(user)

    assert dealer.users.count() == 1
    assert user in dealer.users.all()
    assert dealer in user.dealers.all()
