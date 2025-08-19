from django.db import models
from django.utils.text import slugify

class Tag(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=90, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:90]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Statue(models.Model):
    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=140, blank=True)
    year = models.IntegerField(null=True, blank=True)
    material = models.CharField(max_length=120, blank=True)
    style = models.CharField(max_length=120, blank=True)
    description_md = models.TextField(blank=True)
    lat = models.FloatField()
    lng = models.FloatField()
    address = models.CharField(max_length=160, blank=True)
    barrio = models.CharField(max_length=120, blank=True)
    image_url = models.URLField(blank=True)
    sources = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title
