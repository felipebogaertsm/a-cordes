# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        password=None,
    ):
        if not email:
            raise ValueError("User must have an email address")
        if not password:
            raise ValueError("User must have a valid password")

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_staffuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_staff = True
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    _id = models.AutoField(primary_key=True, editable=False)

    email = models.EmailField(max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return self.email

    def has_perm(self, perm, obj=None) -> bool:
        return True

    def has_module_perms(self, app_label) -> bool:
        return True

    @property
    def is_superuser(self) -> bool:
        return self.is_admin


class UserProfile(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=255, default="", blank=True)
    picture = models.ImageField(blank=True, default="/user_placeholder.jpeg")
    date_of_birth = models.DateTimeField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, default="")
    country = models.CharField(max_length=255, blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return f"{self.user.email}_{self.full_name}_{self.city}_{self.country}"


class SellerProfile(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    picture = models.ImageField(blank=True, default="/seller_placeholder.jpeg")
    city = models.CharField(max_length=255, blank=True, default="")
    country = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField(max_length=1000, blank=True, default="")
    title = models.CharField(max_length=255, blank=True, default="")

    # In order for a seller to be listed, is_approved needs to be True:
    is_approved = models.BooleanField(blank=True, default=False)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return self.name
