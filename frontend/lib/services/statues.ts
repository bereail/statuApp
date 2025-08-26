// lib/services/statues.ts
import { fetchJson } from "../api";
import type { Paginated, StatueList } from "../../types/statues";

function normalizeImage(r: any): string | null {
  return r.image ?? r.imagen ?? r.imagen_destacada ?? r.thumbnail ?? null;
}

export const StatuesAPI = {
  list: async (q?: string) => {
    const data = await fetchJson<Paginated<any>>(`/statues/${q ? `?q=${encodeURIComponent(q)}` : ""}`);
    const results: StatueList[] = data.results.map((r: any) => ({
      slug: r.slug,
      title: r.title ?? r.titulo ?? "Sin título",
      barrio: r.barrio ?? null,
      image: normalizeImage(r),
    }));
    return { ...data, results };
  },

  detail: async (slug: string) => {
    const r = await fetchJson<any>(`/statues/${slug}/`);
    return {
      slug: r.slug,
      title: r.title ?? r.titulo ?? "Sin título",
      barrio: r.barrio ?? null,
      year: r.year ?? r.anio ?? null,
      material: r.material ?? null,
      description_md: r.description_md ?? r.descripcion_md ?? null,
      lat: r.lat ?? null,
      lng: r.lng ?? null,
      image: normalizeImage(r),
    };
  },
};
