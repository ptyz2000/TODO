from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4


class User(AbstractUser):
    email = models.EmailField(unique=True)
    UUID = models.UUIDField(primary_key=True, default=uuid4)
