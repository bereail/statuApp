from dataclasses import dataclass

@dataclass
class StatueData:
    slug: str
    titulo: str
    descripcion: str
    barrio: str
    lat: float
    lng: float

