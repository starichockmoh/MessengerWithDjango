from account.models import AdvUser, AvatarImageProfile

from account.serializers import (AdvUserSerializer, AvatarImageProfileSerializer)

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


class PhotoOfUserList(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user_photo = AvatarImageProfile.objects.all()
        serializer = AvatarImageProfileSerializer(user_photo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AvatarImageProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PhotoOfUserDetail(APIView):
    permission_classes = [IsAuthenticated, ]

    def delete(self, request, photo_pk):
        user_photo = AvatarImageProfile.objects.get(pk=photo_pk)
        user_photo.delete()
        serializer = AdvUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


