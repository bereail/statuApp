// src/data/statues.ts
export type Statue = { id: string; slug: string; title: string; lat: number; lng: number; barrio?: string; descriptionMd?: string; };

const DATA: Statue[] = [
  { id:'rosedal-mujer-nino', slug:'mujer-con-nino-rosedal', title:'Mujer con Niño (Rosedal)', lat:-32.9566, lng:-60.6604, barrio:'Parque Independencia', descriptionMd:'Escultura ubicada en el Rosedal...' }
];

export async function getStatue(slug: string) { return DATA.find(s=>s.slug===slug) ?? null; }
export async function listStatues() { return DATA; }
export function allSlugs() { return DATA.map(s=>s.slug); }
