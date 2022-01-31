from django.contrib.auth import get_user_model
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .models import Project, ToDo


class TestProjectViewSet(TestCase):

    def test_get_detail(self):
        get_user_model().objects.create_user('user', 'user@user.com', 'user1234')
        project = mixer.blend(Project)
        client = APIClient()
        client.login(username='user', password='user1234')
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToDoViewSet(APITestCase):

    def test_get_detail(self):
        todo = mixer.blend(ToDo)
        get_user_model().objects.create_user('user', 'user@user.com', 'user1234')
        self.client.login(username='user', password='user1234')
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
