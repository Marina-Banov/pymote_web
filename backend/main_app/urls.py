from django.conf.urls import url
from . import views

urlpatterns = [
    url('api/upload_network/', views.upload_network, name='upload_network'),
    url(r'^', views.IndexView.as_view(), name='index'),
]
