// app/statues/[slug]/page.tsx
import { notFound } from "next/navigation";

type StatueDetail = {
  slug: string;
  title: string;
  barrio?: string | null;
  year?: number | null;
  material?: string | null;
  description_md?: string | null;
  lat?: number | null;
  lng?: number | null;
  image?: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // ej: http://127.0.0.1:8000/api/v1

// (Opcional) SEO dinámico
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(`${API_BASE}/statues/${params.slug}/`, { next: { revalidate: 60 } });
  if (!res.ok) return { title: "Estatua no encontrada" };
  const data: StatueDetail = await res.json();
  return { title: `${data.title} | StatuApp` };
}

// Página de detalle
export default async function StatuePage({ params }: { params: { slug: string } }) {
  const url = `${API_BASE}/statues/${params.slug}/`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, next: { revalidate: 60 } });

  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir ${url}`);

  const s: StatueDetail = await res.json();

  return (
    <article className="p-4 space-y-3">
      <a href="/statues" className="text-blue-600 underline">&larr; Volver</a>
      <h1 className="text-2xl font-semibold">{s.title}</h1>
      <p className="text-sm text-gray-600">
        {s.barrio ?? "s/barrio"} · {s.year ?? "s/f"} · {s.material ?? "s/material"}
      </p>

      {s.image && (
        // si querés usar next/image, cambialo por <Image ... />
        <img src={s.image} alt={s.title} className="rounded-xl max-w-md" />
      )}

      {s.description_md ? (
        <pre className="whitespace-pre-wrap">{s.description_md}</pre>
      ) : (
        <p>Sin descripción.</p>
      )}

      {s.lat && s.lng && (
        <div className="text-sm">
          Ubicación: {s.lat}, {s.lng}
        </div>
      )}
    </article>
  );
}
