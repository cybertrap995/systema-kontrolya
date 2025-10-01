from rest_framework import serializers
from .models import Project, Defect, Comment

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class DefectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defect
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
