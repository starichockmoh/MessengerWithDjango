from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from channel.models import *
from account.serializers import FriendsListSerializer


class CommentSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get("request")
        comment = Comment.objects.create(
            author=request.user,
            text=validated_data['text'],
            post=validated_data['post']
        )
        return comment

    class Meta:
        model = Comment
        fields = '__all__'
        read_only = ['pk', 'author', 'datetime', 'post']
        extra_kwargs = {'author': {'required': False},
                        'post': {'required': False}}


class PostPhotoSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        request = self.context.get("request")
        post_photo = ImagePost.objects.create(
            image=validated_data['image'],
            post=validated_data['post'],
            channel=validated_data['channel'],
            sender=request.user
        )
        return post_photo

    class Meta:
        model = ImagePost
        fields = '__all__'
        extra_kwargs = {'sender': {'required': False}}


class PostSerializer(serializers.ModelSerializer):
    # get_image_post = serializers.ImageField(many=True, required=False)
    # get_video_post = serializers.ImageField(many=True, required=False)
    get_comments = CommentSerializer(many=True, required=False)

    def create(self, validated_data):
        request = self.context.get("request")
        if request.user in validated_data['channel'].admins.all():
            return Post.objects.create(**validated_data)
        else:
            raise serializers.ValidationError('You will not be an admin')

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['pk', 'get_comments']
        extra_kwargs = {'text': {'required': False}}


class ChannelListSerializer(serializers.ModelSerializer):
    get_posts = PostSerializer(many=True, required=False)
    creator = FriendsListSerializer(required=False)

    def create(self, validated_data):
        request = self.context.get("request")
        channel = Channel.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            avatar=validated_data['avatar'],
            creator=request.user
        )
        channel.participents.add(request.user)
        channel.save()
        return channel

    class Meta:
        model = Channel
        fields = ['pk', 'title', 'get_posts', 'description', 'avatar', 'creator']
        extra_kwargs = {'avatar': {'required': False},
                        'description': {'required': False},
                        'admins': {'required': False},
                        'participents': {'required': False}
                        }
        read_only_fields = ['pk']
        write_only = ['description']


class ChannelDetailSerializer(serializers.ModelSerializer):
    participents = FriendsListSerializer(many=True, required=False)
    admins = FriendsListSerializer(many=True, required=False)
    get_posts = PostSerializer(many=True, required=False)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

    class Meta:
        model = Channel
        fields = '__all__'
        extra_kwargs = {'title': {'required': False},
                        'description': {'required': False},
                        'avatar': {'required': False}}
