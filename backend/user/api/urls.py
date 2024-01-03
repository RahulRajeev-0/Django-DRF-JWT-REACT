# ------------------------------ imports ------------------------ 
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (  # for JWT AUTHENTICATION 
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getAccountsRoutes.as_view(), name='accounts-routes'),

    # authentication 
    path("login/", views.LoginView.as_view(), name="user-login"),

    # FOR JWT AUTHENTICATION 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
