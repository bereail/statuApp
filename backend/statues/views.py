import json
from pathlib import Path
from django.http import JsonResponse

DATA_PATH = Path(__file__).resolve().parent / "data" / "estatuas.json"

with open(DATA_PATH, encoding="utf-8") as f:
    ESTATUAS = json.load(f)

def lista_estatuas(request):
    return JsonResponse(ESTATUAS, safe=False)

def detalle_estatua(request, slug):
    estatua = next((e for e in ESTATUAS if e["slug"] == slug), None)
    if estatua:
        return JsonResponse(estatua)
    return JsonResponse({"error": "No encontrada"}, status=404)
