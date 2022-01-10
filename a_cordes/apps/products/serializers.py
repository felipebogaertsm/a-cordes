# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

from rest_framework import serializers

from apps.products.models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at")

    class Meta:
        model = Review
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    createdAt = serializers.DateTimeField(source="created_at")
    countInStock = serializers.DateTimeField(source="count_in_stock")
    reviewCount = serializers.BooleanField(source="review_count")

    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self, obj):
        reviews = obj.review_set.all()  # get all reviews
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
