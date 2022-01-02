from django.db import models
from uuid import uuid4


class User(models.Model):
    uname = models.CharField(max_length=64)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    e_mail = models.EmailField(unique=True)
    UUID = models.UUIDField(primary_key=True, default=uuid4(), editable=False)
