from . import views
from django.urls import path

urlpatterns = [
    path('', views.download_video,name='download_video'),
]
