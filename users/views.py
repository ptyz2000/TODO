from rest_framework import viewsets, mixins

from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       viewsets.GenericViewSet,
                       mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
