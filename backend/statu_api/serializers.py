# statu_api/serializers.py
from rest_framework import serializers
from statues.models import Statue  # ⬅️ ajusta si tu app no se llama "statues"

# LISTA (para /api/v1/statues/)
class StatueListSerializer(serializers.ModelSerializer):
    # Alias para los nombres que espera el frontend
    titulo = serializers.CharField(source='title')
    ubicacion = serializers.CharField(source='location', required=False, allow_null=True)

    # No hay campo de imagen en el modelo: devolvemos None por ahora
    imagen_destacada = serializers.SerializerMethodField()

    class Meta:
        model = Statue
        fields = ['slug', 'titulo', 'ubicacion', 'imagen_destacada']

    def get_imagen_destacada(self, obj):
        # Si más adelante agregás un ImageField (ej. obj.image.url) o una propiedad (obj.cover_url),
        # devolvela acá. Mientras tanto, None.
        return None


# DETALLE (para /api/v1/statues/<slug>/)
class StatueDetailSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source='title')
    ubicacion = serializers.CharField(source='location', required=False, allow_null=True)
    descripcion_md = serializers.CharField(source='description_md', required=False, allow_null=True)
    anio = serializers.IntegerField(source='year', required=False, allow_null=True)
    autor = serializers.CharField(source='author', required=False, allow_null=True)

    class Meta:
        model = Statue
        fields = [
            'slug', 'titulo', 'ubicacion', 'descripcion_md', 'anio',
            'barrio', 'lat', 'lng',
            'resumen_corto', 'resumen_extenso', 'dato_curioso',
            'autor', 'material', 'tags',
            'is_published', 'created_at', 'updated_at',
        ]
