from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins

from .serializers import UserModelSerializer, UserModelSerializerV2


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       viewsets.GenericViewSet,
                       mixins.UpdateModelMixin):
    queryset = get_user_model().objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerV2
        return UserModelSerializer
