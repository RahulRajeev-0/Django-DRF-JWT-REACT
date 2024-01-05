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
    path("register/", views.RegisterView.as_view(), name="user-register"),
    path('details/', views.UserDetails.as_view(), name="user-details"),
    path('details/update/', views.UserDetailsUpdate.as_view(), name="user-details-update"),
    
    # FOR JWT AUTHENTICATION 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
