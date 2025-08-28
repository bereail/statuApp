from rest_framework import serializers
from .models import Statue, Media

class MediaSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ("kind", "url", "caption", "credit")

    def get_url(self, obj):
        # 1) prioriza archivo subido
        raw = None
        file_field = getattr(obj, "file", None)
        if file_field:
            try:
                raw = file_field.url  # normalmente "/media/..."
            except Exception:
                raw = None
        # 2) si no hay archivo, usa la URL externa guardada
        if not raw:
            raw = obj.url or ""

        # 3) devolvé ABSOLUTA si hay request
        req = self.context.get("request")
        if raw.startswith("http://") or raw.startswith("https://"):
            return raw
        return req.build_absolute_uri(raw) if req else raw


class StatueListSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    location = serializers.StringRelatedField()
    tags = serializers.SlugRelatedField(many=True, slug_field="name", read_only=True)
    cover_url = serializers.SerializerMethodField()

    class Meta:
        model = Statue
        fields = ("slug","title","barrio","year","material","author","location","tags","cover_url")

    def _abs(self, raw: str) -> str:
        req = self.context.get("request")
        if raw.startswith("http://") or raw.startswith("https://"):
            return raw
        return req.build_absolute_uri(raw) if req else raw

    def get_cover_url(self, obj):
        # tomamos la primera foto si hay
        m = next((m for m in obj.media.all() if m.kind == "foto"), None)
        if not m:
            return None
        raw = getattr(m, "file", None).url if getattr(m, "file", None) else (m.url or "")
        return self._abs(raw)


class StatueDetailSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    location = serializers.StringRelatedField()
    tags = serializers.SlugRelatedField(many=True, slug_field="name", read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Statue
        fields = (
            "slug","title","description_md","year","material","barrio","lat","lng",
            "resumen_corto","resumen_extenso","dato_curioso",
            "author","location","tags","media"
        )
