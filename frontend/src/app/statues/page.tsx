// app/statues/page.tsx
import { fetchJson } from "lib/api";
import EstatuasClient from "./client";

type ApiStatue = {
  slug: string;
  title: string;
  barrio?: string | null;
  cover_url?: string | null;
};

type CardStatue = {
  slug: string;
  title: string;
  barrio?: string | null;
  image?: string | null;
};

const toAbs = (u?: string | null) =>
  u ? new URL(u, process.env.NEXT_PUBLIC_API_BASE!).toString() : null;

export default async function Page() {
  // usa el helper y el slash final
  const json = await fetchJson<any>("statues/");
  const items: ApiStatue[] = json?.results ?? json;

  const statues: CardStatue[] = items.map((s) => ({
    slug: s.slug,
    title: s.title,
    barrio: s.barrio ?? null,
    image: toAbs(s.cover_url ?? null),
  }));

  return (
    <section className="p-4">
      <h1 className="text-xl mb-2">Estatuas</h1>
      <EstatuasClient initialItems={statues} />
    </section>
  );
}
