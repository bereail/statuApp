// app/statues/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InfoSection from "components/InfoSection";
import ActionsBar from "components/ActionBar";

type StatueDetail = {
  slug: string;
  title: string;
  barrio?: string | null;
  year?: number | null;
  material?: string | null;
  description_md?: string | null;
  resumen_corto?: string | null;
  resumen_extenso?: string | null;
  dato_curioso?: string | null;
  lat?: number | null;
  lng?: number | null;
  image?: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
if (!API_BASE) throw new Error("Falta NEXT_PUBLIC_API_BASE en .env.local");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`${API_BASE}/statues/${slug}/`, { next: { revalidate: 60 } });
  if (!res.ok) return { title: "Estatua no encontrada" };
  const data: StatueDetail = await res.json();
  return { title: `${data.title} | StatuApp` };
}

export default async function StatuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = `${API_BASE}/statues/${slug}/`;

  const res = await fetch(url, { headers: { Accept: "application/json" }, next: { revalidate: 60 } });
  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir ${url}`);

  const s: StatueDetail = await res.json();
  const hasCoords = s.lat != null && s.lng != null;

  return (
    <article className="p-4 space-y-4">
      <a href="/statues" className="text-blue-600 underline">&larr; Volver</a>

      <header>
        <h1 className="text-2xl font-semibold">{s.title}</h1>
        <p className="text-sm text-gray-600">
          {s.barrio ?? "s/barrio"} · {s.year ?? "s/f"} · {s.material ?? "s/material"}
        </p>

        {/* ✅ acciones interactivas en componente cliente */}
        <ActionsBar lat={s.lat} lng={s.lng} title={s.title} />
      </header>

      {s.image && <img src={s.image} alt={s.title} className="rounded-xl max-w-xl" />}

      {s.resumen_corto && <p className="mt-2">{s.resumen_corto}</p>}

      {(s.description_md || s.resumen_extenso) && (
        <InfoSection title="Historia completa">
          <div className="whitespace-pre-wrap">
            {s.description_md ?? s.resumen_extenso}
          </div>
        </InfoSection>
      )}

      {s.dato_curioso && (
        <InfoSection title="Dato curioso">
          <p>{s.dato_curioso}</p>
        </InfoSection>
      )}

      <InfoSection title="Ficha técnica" defaultOpen>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {s.year != null && <li><b>Año:</b> {s.year}</li>}
          {s.material && <li><b>Material:</b> {s.material}</li>}
          {s.barrio && <li><b>Barrio:</b> {s.barrio}</li>}
          {hasCoords && <li><b>Coordenadas:</b> {s.lat}, {s.lng}</li>}
        </ul>
      </InfoSection>
    </article>
  );
}
