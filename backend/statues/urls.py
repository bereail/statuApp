# backend/statues/urls.py
from django.urls import path
from .views_mock import StatueListMock, StatueDetailMock

urlpatterns = [
    path("estatuas/", StatueListMock.as_view(), name="estatuas-list"),
    path("estatuas/<slug:slug>/", StatueDetailMock.as_view(), name="estatuas-detail"),
]
