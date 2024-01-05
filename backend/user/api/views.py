# ------------------ IMPORTS HERE -----------------------------
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed,ParseError
from user.models import User, UserProfile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, UserRegisterSerializer, UserProfile , UserDetailsUpdateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
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



# for getting user detail  
class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(id=request.user.id)
       
        data = UserSerializer(user).data
        try :
            profile_pic = user.User_Profile.profile_pic
            data['profile_pic'] = request.build_absolute_uri('/')[:-1]+profile_pic.url
        except:
            profile_pic = ''
            data['profile_pic']=''
            
        content = data
        return Response(content)
    

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            print("working")
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE,)  
       
        
        content ={'Message':'User Registered Successfully'}
        return Response(content,status=status.HTTP_201_CREATED,)


class UserDetailsUpdate(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get_or_create(user=request.user)[0]

     
        
        user_update_details_serializer = UserDetailsUpdateSerializer(
            user_profile, data=request.data, partial=True
        )
        
       
        if user_update_details_serializer.is_valid():
           
            user_update_details_serializer.save()
            return Response(user_update_details_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', user_update_details_serializer.errors)
            return Response(user_update_details_serializer.errors, status=status.HTTP_400_BAD_REQUEST)