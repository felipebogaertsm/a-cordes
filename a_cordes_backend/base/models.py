from django.db import models
from django.contrib.auth.models import User


class Seller(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2)

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.name}"


class Product(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(
        null=True, blank=True, default="/placeholder.jpeg"
    )

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.name}_{self.seller}_{self._id}"


class Review(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
    )  # product that got reviewed
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
    )  # user that did the review
    seller = models.ForeignKey(
        Seller,
        on_delete=models.SET_NULL,
        null=True,
    )  # seller that got reviewed
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.rating}_{self.product}_{self.user}_{self._id}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True
    )

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.createdAt}_{self.user}"


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=1)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )

    image = models.CharField(max_length=200, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.name}_{self._id}"


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True
    )
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )

    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.address}_{self._id}"
