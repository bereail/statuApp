from rest_framework import viewsets, filters
from .models import Statue
from .api_serializers import StatueListSerializer, StatueDetailSerializer

class StatueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Statue.objects.filter(is_published=True)
        .select_related("author", "location")
        .prefetch_related("tags", "media")
    )
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title","description_md","barrio","material","author__name","location__name"]

    def get_serializer_class(self):
        return StatueDetailSerializer if self.action == "retrieve" else StatueListSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request  # <- para armar URLs absolutas
        return ctx
