// frontend/app/s/[slug]/page.tsx
import { fetchJson } from "../../../lib/api";
import type { EstatuaDetail } from "../../../types/statues";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getEstatua(slug: string) {
  // Ajustá si tu endpoint es otro (p. ej. /estatuas/?slug=)
  return fetchJson<EstatuaDetail>(`/estatuas/${slug}/`);
}

export default async function EstatuaPage({ params }: { params: { slug: string } }) {
  let data: EstatuaDetail | null = null;
  try {
    data = await getEstatua(params.slug);
  } catch {
    return notFound();
  }

  return (
    <article className="grid gap-3">
      <h1 className="text-2xl font-bold">{data.titulo}</h1>
      {data.ubicacion && <p className="text-sm text-zinc-600">{data.ubicacion}</p>}
      {/* Si tu API ya devuelve HTML en descripcion_md: */}
      {data.descripcion_md ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: data.descripcion_md }} />
      ) : (
        <p className="text-zinc-600">Sin descripción.</p>
      )}
      {/* Luego: galería e incluso mapa si tenés lat/lng */}
    </article>
  );
}
