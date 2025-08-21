from rest_framework import serializers
from statues.models import Statue, Author, Location, Media, Tag


class AuthorMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ("name", "birth_year", "death_year")


class LocationMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("name", "barrio", "lat", "lng")


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ("kind", "url", "caption", "credit", "created_at")


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name",)


class StatueListSerializer(serializers.ModelSerializer):
    author = AuthorMiniSerializer(read_only=True)
    location = LocationMiniSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Statue
        fields = (
            "slug", "title", "barrio", "year", "material",
            "author", "location", "tags", "image"
        )

    def get_image(self, obj):
        # portada: primera foto si existe
        photo = next((m for m in obj.media.all() if m.kind == "foto"), None)
        return photo.url if photo else None


class StatueDetailSerializer(serializers.ModelSerializer):
    author = AuthorMiniSerializer(read_only=True)
    location = LocationMiniSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Statue
        fields = (
            "id", "slug", "title", "description_md", "year", "material",
            "barrio", "lat", "lng",
            "resumen_corto", "resumen_extenso", "dato_curioso",
            "author", "location", "tags", "media",
            "is_published", "created_at", "updated_at"
        )
