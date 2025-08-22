"use client";
import { useEffect, useState } from "react";

type Paginated<T> = { count: number; next: string|null; previous: string|null; results: T[] };
type Statue = { slug: string; title: string; location?: string|null };

export default function EstatuasClient() {
  const [items, setItems] = useState<Statue[]>([]);

  useEffect(() => {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  const url = `${base}/statues/`;
  console.log("📡 API_BASE:", base);
  console.log("➡️ Voy a pedir:", url);

  fetch(url, { headers: { Accept: "application/json" } })
    .then(async r => {
      console.log("🔎 HTTP:", r.status, r.statusText);
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    })
    .then(data => setItems(data.results || []))
    .catch(e => console.error("❌ Error llamando a", url, e));
}, []);

  return (
<ul>
  {items.map(e => (
    <li key={e.slug}>
      <a className="text-blue-600 underline" href={`/statues/${e.slug}`}>
        {e.title}
      </a>
    </li>
  ))}
</ul>

  );
}
