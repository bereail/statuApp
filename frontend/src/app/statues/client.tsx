"use client";

import { useEffect, useState } from "react";
import { StatuesAPI } from "lib/services/statues";
import type { StatueList } from "types/statues";
import SearchBar from "components/SearchBar";
import StatueCard from "components/StatueCard";

export default function EstatuasClient() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<StatueList[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await StatuesAPI.list(q);
      setItems(data.results);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // carga inicial

  return (
    <div className="grid gap-4">
      <SearchBar
        defaultValue={q}
        onSearch={(value) => { setQ(value); }}
        onSubmit={load}
      />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl ring-1 ring-slate-200 bg-slate-50 h-40 animate-pulse"/>
          ))}
        </div>
      ) : items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(s => <StatueCard key={s.slug} statue={s} />)}
        </div>
      ) : (
        <p className="text-sm text-slate-600">No se encontraron resultados.</p>
      )}
    </div>
  );
}
