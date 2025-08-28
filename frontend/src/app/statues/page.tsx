/*// app/statues/[slug]/page.tsx*/
// app/statues/page.tsx
import EstatuasClient from "./client";

type ApiStatue = {
  slug: string;
  title: string;
  barrio?: string | null;
  cover_url?: string | null; // viene del backend
};

type CardStatue = {
  slug: string;
  title: string;
  barrio?: string | null;
  image?: string | null;     // lo que espera tu <StatueCard>
};

const toAbs = (u?: string | null) =>
  u ? new URL(u, process.env.NEXT_PUBLIC_API_BASE!).toString() : null;

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/statues`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("No se pudo cargar la lista de estatuas");

  const json = await res.json();
  const items: ApiStatue[] = json?.results ?? json;

  const statues: CardStatue[] = items.map((s) => ({
    slug: s.slug,
    title: s.title,
    barrio: s.barrio ?? null,
    image: toAbs(s.cover_url ?? null), // normalizamos a 'image'
  }));

  return (
    <section className="p-4">
      <h1 className="text-xl mb-2">Estatuas</h1>
      <EstatuasClient initialItems={statues} />
    </section>
  );
}
