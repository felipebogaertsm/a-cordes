# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from django_filters import FilterSet

from .models import Product


class ProductFilterSet(FilterSet):
    class Meta:
        model = Product
        fields = {
            "seller_profile": ["exact"],
            "count_in_stock": ["exact"],
            "name": ["icontains"],
            "count_in_stock": ["gte", "lte"],
            "category__name": ["icontains", "in"],
        }
