"use client";

import { useEffect, useState } from "react";
import { fetchJson } from "../../lib/api";

type Paginated<T> = { count: number; next: string | null; previous: string | null; results: T[] };
type Statue = { slug: string; title: string; location?: string | null };

export default function EstatuasClient() {
  const [items, setItems] = useState<Statue[]>([]);

  useEffect(() => {
    fetchJson<Paginated<Statue>>("/statues/")
      .then((data) => {
        console.log("✅ Data recibida:", data);
        setItems(data.results || []);
      })
      .catch((e) => console.error("❌ Error:", e));
  }, []);

  return (
    <ul>
      {items.map((e) => (
        <li key={e.slug}>{e.title}</li>
      ))}
    </ul>
  );
}
