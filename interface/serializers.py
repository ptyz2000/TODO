from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Project, ToDo


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'id']


class ProjectModelSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(many=True, slug_field='username', queryset=get_user_model().objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.ModelSerializer):
    project = serializers.SlugRelatedField(queryset=Project.objects.all(), slug_field='name')
    author = serializers.SlugRelatedField(queryset=get_user_model().objects.all(), slug_field='username')
    cr_date = serializers.DateTimeField(format='%Y.%m.%d %H:%M', read_only=True)
    upd_date = serializers.DateTimeField(format='%Y.%m.%d %H:%M', read_only=True)

    class Meta:
        model = ToDo
        fields = '__all__'
