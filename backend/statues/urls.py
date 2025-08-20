from django.urls import path
from .views import lista_estatuas, detalle_estatua

urlpatterns = [
    path("estatuas/", lista_estatuas, name="statues_list"),
    path("estatuas/<slug:slug>/", detalle_estatua, name="statue_detail"),
]
