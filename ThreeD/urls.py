from django.urls import path 
from . import views 
app_name="the3d"

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
]
