from uuid import uuid4

from django.db import models


class User(models.Model):
    username = models.CharField(max_length=64)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    UUID = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['username']
