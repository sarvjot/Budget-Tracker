import random, string

from django.contrib.auth import get_user_model
from django.http.request import validate_host
from rest_framework import serializers
from base.models import Transaction, FriendshipKey

User = get_user_model()

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction 
        fields = '__all__'
        depth = 2

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }


    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(6))

        user = User(username=username)
        user.set_password(password)
        user.save()

        friendship_key = FriendshipKey(key=key, username=user)
        friendship_key.save()

        return user
