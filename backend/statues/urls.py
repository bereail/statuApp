from django.urls import path, include
from rest_framework import routers
from .api_views import StatueViewSet

router = routers.DefaultRouter()
router.register(r"statues", StatueViewSet, basename="statues")

urlpatterns = [
    path("", include(router.urls)),
]
