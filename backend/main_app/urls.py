from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/upload_network$', views.upload_network, name='upload_network'),
    url(r'^api/run_simulation$', views.run_simulation, name='run_simulation'),
    url(r'^$', views.index, name='index'),
]
