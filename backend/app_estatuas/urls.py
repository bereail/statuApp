from django.urls import path
from .views import EstatuasList, EstatuaDetail

urlpatterns = [
    path("estatuas/", EstatuasList.as_view(), name="estatuas-list"),
    path("estatuas/<slug:slug>/", EstatuaDetail.as_view(), name="estatuas-detail"),
]
