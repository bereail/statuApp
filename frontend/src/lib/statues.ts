// src/lib/statues.ts
export type Statue = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  lat?: number;
  lng?: number;
  barrio?: string;
};

// Simulación rápida (reemplazá con fetch a DB/API)
const MOCK: Statue[] = [
  { id: '1', slug: 'monumento-a-la-bandera', title: 'Monumento a la Bandera', barrio: 'Centro' },
  { id: '2', slug: 'mujer-con-nino-rosedal', title: 'Mujer con Niño (Rosedal)', barrio: 'Parque Independencia' },
];

export async function getStatue(slug: string): Promise<Statue | null> {
  // acá podrías llamar a tu DB o API
  const s = MOCK.find(x => x.slug === slug);
  return s ?? null;
}
