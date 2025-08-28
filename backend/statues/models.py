# statues/models.py
import uuid
from django.db import models
from django.utils import timezone


# =========================
# AUTORES
# =========================
class Author(models.Model):
    # Nombre del autor/escultor, único para evitar duplicados
    name = models.CharField(max_length=180, unique=True)
    # Años de nacimiento y fallecimiento (si se conocen)
    birth_year = models.SmallIntegerField(null=True, blank=True)
    death_year = models.SmallIntegerField(null=True, blank=True)
    # Biografía en texto enriquecido/Markdown
    bio_md = models.TextField(blank=True)

    def __str__(self): return self.name


# =========================
# UBICACIONES
# =========================
class Location(models.Model):
    # Nombre del lugar (plaza, parque, esquina…)
    name = models.CharField(max_length=180)
    address = models.CharField(max_length=240, blank=True)
    barrio = models.CharField(max_length=120, blank=True)
    # Coordenadas geográficas
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    # Notas adicionales
    notes_md = models.TextField(blank=True)

    def __str__(self): return self.name


# =========================
# ETIQUETAS
# =========================
class Tag(models.Model):
    # Palabras clave o categorías para agrupar estatuas
    name = models.CharField(max_length=120, unique=True)
    def __str__(self): return self.name


# =========================
# ESTATUAS
# =========================
class Statue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(unique=True, max_length=140)
    title = models.CharField(max_length=180)
    description_md = models.TextField(blank=True)
    year = models.SmallIntegerField(null=True, blank=True)
    material = models.CharField(max_length=120, blank=True)
    barrio = models.CharField(max_length=120, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    resumen_corto = models.CharField(max_length=350, blank=True)
    resumen_extenso = models.TextField(blank=True)
    dato_curioso = models.CharField(max_length=500, blank=True)

    author = models.ForeignKey('Author', null=True, blank=True, on_delete=models.SET_NULL, related_name="statues")
    location = models.ForeignKey('Location', null=True, blank=True, on_delete=models.SET_NULL, related_name="statues")
    is_published = models.BooleanField(default=True)
    tags = models.ManyToManyField('Tag', blank=True, related_name="statues")

    created_at = models.DateTimeField(auto_now_add=True)   # ← cambio recomendado
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["lat", "lng"]),
            models.Index(fields=["author"]),
            models.Index(fields=["location"]),
        ]

    def __str__(self): return self.title

# ---------- Medios ----------
def upload_to_medios(instance, filename):
    slug = instance.statue.slug if instance.statue_id else "misc"
    return f"statues/{slug}/{filename}"

class Media(models.Model):
    class Kind(models.TextChoices):
        PHOTO = "foto", "Foto"
        AUDIO = "audio", "Audio"
        DOC = "doc", "Documento"

    statue = models.ForeignKey(Statue, on_delete=models.CASCADE, related_name="media")
    kind = models.CharField(max_length=10, choices=Kind.choices, default=Kind.PHOTO)
    # Si querés subir desde admin:
    file    = models.ImageField(upload_to=upload_to_medios, blank=True, null=True)  # ← nuevo
    url     = models.URLField(max_length=600, blank=True)    

    caption = models.CharField(max_length=300, blank=True)
    credit = models.CharField(max_length=180, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.statue.slug} — {self.kind}"


def upload_to_medios(instance, filename):
    slug = instance.statue.slug if instance.statue_id else "misc"
    return f"statues/{slug}/{filename}"

class Media(models.Model):
    class Kind(models.TextChoices):
        PHOTO = "foto", "Foto"
        AUDIO = "audio", "Audio"
        DOC   = "doc",   "Documento"

    statue  = models.ForeignKey(Statue, on_delete=models.CASCADE, related_name="media")
    kind    = models.CharField(max_length=10, choices=Kind.choices, default=Kind.PHOTO)
    file    = models.ImageField(upload_to=upload_to_medios, blank=True, null=True)  # ← este campo
    url     = models.URLField(max_length=600, blank=True)                            # opcional (para lo ya cargado)
    caption = models.CharField(max_length=300, blank=True)
    credit  = models.CharField(max_length=180, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


# =========================
# FUENTES (bibliográficas, web, etc.)
# =========================
class Source(models.Model):
    class Type(models.TextChoices):
        BIBLIO = "bibliografica", "Bibliográfica"
        WEB = "web", "Web"
        ARCHIVO = "archivo", "Archivo"
        ORAL = "oral", "Oral"
        OTRO = "otro", "Otro"

    type = models.CharField(max_length=20, choices=Type.choices, default=Type.WEB)
    title = models.CharField(max_length=240)
    author = models.CharField(max_length=180, blank=True)
    year = models.SmallIntegerField(null=True, blank=True)
    url = models.URLField(max_length=600, blank=True)
    editorial = models.CharField(max_length=180, blank=True)
    notes_md = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


# Tabla intermedia: relación N:M entre estatuas y fuentes
class StatueSource(models.Model):
    statue = models.ForeignKey(Statue, on_delete=models.CASCADE, related_name="statue_sources")
    source = models.ForeignKey(Source, on_delete=models.CASCADE, related_name="statue_sources")
    class Role(models.TextChoices):
        CITA = "cita", "Cita"
        BIBLIO = "bibliografia", "Bibliografía"
        LINK = "link", "Link"
        DOC = "documento", "Documento"
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CITA)
    comment = models.CharField(max_length=300, blank=True)

    class Meta:
        unique_together = ("statue", "source")


