from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from apps.accounts.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return str(self.email)


class Dealer(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Dealer name"))
    profile_picture = models.ImageField(
        upload_to="dealer_profile_pictures/",
        blank=True,
        null=True,
        verbose_name=_("Profile picture"),
    )
    description = models.TextField(blank=True, verbose_name=_("Description"))
    country_of_origin = models.CharField(
        max_length=100, blank=True, verbose_name=_("Country of origin")
    )
    contact_email = models.EmailField(blank=True, verbose_name=_("Contact email"))
    contact_phone = models.CharField(
        max_length=15, blank=True, verbose_name=_("Contact phone")
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))
    users = models.ManyToManyField(
        "User", related_name="dealers", blank=True, verbose_name=_("Associated users")
    )

    def __str__(self) -> str:
        return str(self.name)

    class Meta:
        verbose_name = _("Dealer")
        verbose_name_plural = _("Dealers")
        ordering = ["-created_at"]
