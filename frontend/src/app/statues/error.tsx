// app/statues/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Statues error boundary]', error);
  }, [error]);

  return (
    <div className="p-4 border rounded bg-rose-50">
      <h2 className="font-semibold text-rose-700">Ocurrió un error</h2>
      <p className="text-sm text-rose-800/80 mt-1">
        {error?.message ?? 'No se pudo cargar esta página.'}
      </p>
      {error?.['digest'] && (
        <p className="text-xs text-rose-800/60 mt-1">ID: {error['digest']}</p>
      )}
      <button
        className="mt-3 px-3 py-1 border rounded"
        onClick={() => reset()}
      >
        Reintentar
      </button>
    </div>
  );
}
