from django.db import models
from uuid import uuid4


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    authors = models.ManyToManyField("users.User")
    repo = models.URLField(blank=True)
    UUID = models.UUIDField(primary_key=True, default=uuid4)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    cr_date = models.DateTimeField(auto_now_add=True)
    upd_date = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey("users.User", on_delete=models.PROTECT)
    UUID = models.UUIDField(primary_key=True, default=uuid4)
