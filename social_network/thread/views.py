from thread.models import Thread, Message, MessegePhoto
from thread.serializers import (ThreadListSerializer,
                                MessegeSerializer,
                                ThreadDetailSerializer,
                                MessegePhotoSerializer,
                                ThreadListFrontSerializer
                                )

from account.models import AdvUser

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.parsers import MultiPartParser, FileUploadParser

from django.http import Http404
from django.db.models import Q

import json


# Класс для создания диалога но не для просмотра
class ThreadActiveOfUser(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = ThreadListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Класс для просмотра диалога
class ThreadActiveOfUserFront(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        threads = Thread.objects.filter(participants__in=[request.user]).exclude(
            Q(archive__in=[request.user]) |
            Q(deleted__in=[request.user])
        ).order_by("-date_of_last_message")
        serializer = ThreadListFrontSerializer(threads, many=True)
        messeges = Message.objects.all()
        return Response(serializer.data, status=status.HTTP_200_OK)


class ThreadArchiveOfUserFront(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        threads = Thread.objects.filter(
            Q(participants__in=[request.user]) &
            Q(archive__in=[request.user])
        ).exclude(deleted__in=[request.user]).order_by("-date_of_last_message")
        serializer = ThreadListFrontSerializer(threads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ThreadDetail(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Thread.objects.get(pk=pk)
        except Thread.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        thread = self.get_object(pk)
        # Убогая система непрочитанных сообщений
        # for message in thread.get_messages.all()[300:]:
        #     if message.sender != request.user:
        #         message.read = True
        #         message.save()
        #     else:
        #         pass
        serializer = ThreadDetailSerializer(thread)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        thread = self.get_object(pk)
        serializer = ThreadDetailSerializer(thread, data=request.data, partial=True, context={'thread_pk': pk})
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReductPushThread(APIView):
    permission_classes = [IsAuthenticated, ]

    def put(self, request, pk):
        thread = Thread.objects.get(pk=pk)
        if request.user in thread.push_notification.all():
            thread.push_notification.remove(request.user)
        else:
            thread.push_notification.add(request.user)
        serializer = ThreadDetailSerializer(thread)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReductDeletedThread(APIView):
    permission_classes = [IsAuthenticated, ]

    def put(self, request, pk):
        thread = Thread.objects.get(pk=pk)
        serializer = ThreadDetailSerializer(thread)
        if request.user in thread.deleted.all():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            thread.deleted.add(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ReductArchiveThread(APIView):
    permission_classes = [IsAuthenticated, ]

    def put(self, request, pk):
        thread = Thread.objects.get(pk=pk)
        if request.user in thread.archive.all():
            thread.archive.remove(request.user)
        else:
            thread.archive.add(request.user)
        serializer = ThreadDetailSerializer(thread)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WriteMessege(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        messages = Message.objects.all()
        serializer = MessegeSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MessegeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Создать права доступа только для отправителя
class ReductMessegeOwner(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise Http404('Not found')

    def delete(self, request, pk, format=None):
        messege = self.get_object(pk)
        serializer = ThreadListSerializer(messege.thread)
        messege.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        messege = self.get_object(pk)
        serializer = MessegeSerializer(messege, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MessegePhotoList(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        messege_photo = MessegePhoto.objects.all()
        serializer = MessegePhotoSerializer(messege_photo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MessegePhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReductMessege(APIView):
    permission_classes = [IsAuthenticated, ]

    def delete(self, request, pk):
        message = Message.objects.get(pk=pk)
        serializer = MessegeSerializer(message)
        message.who_deleted_the_message.add(request.user)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


# Channels thread functions

def get_current_user(username):
    user = AdvUser.objects.get(username=username)

    return user
