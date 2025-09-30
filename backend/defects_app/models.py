from django.db import models
from django.conf import settings

class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Defect(models.Model):
    STATUS_CHOICES = [
        ('Новая', 'Новая'),
        ('В работе', 'В работе'),
        ('На проверке', 'На проверке'),
        ('Закрыта', 'Закрыта'),
        ('Отменена', 'Отменена'),
    ]

    PRIORITY_CHOICES = [
        ('Низкий', 'Низкий'),
        ('Средний', 'Средний'),
        ('Высокий', 'Высокий'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Новая')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='Средний')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    executor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    text = models.TextField()
    defect = models.ForeignKey(Defect, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Комментарий от {self.author} к {self.defect}"
