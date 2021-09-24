from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import *
from base.serializers import *


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    seller = Seller.objects.filter(user=user)[0]

    product = Product.objects.create(
        seller=seller,
        name="Sample Name",
        price=1000,
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data["name"]
    product.price = data["price"]
    product.countInStock = data["countInStock"]
    product.description = data["description"]
    product.category = data["category"]

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product deleted")


@api_view(["POST"])
def upload_image(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get("image")
    product.save()

    return Response("Image was uploaded")


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_product_review(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    seller = Seller.objects.filter(user=user)[0]
    data = request.data

    # Scenario 1: review already exists
    already_exists = product.review_set.filter(user=user).exists()

    if already_exists:
        content = {"detail": "Product already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Scenario 2: no rating or 0
    if data["rating"] == 0:
        content = {"detail": "Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Scenario 3: create review
    review = Review.objects.create(
        user=user,
        product=product,
        seller=seller,
        rating=int(data["rating"]),
        comment=data["comment"],
    )

    reviews = product.review_set.all()
    product.numReviews = len(reviews)
    ratings = [review.rating for review in reviews]
    product.rating = sum(ratings) / len(reviews)

    review.save()
    product.save()

    return Response("Review added")
