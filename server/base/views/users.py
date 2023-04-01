from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from base.serializers import UserSerializer
from base.models import User
from base.permissions import IsAdmin

class UserList(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserDetail(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, id):
        user = User.get_by_pk(id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, id):
        updated_data = request.data
        user = User.get_by_pk(id)
        serializer = UserSerializer(user, data=updated_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, id):
        user = User.get_by_pk(id)
        user.delete()
        return Response("User deleted")


class AuthenticatedUserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        updated_data = request.data
        updated_data.pop("is_admin", None)
        updated_data.pop("is_manager", None)
        user = request.user
        serializer = UserSerializer(user, data=updated_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
