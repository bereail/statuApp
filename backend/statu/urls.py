# proyecto: statu
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("statues.urls")),   # 👈 incluye las rutas de la app
]
