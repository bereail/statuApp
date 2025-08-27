// lib/services/statues.ts
import { fetchJson } from "lib/api";
import type { Paginated } from "types/statues";

type StatueListApi = {
  slug: string;
  titulo: string;
  barrio?: string | null;
  imagen_destacada?: string | null;
};

export type StatueList = {
  slug: string;
  title: string;
  barrio?: string | null;
  image?: string | null;
};

function mapListItem(i: StatueListApi): StatueList {
  return {
    slug: i.slug,
    title: i.titulo,                 // 👈 del back viene "titulo"
    barrio: i.barrio ?? null,
    image: i.imagen_destacada ?? null,
  };
}

export const StatuesAPI = {
  async list(q: string) {
    const search = q ? `?q=${encodeURIComponent(q)}` : "";
    const data = await fetchJson<Paginated<StatueListApi>>(`/statues/${search}`);
    return {
      ...data,
      results: data.results.map(mapListItem),   // 👈 normaliza para tu UI
    } as Paginated<StatueList>;
  },

  async getOne(slug: string) {
    // Si querés detalle, podés reutilizar tu toStatueDetail(ui)
    return fetchJson(`/statues/${slug}/`);
  },
};
