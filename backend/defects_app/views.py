from django.shortcuts import render
from .models import Project

def index(request):
    projects = Project.objects.all()
    return render(request, 'defects_app/index.html', {'projects': projects})

from rest_framework import viewsets
from .models import Project, Defect, Comment
from .serializers import ProjectSerializer, DefectSerializer, CommentSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class DefectViewSet(viewsets.ModelViewSet):
    queryset = Defect.objects.all()
    serializer_class = DefectSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
