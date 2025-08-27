# statues/views.py
from rest_framework import viewsets
from statues.models import Statue
from statu_api.serializers import StatueListSerializer, StatueDetailSerializer

class StatueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Statue.objects.filter(is_published=True)
        .select_related("author", "location")
        .prefetch_related("tags", "media")  # ajustá 'media' si tu related_name es otro
    )
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    def get_serializer_class(self):
        return StatueDetailSerializer if self.action == "retrieve" else StatueListSerializer
