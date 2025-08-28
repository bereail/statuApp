"use client";
import Link from "next/link";

type NavigatorWithShare = Navigator & {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
};

export default function ActionBar(
  { lat, lng, title }: { lat?: number | null; lng?: number | null; title: string }
) {
  const hasCoords = lat != null && lng != null;

  const handleShare = () => {
    const nav = navigator as NavigatorWithShare;
    if (nav.share) nav.share({ title, url: location.href }).catch(console.error);
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      {hasCoords && (
        <Link
          className="px-3 py-1 rounded-full border hover:bg-slate-50"
          href={`/mapa?lat=${lat}&lng=${lng}`}
        >
          Ver en mapa
        </Link>
      )}

      {hasCoords && (
        <button
          className="px-3 py-1 rounded-full border hover:bg-slate-50"
          onClick={() => navigator.clipboard.writeText(`${lat}, ${lng}`)}
          type="button"
        >
          Copiar coordenadas
        </button>
      )}

      <button
        className="px-3 py-1 rounded-full border hover:bg-slate-50"
        onClick={handleShare}
        type="button"
      >
        Compartir
      </button>
    </div>
  );
}
