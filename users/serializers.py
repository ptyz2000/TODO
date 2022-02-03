from django.contrib.auth import get_user_model
from rest_framework.serializers import HyperlinkedModelSerializer


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'first_name', 'last_name')


class UserModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')
