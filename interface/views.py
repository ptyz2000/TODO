from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, UserModelSerializer


class ProjectModelPageNumberPagination(PageNumberPagination):
    page_size = 10


class ToDoModelPageNumberPagination(PageNumberPagination):
    page_size = 20


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectModelPageNumberPagination
    filterset_fields = {'name': ['exact', 'startswith'], 'authors': ['exact', 'startswith']}


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoModelPageNumberPagination
    filterset_fields = ['project', 'author']


class UserModelViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserModelSerializer
