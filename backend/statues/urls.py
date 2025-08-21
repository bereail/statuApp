from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StatueViewSet

router = DefaultRouter()
# /api/v1/statues/  y  /api/v1/statues/<slug>/
router.register(r"statues", StatueViewSet, basename="statue")

urlpatterns = [
    # Endpoints reales DRF
    path("", include(router.urls)),
]
