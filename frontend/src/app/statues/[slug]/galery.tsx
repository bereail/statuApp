// app/statues/[slug]/gallery.tsx
// app/statues/[slug]/gallery.tsx
"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

type Item = { url: string; caption?: string | null; credit?: string | null };

export default function Gallery({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next  = useCallback(() => setOpen((i) => (i === null ? 0 : (i + 1) % items.length)), [items.length]);
  const prev  = useCallback(() => setOpen((i) => (i === null ? 0 : (i - 1 + items.length) % items.length)), [items.length]);

  // Navegación con teclado
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold">Galería</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((m, i) => (
          <button
            key={i}
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-base-200"
            onClick={() => setOpen(i)}
            aria-label={`Abrir imagen ${i + 1}`}
          >
            <Image
              src={m.url}
              alt={m.caption || "Foto"}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative w-full max-w-5xl aspect-[3/2]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[open].url}
              alt={items[open].caption || "Foto"}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            {/* Controles */}
            <button
              onClick={close}
              className="absolute top-2 right-2 bg-white/85 hover:bg-white rounded px-3 py-1 text-sm"
            >
              Cerrar
            </button>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded px-3 py-1 text-sm"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded px-3 py-1 text-sm"
            >
              ›
            </button>
          </div>
          {(items[open].caption || items[open].credit) && (
            <p className="absolute bottom-4 left-4 right-4 text-white/90 text-sm text-center">
              {items[open].caption} {items[open].credit ? `— ${items[open].credit}` : ""}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
