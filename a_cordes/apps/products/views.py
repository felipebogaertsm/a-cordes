# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at me@felipebm.com

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from apps.products.models import Product, ProductImage, Review
from apps.products.serializers import ProductSerializer, ReviewSerializer

from utils.mixins.views import SearchableModelViewSet
from utils.permissions import ReadOnly


class ProductViewSet(SearchableModelViewSet, ModelViewSet):
    model = Product
    serializer_class = ProductSerializer

    lookup_field = "slug"

    permission_classes = (IsAdminUser | ReadOnly,)
    filterset_fields = ("name", "seller_profile", "count_in_stock")
    ordering = ("-count_in_stock", "-created_at")

    @action(detail=False, methods=["get"])
    def recent(self, request):
        queryset = self.get_queryset().filter(count_in_stock__gte=1)

        try:
            keyword = request.query_params["keyword"]
            queryset = queryset.filter(name__icontains=keyword)
        except KeyError:
            pass

        serializer = self.serializer_class(queryset[0:10], many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def top(self, request):
        queryset = (
            self.get_queryset()
            .filter(rating__gte=4, count_in_stock__gte=1)
            .order_by("-rating")[0:10]
        )
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["patch"], url_path="add-image")
    def add_image(self, request, pk):
        product = self.model.objects.get(_id=pk)
        ProductImage.objects.create(
            product=product, src=request.data["image"], alt=""
        )

        serializer = self.serializer_class(product, many=False)
        return Response(serializer.data)

    @action(detail=True, methods=["get", "post"])
    def review(self, request, pk):
        user = request.user
        product = self.model.objects.get(_id=pk)
        product_review_set = product.review_set.filter(user=user)

        if request.method == "get":  # list product reviews
            return Response(
                ReviewSerializer(product_review_set, many=True).data
            )

        elif request.method == "post":  # creation of review
            if product_review_set.exists():
                return Response(
                    {"message": "User has already reviewed this product"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            review = Review.objects.create(
                product=product,
                user=user,
                rating=request.data["rating"],
                comment=request.data["comment"],
            )

            serializer = ReviewSerializer(review, many=False)
            return Response(serializer.data)


class ReviewViewSet(SearchableModelViewSet, ModelViewSet):
    permission_classes = (IsAuthenticated,)
    filterset_fields = ("product",)
    model = Review
    serializer_class = ReviewSerializer
