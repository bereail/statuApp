from dataclasses import dataclass

@dataclass
class StatueData:
    slug: str
    titulo: str
    descripcion: str
    barrio: str
    lat: float
    lng: float

# Hardcode inicial
ESTATUAS = [
    StatueData(
        slug="mujer-con-nino-rosedal",
        titulo="Mujer con Niño (Rosedal)",
        descripcion="Escultura ubicada en el Rosedal del Parque Independencia.",
        barrio="Parque Independencia",
        lat=-32.9566,
        lng=-60.6604
    ),
    StatueData(
        slug="monumento-a-la-madre",
        titulo="Monumento a la Madre",
        descripcion="Obra creada por José Gerbino en 1967, ubicada en el Parque Independencia.",
        barrio="Parque Independencia",
        lat=-32.9555,
        lng=-60.6610
    ),
]
