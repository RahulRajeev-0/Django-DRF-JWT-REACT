# ------------------ IMPORTS HERE -----------------------------
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView



# --------------------------- views --------------------------------------
class getAccountsRoutes(APIView):
    def get(self, request, format=None):
        routes = [
            'api/user/login',
            'api/user/register',
        ]
        return Response(routes)
