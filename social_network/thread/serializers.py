from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from thread.models import *
from account.serializers import FriendsListSerializer


class MessegePhotoSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get("request")
        messege_photo = MessegePhoto.objects.create(
            image=validated_data['image'],
            thread=validated_data['thread'],
            message=validated_data['message'],
            sender=request.user
        )
        return messege_photo

    class Meta:
        model = MessegePhoto
        fields = '__all__'
        extra_kwargs = {'sender': {'required': False}}


class MessegeSerializer(serializers.ModelSerializer):
    get_images = MessegePhotoSerializer(many=True, required=False)
    datetime = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        request = self.context.get("request")
        thread = validated_data['thread']
        messege = Message.objects.create(
            text=validated_data['text'],
            sender=request.user,
            thread=thread,
        )
        thread.date_of_last_message = messege.datetime
        thread.save()
        return messege

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance

    class Meta:
        model = Message
        fields = ['pk', 'text', 'sender', 'datetime', 'thread', 'get_images', 'who_deleted_the_message']
        read_only_fields = ['sender', 'datetime']
        extra_kwargs = {'thread': {'required': False},
                        'who_deleted_the_message': {'required': False}}


class ThreadListSerializer(serializers.ModelSerializer):
    # participants = FriendsListSerializer(many=True, required=False)
    get_messeges = MessegeSerializer(many=True, required=False)

    class Meta:
        model = Thread
        fields = ['pk', 'participants', 'get_messeges', 'push_notification', 'archive']
        read_only_fields = ['pk', 'archive']


class ThreadDetailSerializer(serializers.ModelSerializer):
    participants = FriendsListSerializer(many=True, required=False)
    get_messeges = MessegeSerializer(many=True, required=False)

    def create(self, validated_data):
        return Thread.objects.create(**validated_data)

    class Meta:
        model = Thread
        fields = ['pk', 'participants', 'get_messeges', 'push_notification', 'archive', 'deleted']
        read_only_fields = ['pk', 'participants', 'get_messeges']
        extra_kwargs = {'participants': {'required': False}}


# Сериализатор для фронта чтобы отображались пользователи диалога
class ThreadListFrontSerializer(serializers.ModelSerializer):
    participants = FriendsListSerializer(many=True, required=False)
    last_message = MessegeSerializer(required=False)
    deleted = FriendsListSerializer(many=True, required=False)

    class Meta:
        model = Thread
        fields = ['pk', 'last_message', 'participants', 'push_notification', 'archive', 'deleted',
                  'date_of_last_message']
        read_only_fields = ['pk', 'archive']
