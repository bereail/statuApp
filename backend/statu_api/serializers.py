from rest_framework import serializers
from statues.models import Statue, Media, Tag, Author, Location

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("kind","url","caption","credit")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name",)

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ("name","birth_year","death_year","bio_md")

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("name","address","barrio","lat","lng","notes_md")

class StatueListSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.name", default=None)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Statue
        fields = ("slug","title","barrio","year","author","tags")

class StatueDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    media = MediaSerializer(many=True, read_only=True)
    class Meta:
        model = Statue
        fields = (
            "slug","title","description_md","year","material","barrio","lat","lng",
            "resumen_corto","resumen_extenso","dato_curioso",
            "author","location","tags","media","is_published","created_at","updated_at"
        )
