from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('ENGINEER', 'Инженер'),
        ('MANAGER', 'Менеджер'),
        ('OBSERVATOR', 'Наблюдатель'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ENGINEER')

    def __str__(self):
        return self.username
