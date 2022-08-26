from django.urls import path
from .views import RegisterView
from rest_framework.authtoken import views


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register_auth'),
    path('token-auth/', views.obtain_auth_token),
]
