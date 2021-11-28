# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from apps.accounts.models import User, SellerProfile, UserProfile
from apps.accounts.forms import UserCreationForm, UserChangeForm

admin.site.site_header = "A-Cordes Admin"
admin.site.site_title = "A-Cordes Admin"
admin.site.index_title = "A-Cordes Admin"


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = (
        "email",
        "is_active",
        "is_staff",
        "is_admin",
    )
    list_filter = ("is_admin", "is_active")
    fieldsets = (
        (
            None,
            {
                "fields": ("email", "password"),
            },
        ),
        (
            "Permissions",
            {
                "fields": ("is_active", "is_staff", "is_admin"),
            },
        ),
        (
            "Other",
            {
                "fields": ("created_at",),
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                    "is_admin",
                ),
            },
        ),
    )

    search_fields = ("email",)
    readonly_fields = ("created_at",)
    ordering = ("email",)
    filter_horizontal = ()


class SellerProfileAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


class UserProfileAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at",)


admin.site.register(User, UserAdmin)
admin.site.register(SellerProfile, SellerProfileAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
