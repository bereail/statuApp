# statu_api/views.py
from rest_framework.viewsets import ReadOnlyModelViewSet
from statues.models import Statue
from .serializers import StatueListSerializer, StatueDetailSerializer

class StatueViewSet(ReadOnlyModelViewSet):
    queryset = Statue.objects.all()

    def get_serializer_class(self):
        return StatueListSerializer if self.action == 'list' else StatueDetailSerializer
