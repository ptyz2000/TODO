from rest_framework import viewsets, mixins

from django.contrib.auth import get_user_model
from .serializers import UserModelSerializer


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       viewsets.GenericViewSet,
                       mixins.UpdateModelMixin):
    queryset = get_user_model().objects.all()
    serializer_class = UserModelSerializer
