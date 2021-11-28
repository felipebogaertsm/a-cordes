from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path("login/", views.MyTokenObtainPairView.as_view(), name="users_login"),
    path("register/", views.register_user, name="register"),
    path("", views.get_users, name="users"),
    path("profile/", views.get_user_profile, name="users_profile"),
    path(
        "profile/update/",
        views.update_user_profile,
        name="user_profile_update",
    ),
    path("<str:pk>/", views.get_user_by_id, name="user"),
    path("update/<str:pk>/", views.update_user, name="user_update"),
    path("delete/<str:pk>/", views.delete_user, name="user_delete"),
]
