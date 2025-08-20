from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent / "data"
INDEX_PATH = DATA_DIR / "estatuas.json"

def load_estatuas():
    with open(INDEX_PATH, encoding="utf-8") as f:
        return json.load(f)

class EstatuasList(APIView):
    def get(self, request):
        data = load_estatuas()
        return Response(data)

class EstatuaDetail(APIView):
    def get(self, request, slug):
        data = load_estatuas()
        item = next((e for e in data if e["slug"] == slug), None)
        if not item:
            raise Http404
        return Response(item)
