# app: statues
from rest_framework.routers import DefaultRouter
from .views import StatueViewSet

router = DefaultRouter()
router.register(r"statues", StatueViewSet, basename="statues")

urlpatterns = router.urls
