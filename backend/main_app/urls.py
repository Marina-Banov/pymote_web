from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/upload_network$', views.upload_network, name='upload_network'),
    url(r'^api/simulation_action$', views.simulation_action, name='simulation_action'),
    url(r'^$', views.index, name='index'),
]
