from rest_framework import serializers

from users.serializers import UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    author = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
