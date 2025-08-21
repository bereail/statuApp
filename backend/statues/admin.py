from django.contrib import admin
from .models import (
    Author, Location, Tag, Statue,
    Media, Source, StatueSource,
    Institution, StatueInstitution, ScanEvent
)

class MediaInline(admin.TabularInline):
    model = Media
    extra = 1

class StatueSourceInline(admin.TabularInline):
    model = StatueSource
    extra = 1
    autocomplete_fields = ["source"]

class StatueInstitutionInline(admin.TabularInline):
    model = StatueInstitution
    extra = 1
    autocomplete_fields = ["institution"]

@admin.register(Statue)
class StatueAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "barrio", "year", "is_published")
    search_fields = ("title", "slug", "barrio", "description_md")
    list_filter = ("is_published", "barrio", "year", "author")
    autocomplete_fields = ["author", "location"]
    filter_horizontal = ["tags"]          # selector múltiple cómodo
    inlines = [MediaInline, StatueSourceInline, StatueInstitutionInline]

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ["name"]

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    search_fields = ["name", "barrio"]

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ["name"]

@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    search_fields = ["title", "author"]

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    search_fields = ["name"]

admin.site.register(StatueSource)
admin.site.register(StatueInstitution)
admin.site.register(Media)
admin.site.register(ScanEvent)
