// app/error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="p-6">
        <h2 className="font-semibold">Ups, algo falló</h2>
        <p className="text-sm text-slate-600">{error?.message}</p>
        <button className="mt-3 px-3 py-1 border rounded" onClick={() => reset()}>
          Reintentar
        </button>
      </body>
    </html>
  );
}
