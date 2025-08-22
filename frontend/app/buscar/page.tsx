// app/buscar/page.tsx  (Server Component o Client, como prefieras)
import { fetchJson } from "../../lib/api";

type Paginated<T> = { count: number; next: string|null; previous: string|null; results: T[] };
type Statue = { slug: string; title: string; barrio?: string|null };

export default async function BuscarPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q || "").trim();
  const path = q ? `/statues/?q=${encodeURIComponent(q)}` : "/statues/";

  // Log útil (aparece en la terminal de Next.js si es Server Component)
  console.log("➡️ Llamando a:", process.env.NEXT_PUBLIC_API_BASE + path);

  let data: Paginated<Statue> = { count: 0, next: null, previous: null, results: [] };
  try {
    data = await fetchJson<Paginated<Statue>>(path);
  } catch (e) {
    console.error("❌ Error buscando:", e);
  }

  return (
    <section className="p-4">
      <form className="mb-4">
        <input name="q" defaultValue={q} className="border px-2 py-1" placeholder="Buscar…" />
        <button className="ml-2 border px-3 py-1">Buscar</button>
      </form>

      <ul className="list-disc pl-5">
        {data.results.map(e => <li key={e.slug}>{e.title}</li>)}
        {!data.results.length && <li>No se encontraron resultados.</li>}
      </ul>
    </section>
  );
}
