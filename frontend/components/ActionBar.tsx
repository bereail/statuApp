// components/ActionsBar.tsx
"use client";

export default function ActionsBar(
  { lat, lng, title }: { lat?: number | null; lng?: number | null; title: string }
) {
  const hasCoords = lat != null && lng != null;

  return (
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      {hasCoords && (
        <a
          className="px-3 py-1 rounded-full border hover:bg-slate-50"
          href={`/mapa?lat=${lat}&lng=${lng}`}
        >
          Ver en mapa
        </a>
      )}

      {hasCoords && (
        <button
          className="px-3 py-1 rounded-full border hover:bg-slate-50"
          onClick={() => navigator.clipboard.writeText(`${lat}, ${lng}`)}
        >
          Copiar coordenadas
        </button>
      )}

      {/* Solo si existe la Web Share API */}
      <button
        className="px-3 py-1 rounded-full border hover:bg-slate-50"
        onClick={() => (navigator as any).share?.({ title, url: location.href })}
      >
        Compartir
      </button>
    </div>
  );
}
