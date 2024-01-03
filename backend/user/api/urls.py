# ------------------------------ imports ------------------------ 
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (  # for JWT AUTHENTICATION 
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getAccountsRoutes.as_view(), name='accounts-routes'),

    # FOR JWT AUTHENTICATION 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
