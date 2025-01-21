from django.db import models

# Create your models here.
class React(models.Model):
    nome = models.CharField(max_length=30)
    cargo = models.CharField(max_length=200)