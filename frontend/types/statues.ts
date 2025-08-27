// --- Lo que viene de la API (sin tocar nombres) ---
export type StatueDetailApi = {
  slug: string;
  titulo: string;
  barrio?: string | null;
  anio?: number | null;
  material?: string | null;
  descripcion_md?: string | null;
  resumen_corto?: string | null;
  resumen_extenso?: string | null;
  dato_curioso?: string | null;
  lat?: number | null;
  lng?: number | null;
  author?: { id: number; nombre: string } | null;
  location?: {
    id: number; nombre: string; direccion?: string | null;
    barrio?: string | null; lat?: number | null; lng?: number | null;
  } | null;
  medias?: Array<{ id: number; tipo: "foto"|"audio"|"doc"; url: string; pie?: string|null; credito?: string|null }>;
};

// --- Modelo UI normalizado (opcional) ---
export type StatueDetail = {
  slug: string;
  title: string; // normalizado desde 'titulo'
  barrio?: string | null;
  year?: number | null;      // normalizado desde 'anio'
  material?: string | null;
  descriptionMd?: string | null; // desde 'descripcion_md'
  shortSummary?: string | null;  // 'resumen_corto'
  longSummary?: string | null;   // 'resumen_extenso'
  funFact?: string | null;       // 'dato_curioso'
  lat?: number | null;
  lng?: number | null;
  authorName?: string | null;
  locationName?: string | null;
  medias?: Array<{ id: number; kind: "foto"|"audio"|"doc"; url: string; caption?: string|null; credit?: string|null }>;
};

// Adaptador API -> UI
export function toStatueDetail(ui: StatueDetailApi): StatueDetail {
  return {
    slug: ui.slug,
    title: ui.titulo,
    barrio: ui.barrio ?? null,
    year: ui.anio ?? null,
    material: ui.material ?? null,
    descriptionMd: ui.descripcion_md ?? null,
    shortSummary: ui.resumen_corto ?? null,
    longSummary: ui.resumen_extenso ?? null,
    funFact: ui.dato_curioso ?? null,
    lat: ui.lat ?? null,
    lng: ui.lng ?? null,
    authorName: ui.author?.nombre ?? null,
    locationName: ui.location?.nombre ?? null,
    medias: ui.medias?.map(m => ({
      id: m.id,
      kind: m.tipo,
      url: m.url,
      caption: m.pie ?? null,
      credit: m.credito ?? null,
    })),
  };
}

// Lista paginada (tu tipo está perfecto)
export type StatueList = {
  slug: string;
  title: string;            // si ya lo normalizás en el front, mantenelo así
  barrio?: string | null;
  image?: string | null;
};
export type Paginated<T> = { count: number; next: string|null; previous: string|null; results: T[] };
