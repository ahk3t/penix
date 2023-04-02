from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken

from base.models.users import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "is_admin", "is_manager"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, user, validated_data):
        password = validated_data.pop("password", None)
        if password:
            user.set_password(password)
        for attr, value in validated_data.items():
            setattr(user, attr, value)
        user.save()
        return user


class UserWithTokenSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    access_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["user", "access_token"]

    def get_user(self, user):
        return UserSerializer(user).data

    def get_access_token(self, user):
        access_token = AccessToken.for_user(user)
        return str(access_token)
