from rest_framework import serializers
from account.models import AdvUser, AvatarImageProfile
from rest_framework.response import Response


class AvatarImageProfileSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        request = self.context.get("request")
        user_photo = AvatarImageProfile.objects.create(
            image=validated_data['image'],
            user=request.user
        )
        return user_photo

    class Meta:
        model = AvatarImageProfile
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}


class FriendsListSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    last_active = serializers.DateTimeField(read_only=True, allow_null=True)
    is_online = serializers.BooleanField(read_only=True)
    addit_image = AvatarImageProfileSerializer(many=True, required=False)

    class Meta:
        model = AdvUser
        fields = ["pk", "last_active", "is_online", "first_name", "last_name", "addit_image"]


class AdvUserSerializer(serializers.ModelSerializer):
    friends = FriendsListSerializer(many=True, required=False)
    password = serializers.CharField(write_only=True, required=False)
    addit_image = AvatarImageProfileSerializer(many=True, required=False)

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
                  "friends", "telephone", "password", "addit_image"
                  ]
        read_only_fields = ('last_active', 'is_online', 'pk')
        extra_kwargs = {'username': {'required': False}}

