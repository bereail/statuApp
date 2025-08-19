'use client';

import { useTransition } from 'react';
import { toggleFavorite } from './actions';

export default function FavoriteButton({
  statueId,
  initialFav,
}: { statueId: string; initialFav: boolean }) {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      await toggleFavorite(statueId); // server action o llamada a API
      // opcional: actualizar UI localmente o invalidar caché con router.refresh()
    });
  };

  return (
    <button onClick={onClick} disabled={isPending}>
      {initialFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </button>
  );
}
