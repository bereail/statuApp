// app/estatuas/page.tsx
import { fetchJson } from "../../lib/api";
type Estatua = { slug: string; titulo: string; ubicacion?: string };

export const revalidate = 30; // opcional: ISR

export default async function EstatuasPage() {
  const estatuas = await fetchJson<Estatua[]>("/estatuas/");

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-semibold">Estatuas</h1>
      <ul className="grid gap-2">
        {estatuas.map((e, i) => (
          <li key={`${e.slug}-${i}`} className="border rounded p-3">
            <a className="underline font-medium" href={`/s/${e.slug}`}>
              {e.titulo}
            </a>
            {e.ubicacion && (
              <p className="text-xs text-zinc-600">Ubicación: {e.ubicacion}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
