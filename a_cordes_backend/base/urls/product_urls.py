from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.get_products, name='products'),
    path('create/', views.create_product, name='create_product'),
    path('upload/', views.upload_image, name='image_upload'),
    path('<str:pk>/', views.get_product, name='product'),

    path('update/<str:pk>/', views.update_product, name='update_product'),
    path('delete/<str:pk>/', views.delete_product, name='delete_product'),
]
