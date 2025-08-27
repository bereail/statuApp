from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    # Home → redirige a la raíz de la API
    path("", RedirectView.as_view(url="/api/v1/", permanent=False)),

    # API v1 de la app statues
    path("api/v1/", include("statues.urls")),
]

# Servir /media en desarrollo
urlpatterns += static(
    getattr(settings, "MEDIA_URL", "/media/"),
    document_root=getattr(settings, "MEDIA_ROOT", "media"),
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
