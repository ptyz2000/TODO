from rest_framework import serializers

from users.serializers import UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):
    authors = UserModelSerializer

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
    project = ProjectModelSerializer
    author = UserModelSerializer

    class Meta:
        model = ToDo
        fields = '__all__'
