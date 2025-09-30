from rest_framework import generics, permissions
from users.models import CustomUser
from .serializers import UserSerializer

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # только админ может видеть список пользователей
