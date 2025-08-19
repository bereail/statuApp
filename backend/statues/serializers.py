from rest_framework import serializers
from .models import Statue, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "slug"]

class StatueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statue
        fields = "__all__"
