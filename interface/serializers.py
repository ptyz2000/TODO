from rest_framework import serializers

from users.serializers import UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    authors = UserModelSerializer

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.ModelSerializer):
    project = ProjectModelSerializer()
    author = UserModelSerializer()

    class Meta:
        model = ToDo
        exclude = ("is_active",)
