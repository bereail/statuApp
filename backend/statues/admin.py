# statues/admin.py
from django.contrib import admin
from .models import (
    Author, Location, Tag, Statue, Media,
    Source, StatueSource, Institution, StatueInstitution
)

class MediaInline(admin.TabularInline):
    model = Media
    extra = 1
    fields = ("kind", "file", "url", "caption", "credit")  # mostrará input de archivo

@admin.register(Statue)
class StatueAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "barrio", "year", "is_published", "updated_at")
    list_filter = ("is_published", "barrio", "year", "material")
    search_fields = ("title", "slug", "description_md", "resumen_corto", "resumen_extenso")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [MediaInline]
    filter_horizontal = ("tags",)

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ("name",)
    list_display = ("name", "birth_year", "death_year")

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("name", "barrio", "lat", "lng")
    search_fields = ("name", "barrio", "address")

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ("name",)

@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "author", "year")
    list_filter = ("type", "year")
    search_fields = ("title", "author")

@admin.register(StatueSource)
class StatueSourceAdmin(admin.ModelAdmin):
    list_display = ("statue", "source", "role")
    list_filter = ("role",)
    search_fields = ("statue__title", "source__title")

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "website")
    list_filter = ("type",)
    search_fields = ("name",)

@admin.register(StatueInstitution)
class StatueInstitutionAdmin(admin.ModelAdmin):
    list_display = ("statue", "institution", "role", "credit_percent")
    list_filter = ("role",)
    search_fields = ("statue__title", "institution__name")
