from django.contrib.auth import get_user_model
from graphene import ObjectType, List, Schema, Field, String
from graphene_django import DjangoObjectType

from interface.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


# noinspection PyMethodMayBeStatic
class Query(ObjectType):
    all_projects = List(ProjectType)
    project_by_name = Field(ProjectType, name=String(required=True))
    project_by_user_username = List(ProjectType, username=String(required=False))

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_name(self, info, name):
        try:
            return Project.objects.get(name=name)
        except Project.DoesNotExist:
            return None

    def resolve_project_by_user_username(self, info, username=None):
        if username:
            return Project.objects.filter(authors__username__exact=username)
        else:
            return Project.objects.all()


schema = Schema(query=Query)
