from rest_framework import viewsets, filters
from .models import Statue
from .serializers import StatueSerializer

class StatueViewSet(viewsets.ModelViewSet):
    queryset = Statue.objects.all()
    serializer_class = StatueSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "author", "material", "style", "barrio", "address", "description_md", "slug"]
