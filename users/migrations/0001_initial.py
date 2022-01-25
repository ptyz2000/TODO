# Generated by Django 4.0.1 on 2022-01-18 09:47

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(max_length=64)),
                ('firstname', models.CharField(max_length=64)),
                ('lastname', models.CharField(max_length=64)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('UUID', models.UUIDField(default=uuid.UUID('0b175e7c-b488-487f-a136-af2e74c6c561'), editable=False, primary_key=True, serialize=False)),
            ],
        ),
    ]
