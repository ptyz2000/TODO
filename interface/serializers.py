from rest_framework import serializers

from .models import Project, ToDo


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):
    authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
    project = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    cr_date = serializers.DateTimeField(format='%Y.%m.%d %H:%M')
    upd_date = serializers.DateTimeField(format='%Y.%m.%d %H:%M')

    class Meta:
        model = ToDo
        fields = '__all__'
