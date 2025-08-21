# statu_api/api_urls.py  (API)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StatueViewSet, TagViewSet, AuthorViewSet

router = DefaultRouter()
router.register(r"statues", StatueViewSet, basename="statue")
router.register(r"tags", TagViewSet, basename="tag")
router.register(r"authors", AuthorViewSet, basename="author")

urlpatterns = [
    path("api/v1/", include(router.urls)),
]
