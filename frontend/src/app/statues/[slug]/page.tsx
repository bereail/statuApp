// app/statues/[slug]/page.tsx
import Gallery from "./galery";
import Accordion from "./ui-accordion";
import ShowMarkdown from "./ui-show-markdown";
import ScrollCta from "./ui-scroll-cta";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Medio = {
  kind: "foto" | "audio" | "doc";
  url: string;
  caption?: string | null;
  credit?: string | null;
};

type Estatua = {
  slug: string;
  title: string;
  barrio?: string | null;
  year?: number | null;
  material?: string | null;
  resumen_corto?: string | null;
  resumen_extenso?: string | null;   // historia en MD
  description_md?: string | null;    // fallback en MD
  dato_curioso?: string | null;
  media: Medio[];
  lat?: number | null;
  lng?: number | null;
};

const toAbs = (u?: string | null) =>
  u ? new URL(u, process.env.NEXT_PUBLIC_API_BASE!).toString() : null;

// ✅ Next 15: params es Promise
export default async function StatuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <- await

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/statues/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error("No se pudo cargar la estatua");

  const s: Estatua = await res.json();

  const fotos =
    (s.media ?? [])
      .filter((m) => m.kind === "foto")
      .map((m) => ({ url: toAbs(m.url)!, caption: m.caption ?? null, credit: m.credit ?? null }));

  const historiaMD = s.resumen_extenso || s.description_md || null;

  return (
    <article className="grid gap-6">
      <header className="grid gap-1">
        <Link href="/statues" className="underline">Volver a Estatuas</Link>
        <h1 className="text-2xl font-bold">{s.title}</h1>
        <p className="text-sm opacity-70">
          {s.barrio ?? "—"} {s.year ? `• ${s.year}` : ""} {s.material ? `• ${s.material}` : ""}
        </p>
      </header>

      {s.resumen_corto && <p>{s.resumen_corto}</p>}

      {fotos.length > 0 && <Gallery items={fotos} />}

      {historiaMD && (
        <Accordion title="Historia completa" id="historia">
          <ShowMarkdown md={historiaMD} />
        </Accordion>
      )}

      {s.dato_curioso && (
        <Accordion title="Dato curioso">
          <p className="text-sm opacity-90">{s.dato_curioso}</p>
        </Accordion>
      )}

      <Accordion title="Ficha técnica">
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><dt className="font-medium">Año</dt><dd>{s.year ?? "—"}</dd></div>
          <div><dt className="font-medium">Material</dt><dd>{s.material ?? "—"}</dd></div>
          <div><dt className="font-medium">Barrio</dt><dd>{s.barrio ?? "—"}</dd></div>
          <div><dt className="font-medium">Coordenadas</dt>
            <dd>{(s.lat != null && s.lng != null) ? `${s.lat}, ${s.lng}` : "—"}</dd>
          </div>
        </dl>
      </Accordion>

      {historiaMD && <ScrollCta to="#historia" />}
    </article>
  );
}

// (Opcional pero recomendado) si usás SEO dinámico:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Estatua · ${slug}` };
}
