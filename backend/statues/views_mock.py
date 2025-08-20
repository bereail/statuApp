# backend/statues/views_mock.py
from pathlib import Path
import json
from django.http import JsonResponse, Http404
from django.views import View

APP_DIR = Path(__file__).resolve().parent
SEED_DIR = APP_DIR / "_seed" / "estatuas"   # opcional si querés por-estatua
INDEX_JSON = APP_DIR / "_seed" / "estatuas.json"  # o un solo archivo con todo

def _abs_media(url, request):
    if not url:
        return url
    if url.startswith("http://") or url.startswith("https://"):
        return url
    base = request.build_absolute_uri("/")[:-1]
    return base + url  # convierte /media/... o /static/... a absoluta

def _load_all():
    if INDEX_JSON.exists():
        return json.loads(INDEX_JSON.read_text(encoding="utf-8"))
    # fallback: leer por carpetas (slug/info.json)
    items = []
    if SEED_DIR.exists():
        for d in SEED_DIR.iterdir():
            info = d / "info.json"
            if info.exists():
                items.append(json.loads(info.read_text(encoding="utf-8")))
    return items

class StatueListMock(View):
    def get(self, request):
        data = _load_all()
        results = []
        for e in data:
            # normalizá una imagen de portada si hay media
            cover = None
            for m in e.get("media", []):
                if m.get("kind") == "photo" and m.get("url"):
                    cover = _abs_media(m["url"], request)
                    break
            results.append({
                "slug": e.get("slug"),
                "title": e.get("title"),
                "barrio": e.get("barrio"),
                "year": e.get("year"),
                "image": cover,
            })
        return JsonResponse({"count": len(results), "results": results})

class StatueDetailMock(View):
    def get(self, request, slug):
        data = _load_all()
        for e in data:
            if e.get("slug") == slug:
                for m in e.get("media", []):
                    m["url"] = _abs_media(m.get("url"), request)
                return JsonResponse(e)
        raise Http404("Not found")

# (opcional) handler 404 simple
def page_not_found_404(request, exception):
    return JsonResponse({"detail": "Not found"}, status=404)
