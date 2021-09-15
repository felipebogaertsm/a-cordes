from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.get_orders, name='orders'),
    path('add/', views.add_order_items, name='orders_add'),
    path('myorders/', views.get_my_orders, name='my_orders'),

    path('<str:pk>/', views.get_order_by_id, name='user_order'),
    path('<str:pk>/pay/', views.update_order_to_paid, name='pay'),
]
