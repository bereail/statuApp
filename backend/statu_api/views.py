from rest_framework import viewsets, filters
from statues.models import Statue, Tag, Author
from .serializers import StatueListSerializer, StatueDetailSerializer, TagSerializer, AuthorSerializer

class StatueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Statue.objects.filter(is_published=True).select_related("author","location").prefetch_related("tags","media")
    filter_backends = [filters.SearchFilter]
    search_fields = ["title","barrio","description_md","slug","author__name","tags__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return StatueListSerializer
        return StatueDetailSerializer

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Author.objects.all().order_by("name")
    serializer_class = AuthorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
