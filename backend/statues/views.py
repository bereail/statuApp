from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from django.db.models import Prefetch
from .models import Statue, Media
# IMPORT ABSOLUTO (no relativo)
from statu_api.serializers import StatueListSerializer, StatueDetailSerializer


class StatueViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /api/v1/statues/          → lista
    GET /api/v1/statues/<slug>/   → detalle (lookup por slug)
    """
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        # Query optimizada
        return (
            Statue.objects.filter(is_published=True)
            .select_related("author", "location")
            .prefetch_related(
                "tags",
                Prefetch("media", queryset=Media.objects.order_by("-created_at"))
            )
            .order_by("title")
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return StatueDetailSerializer
        return StatueListSerializer
