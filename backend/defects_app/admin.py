from django.contrib import admin
from .models import Project, Defect, Comment

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')

@admin.register(Defect)
class DefectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'priority', 'project', 'executor', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'defect', 'author', 'created_at')
