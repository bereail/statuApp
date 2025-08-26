// app/statues/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4">
      <h2 className="font-semibold">Ocurrió un error</h2>
      <p className="text-sm text-slate-600">{error.message}</p>
      <button className="mt-3 px-3 py-1 border rounded" onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
