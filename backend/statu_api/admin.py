# statues/admin.py
from django.contrib import admin
from ..statues.models import (
    Author, Location, Tag, Statue, Media,
    Source, StatueSource, Institution, StatueInstitution, ScanEvent
)

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ("name",)
    list_display = ("name", "birth_year", "death_year")

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    search_fields = ("name","barrio","address")
    list_display = ("name","barrio","lat","lng")

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ("name",)

class MediaInline(admin.TabularInline):
    model = Media
    extra = 1

@admin.register(Statue)
class StatueAdmin(admin.ModelAdmin):
    inlines = [MediaInline]
    search_fields = ("title","slug","barrio","author__name")
    list_filter = ("is_published","barrio","author")
    list_display = ("title","slug","author","barrio","is_published","updated_at")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags",)

@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    search_fields = ("title","author","url")
    list_filter = ("type",)

@admin.register(StatueSource)
class StatueSourceAdmin(admin.ModelAdmin):
    list_display = ("statue","source","role")
    list_filter = ("role",)
    search_fields = ("statue__title","source__title")

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    search_fields = ("name",)
    list_filter = ("type",)

@admin.register(StatueInstitution)
class StatueInstitutionAdmin(admin.ModelAdmin):
    list_display = ("statue","institution","role","credit_percent")
    list_filter = ("role",)
    search_fields = ("statue__title","institution__name")

@admin.register(ScanEvent)
class ScanEventAdmin(admin.ModelAdmin):
    list_display = ("slug","statue","occurred_at","utm_source")
    list_filter = ("utm_source","utm_medium","utm_campaign")
    search_fields = ("slug","statue__title","user_agent","referer")
