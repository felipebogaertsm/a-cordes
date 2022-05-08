# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework import serializers

from apps.accounts.serializers import SellerProfileSerializer
from apps.products.models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    seller = SellerProfileSerializer(many=False, source="seller_profile")

    class Meta:
        model = Product
        exclude = ("seller_profile",)

    def get_reviews(self, obj):
        reviews = obj.review_set.all()  # get all reviews
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.image:
            ret['image'] = instance.image.url
        return ret
