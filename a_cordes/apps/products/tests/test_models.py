# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

import pytest

from django.db.utils import IntegrityError
from django.template.defaultfilters import slugify

from apps.products.models import Product


@pytest.mark.django_db
def test_product_crud(seller_1):
    product_name = "Product 1"
    product_count_in_stock = 3

    product = Product.objects.create(
        name=product_name,
        seller_profile=seller_1,
        price=1000,
        count_in_stock=product_count_in_stock,
    )

    assert product.slug is not None  # make sure slug is created
    assert product.slug == slugify(product_name)
    assert product == Product.objects.get(_id=product._id)

    product_count_in_stock -= 1
    product.count_in_stock = product_count_in_stock
    product.save()

    assert product.count_in_stock == product_count_in_stock

    product.delete()

    try:
        Product.objects.get(_id=product._id)
        assert False
    except Product.DoesNotExist:
        assert True


@pytest.mark.django_db(transaction=True)
def test_product_count_in_stock_validation(seller_1):
    product_name = "Product 1"

    try:
        Product.objects.create(
            name=product_name,
            seller_profile=seller_1,
            price=1000,
            count_in_stock=-1,
        )
        assert False
    except IntegrityError:
        assert True

    Product.objects.create(
        name=product_name,
        seller_profile=seller_1,
        price=1000,
        count_in_stock=3,
    )