# =========================
# INSTITUCIONES (escuelas, museos…)
# =========================
class Institution(models.Model):
    class Type(models.TextChoices):
        ESCUELA = "escuela", "Escuela"
        MUSEO = "museo", "Museo"
        UNIVERSIDAD = "universidad", "Universidad"
        ONG = "ong", "ONG"
        MUNICIPIO = "municipio", "Municipio"
        OTRO = "otro", "Otro"

    name = models.CharField(max_length=200, unique=True)
    type = models.CharField(max_length=20, choices=Type.choices, default=Type.ESCUELA)
    address = models.CharField(max_length=240, blank=True)
    phone = models.CharField(max_length=60, blank=True)
    website = models.URLField(max_length=240, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


# Tabla intermedia: relación N:M entre estatuas e instituciones
class StatueInstitution(models.Model):
    class Role(models.TextChoices):
        AUTOR = "autor", "Autor"
        COAUTOR = "coautor", "Coautor"
        EDITOR = "editor", "Editor"
        CURADOR = "curador", "Curador"
        CREDITO = "credito", "Crédito"

    statue = models.ForeignKey(Statue, on_delete=models.CASCADE, related_name="institutions_link")
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="statues_link")
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CREDITO)
    credit_percent = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        unique_together = ("statue", "institution", "role")


# =========================
# EVENTOS DE ESCANEO (métricas anónimas)
# =========================
class ScanEvent(models.Model):
    occurred_at = models.DateTimeField(auto_now_add=True)   # fecha/hora del escaneo
    slug = models.SlugField(max_length=140)                 # redundante para anonimizar
    statue = models.ForeignKey(Statue, null=True, blank=True, on_delete=models.SET_NULL, related_name="scan_events")
    user_agent = models.CharField(max_length=300, blank=True)   # navegador/dispositivo
    referer = models.URLField(max_length=600, blank=True)       # desde dónde llegó
    utm_source = models.CharField(max_length=80, blank=True)
    utm_medium = models.CharField(max_length=80, blank=True)
    utm_campaign = models.CharField(max_length=120, blank=True)
    geohash = models.CharField(max_length=12, blank=True)       # ubicación aproximada
    osm_zoom = models.PositiveSmallIntegerField(null=True, blank=True)
    osm_tile_x = models.IntegerField(null=True, blank=True)
    osm_tile_y = models.IntegerField(null=True, blank=True)
    ip_hash = models.CharField(max_length=64, blank=True)       # hash de IP para anonimato

    class Meta:
        indexes = [
            models.Index(fields=["slug", "occurred_at"]),
            models.Index(fields=["statue", "occurred_at"]),
        ]


#Explicación breve de relaciones

# Author → Statue: un autor puede tener varias estatuas (1:N).

# Location → Statue: una ubicación puede tener varias estatuas (1:N).

# Tag ↔ Statue: relación de muchos a muchos (N:M) → una estatua puede tener varias etiquetas, y cada etiqueta puede aplicarse a muchas estatuas.

# Media → Statue: una estatua puede tener varias fotos, audios o documentos (1:N).

# Source ↔ Statue: relación N:M con tabla intermedia StatueSource. Sirve para citar bibliografía, links o documentos asociados a cada estatua.

# Institution ↔ Statue: relación N:M con tabla intermedia StatueInstitution. Una institución puede haber co-creado o apoyado varias fichas, y una estatua puede tener créditos a varias instituciones.

# ScanEvent → Statue: cada vez que alguien escanea un QR, se genera un evento ligado a la estatua. Sirve para métricas y análisis de visitas (1:N).

# 👉 En resumen:

# Estatua es la entidad central.

# Todo lo demás (autor, ubicación, medios, fuentes, instituciones, eventos) se relaciona directa o indirectamente con la estatua.