'use server';

import { revalidatePath } from 'next/cache';

export async function toggleFavorite(statueId: string) {
  // Actualizá en tu DB
  await db.toggleFav(statueId);
  // Revalida la página si hace falta
  revalidatePath('/s/[slug]', 'page');
}
