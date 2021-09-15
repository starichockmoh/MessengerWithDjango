from rest_framework import serializers
from main.models import AdvUser, AvatarImageProfile
from rest_framework.response import Response


class FriendsListSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    avatar = serializers.ImageField(read_only=True, allow_null=True)
    last_active = serializers.DateTimeField(read_only=True, allow_null=True)
    is_online = serializers.BooleanField(read_only=True)

    class Meta:
        model = AdvUser
        fields = ["pk", "avatar", "last_active", "is_online", "first_name", "last_name"]


class AdvUserSerializer(serializers.ModelSerializer):
    friends = FriendsListSerializer(many=True, required=False)
    password = serializers.CharField(write_only=True, required=False)

    def create(self, validated_data):
        user = AdvUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.about_user = validated_data.get('about_user', instance.about_user)
        instance.telephone = validated_data.get('telephone', instance.telephone)
        instance.save()
        return instance

    class Meta:
        model = AdvUser
        fields = ["pk", "last_active",
                  "is_online", "first_name",
                  "last_name", "about_user", "username",
                  "friends", "telephone", "password",
                  ]
        read_only_fields = ('last_active', 'is_online', 'pk')
        extra_kwargs = {'username': {'required': False}}


