from django.contrib.auth import get_user_model
from rest_framework.serializers import HyperlinkedModelSerializer


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
