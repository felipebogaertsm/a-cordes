from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='users_login'),
    path('register/', views.register_user, name='register'),

    path('', views.get_users, name='users'),
    path('profile/', views.get_user_profile, name='users_profile'),
]
