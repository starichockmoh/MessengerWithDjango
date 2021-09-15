from main.models import AdvUser

from main.serializers import (AdvUserSerializer)

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND


class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdvUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentProfile(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        serializer = AdvUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = AdvUserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Profile(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return AdvUser.objects.get(pk=pk)
        except AdvUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        profile = self.get_object(pk)
        serializer = AdvUserSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


