from uuid import uuid4
from django.conf import settings
from django.db import models


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    authors = models.ManyToManyField(settings.AUTH_USER_MODEL)
    repo = models.URLField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    cr_date = models.DateTimeField(auto_now_add=True)
    upd_date = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        ordering = ['cr_date']
