// frontend/app/buscar/page.tsx
import { fetchJson } from "../../lib/api";
import type { EstatuaList } from "../../types/statues";
export const revalidate = 30; // ISR opcional

export default async function BuscarPage() {
  const estatuas = await fetchJson<EstatuaList[]>("/estatuas/");

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-semibold">Estatuas</h1>
      <ul className="grid gap-2">
        {estatuas.map((e) => (
          <li key={e.slug} className="border rounded p-3">
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
