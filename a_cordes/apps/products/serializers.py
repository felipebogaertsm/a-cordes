# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework import serializers

from apps.accounts.serializers import SellerProfileSerializer
from apps.products.models import Product, ProductImage, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.src:
            ret["src"] = instance.src.url
        return ret


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField(read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)
    seller = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = ("seller_profile",)

    def get_seller(self, obj):
        serializer = SellerProfileSerializer(obj.seller_profile)
        return serializer.data

    def get_images(self, obj):
        images = ProductImage.objects.filter(product___id=obj._id)
        serializer = ProductImageSerializer(images, many=True)
        return serializer.data

    def get_category(self, obj):
        return obj.category.name

    def get_reviews(self, obj):
        reviews = obj.review_set.all()  # get all reviews
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
