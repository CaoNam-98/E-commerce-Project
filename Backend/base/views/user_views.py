from django.shortcuts import render
from django.http import JsonResponse
from base.products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import Product
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # print(data): lấy refresh và access
        serializer = UserSerializerWithToken(self.user).data
        # print(serializer): lấy id, _id, username, email,...
        # print(serializer.items)
        for k,v in serializer.items(): # k là key, v là value
            # print(k,v, 'dòng 21')
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView): # Khi bên url gọi tới hàm này thì nó chạy vào TokenObtainPairSerializer
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # Thông tin user email không được trung với các user đã có
        user = User.objects.create(
            first_name=data['name'], # first name thay cho name trong serializer
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()
    # Phải có token mới truy cập vào được nên dùng UserSerializerWithToken
    serializer = UserSerializerWithToken(user, many=False) 
    return Response(serializer.data)

# Get all users
@api_view(['GET'])
# Nếu truyền vào token là một user không phải là admin thì sẽ báo lỗi
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUserDetails(request, pk):
    user = User.objects.get(id=pk) # search ptu co _id = pk trên url
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data) 