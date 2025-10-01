from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, DefectViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'defects', DefectViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
