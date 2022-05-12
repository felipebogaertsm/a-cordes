# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

import uuid

from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.template.defaultfilters import slugify

from apps.accounts.managers import UserManager


class User(AbstractBaseUser):
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )

    email = models.EmailField(max_length=255, unique=True)

    is_active = models.BooleanField(default=True, blank=True)
    is_staff = models.BooleanField(default=False, blank=True)
    is_admin = models.BooleanField(default=False, blank=True)

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
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    slug = models.SlugField(max_length=50, unique=True, blank=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=255, default="", blank=True)
    last_name = models.CharField(max_length=255, default="", blank=True)
    picture = models.ImageField(blank=True, default="/user_placeholder.jpeg")
    date_of_birth = models.DateTimeField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, default="")
    country = models.CharField(max_length=255, blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return f"{self.user.email}_{self.full_name}_{self.city}_{self.country}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.email)
        super(UserProfile, self).save(*args, **kwargs)


class SellerProfile(models.Model):
    _id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, primary_key=True
    )
    slug = models.SlugField(max_length=50, unique=True, blank=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    picture = models.ImageField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, default="")
    country = models.CharField(max_length=100, blank=True, default="")
    description = models.TextField(max_length=1000, blank=True, default="")
    title = models.CharField(max_length=100, blank=True, default="")

    # In order for a seller to be listed, is_active needs to be True
    is_active = models.BooleanField(blank=True, default=False)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SellerProfile, self).save(*args, **kwargs)
