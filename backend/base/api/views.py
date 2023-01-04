import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import TransactionSerializer, UserRegisterSerializer

from django.contrib.auth.models import User
from base.models import Transaction, FriendshipKey

class RegisterAPIView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(response_data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    user = request.user
    friendship_key = FriendshipKey.objects.get(username__username=user)
    
    user_data = {
        "key": friendship_key.key,
        "username": friendship_key.username.username
    }
    return Response(user_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTransactions(request):
    user = request.user
    transactions = user.transaction_set.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postTransactions(request):
    data = request.data
    wrong_keys = []

    for friend in data['friends']:
        if(friend['is_member'] == "false"):
            continue

        username = friend['username']
        key = friend['key']

        friendship_key = FriendshipKey.objects.get(username__username=username)

        if(key != friendship_key.key):
            wrong_keys.append(friend)

    if(len(wrong_keys) == 0):
        new_transaction = Transaction(category=data['category'], amount=data['amount'], date=datetime.date.today(), count_splitters=len(data['friends'])+1)
        new_transaction.save()

        current_user_id = User.objects.get(pk=request.user.id).pk
        new_transaction.users.add(current_user_id)
        
        for friend in data['friends']:
                if(friend['is_member'] == "false"):
                    continue

                username = friend['username']

                user_id = User.objects.get(username=username).pk
                new_transaction.users.add(user_id)

        return Response("Some Success Message here")

    else:
        # also can return wrong_keys from here
        return Response("Some Error Message here")
