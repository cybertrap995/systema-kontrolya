from django.shortcuts import render
from .models import Project

def index(request):
    projects = Project.objects.all()
    return render(request, 'defects_app/index.html', {'projects': projects})
