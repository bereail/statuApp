# statu_api/urls.py  (PROYECTO)
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", RedirectView.as_view(url="/api/v1/", permanent=False)),  # ← / redirige a la API
    path("", include("statu_api.api_urls")),  # ← incluye las rutas de la API
]

# (solo en desarrollo) servir media si la usás
urlpatterns += static(getattr(settings, "MEDIA_URL", "/media/"),
                      document_root=getattr(settings, "MEDIA_ROOT", "media"))
