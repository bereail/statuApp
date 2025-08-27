"use client";
import { useEffect, useMemo, useState } from "react";
import { StatuesAPI } from "lib/services/statues";
import type { StatueList } from "types/statues";
import SearchBar from "components/SearchBar";
import StatueCard from "components/StatueCard";

export default function EstatuasClient() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<StatueList[]>([]);
  const [loading, setLoading] = useState(false);

  async function load(query = q) {
    setLoading(true);
    try {
      const data = await StatuesAPI.list(query);
      setItems(data.results);
    } finally {
      setLoading(false);
    }
  }

  // carga inicial
  useEffect(() => { load(""); }, []);

  // 🔎 debounce al escribir (opcional)
  useEffect(() => {
    const id = setTimeout(() => { if (q.length === 0 || q.length >= 2) load(q); }, 350);
    return () => clearTimeout(id);
  }, [q]);

  return (
    <div className="grid gap-4">
      <SearchBar
        defaultValue={q}
        onSearch={(value) => setQ(value)}    // actualiza q al tipear
        onSubmit={() => load(q)}             // búsqueda inmediata si presionan Enter/botón
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl ring-1 ring-slate-200 bg-slate-50 h-40 animate-pulse" />
          ))}
        </div>
      ) : items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s) => <StatueCard key={s.slug} statue={s} />)}
        </div>
      ) : (
        <p className="text-sm text-slate-600">No se encontraron resultados.</p>
      )}
    </div>
  );
}
