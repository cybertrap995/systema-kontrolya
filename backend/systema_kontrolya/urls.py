from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # <- только один раз!
    path('api/', include('users.urls')),
    path('api/', include('defects_app.urls')),
]
