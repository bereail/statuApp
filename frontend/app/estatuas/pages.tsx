// app/estatuas/page.tsx
/*import Link from "next/link";
import { fetchJson } from "../../lib/api";

type StatueDTO = {
  slug: string;
  titulo: string;
  barrio?: string;
};

export const revalidate = 30;

export default async function EstatuasPage() {
  // 👉 ahora va directo al backend correcto
  const estatuas = await fetchJson<StatueDTO[]>("/statues/");

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-semibold">Estatuas</h1>
      <ul className="grid gap-2">
        {estatuas.map((e) => (
          <li key={e.slug} className="border rounded p-3">
            <Link className="underline font-medium" href={`/s/${e.slug}`}>
              {e.titulo}
            </Link>
            {e.barrio && (
              <p className="text-xs text-zinc-600">Barrio: {e.barrio}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
*/
// app/estatuas/page.tsx
import EstatuasClient from "./client";

export default function Page() {
  return (
    <section className="p-4">
      <h1 className="text-xl mb-2">Estatuas</h1>
      <EstatuasClient />
    </section>
  );
}
