# ------------------ IMPORTS HERE -----------------------------
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed,ParseError
from user.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework import status
# ---------------------------- views --------------------------------------
class getAccountsRoutes(APIView):
    def get(self, request, format=None):
        routes = [
            'api/user/login',
            'api/user/register',
        ]
        return Response(routes)

class LoginView(APIView):
    def post(self,request):
        try:
            email = request.data['email']
            password = request.data['password']

        except KeyError:
            raise ParseError('All Fields Are Required')
        
        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed ("Invalid Email Address")
        
        if not User.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed('You are blocked by admin ! Please contact admin')

        user = authenticate(email=email, password=password)
        if user is None:
            raise AuthenticationFailed("Invalid Password")
        
        refresh = RefreshToken.for_user(user)  # used to generate new refresh token for the user
        refresh["first_name"] = str(user.first_name)   # custom cliam in the access token

        content = {
                     'refresh': str(refresh),
                     'access': str(refresh.access_token),
                     'isAdmin':user.is_superuser,
                }
        
        return Response(content,status=status.HTTP_200_OK)