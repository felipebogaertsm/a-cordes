# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from apps.accounts.models import User


class UserForm(forms.ModelForm):
    """
    Generic form for handling user data.

    Contains clean methods for several types of user forms, including user
    creation and change.
    """

    def clean_company(self):
        pass


class UserCreationForm(UserForm):
    """
    Form for creating new users.
    This replaces the original UserCreationForm provided by Django.
    """

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Confirm password", widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = ("email",)

    def clean_password2(self):
        password1 = self.data.get("password1")
        password2 = self.data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords do not match.")
        return password2


class UserChangeForm(UserForm):
    """
    Form for updating users.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ("email",)
