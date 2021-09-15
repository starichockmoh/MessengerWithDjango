from channel.models import Channel, Post, Comment, ImagePost, AdvUser

from channel.serializers import (ChannelListSerializer,
                                 ChannelDetailSerializer,
                                 PostSerializer,
                                 CommentSerializer,
                                 PostPhotoSerializer,
                                 )

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.parsers import MultiPartParser, FileUploadParser

from django.http import Http404


class ChannelList(APIView):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (MultiPartParser, FileUploadParser,)

    def get(self, request):
        channels = Channel.objects.all()
        serializer = ChannelListSerializer(channels, many=True)
        return Response({'channels': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ChannelListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChannelDetail(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Channel.objects.get(pk=pk)
        except Channel.DoesNotExist:
            raise Http404('Not found')

    def get(self, request, pk):
        channel = self.get_object(pk)
        serializer = ChannelDetailSerializer(channel)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        channel = self.get_object(pk)
        if request.user == channel.creator:
            participents = channel.participents
            serializer = ChannelDetailSerializer(channel, data=request.data,
                                                 context={'pk': pk, 'participents': participents})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('Запрещено. У клиента нет прав доступа к содержимому', status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        channel = self.get_object(pk)
        channel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Пользоваться может только админ канала надо доделать валидацию профиля
class DeleteFromChannel(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Channel.objects.get(pk=pk)
        except Channel.DoesNotExist:
            raise Http404('Not found')

    def delete(self, request, pk, user_pk):
        channel = self.get_object(pk)
        if request.user in channel.admins.all():
            user = AdvUser.objects.get(pk=user_pk)
            channel.participents.remove(user)
            serializer = ChannelDetailSerializer(channel)
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


class AddOrDeleteFromChannel(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Channel.objects.get(pk=pk)
        except Channel.DoesNotExist:
            raise Http404('Not found')

    def put(self, request, pk):
        channel = self.get_object(pk)
        serializer = ChannelDetailSerializer(channel)
        if request.user in channel.participents.all():
            channel.participents.remove(request.user)
            return Response(serializer.data, status.HTTP_204_NO_CONTENT)
        else:
            channel.participents.add(request.user)
            return Response(serializer.data, status.HTTP_200_OK)


class PostList(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response({'posts': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'posts': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404('Not found')

    def get(self, request, pk):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        post = self.get_object(pk)
        if request.user in post.channel.admins.all():
            serializer = PostSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostPhotoList(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        post_photo = ImagePost.objects.all()
        serializer = PostPhotoSerializer(post_photo, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostPhotoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentList(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(APIView):
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404('Not found')

    def put(self, request, pk):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        comment = self.get_object(pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DeleteOrAddAdmin(APIView):
    permission_classes = [IsAuthenticated, ]

    # Добавление пользователя в админы
    def put(self, request, channel_pk, user_pk):
        channel = Channel.objects.get(pk=channel_pk)
        user = AdvUser.objects.get(pk=user_pk)
        serializer = ChannelDetailSerializer(channel)
        if request.user == channel.creator:
            channel.admins.add(user)
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, channel_pk, user_pk):
        channel = Channel.objects.get(pk=channel_pk)
        user = AdvUser.objects.get(pk=user_pk)
        serializer = ChannelDetailSerializer(channel)
        if request.user == channel.creator:
            channel.admins.remove(user)
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
