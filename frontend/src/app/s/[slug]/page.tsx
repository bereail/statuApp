// app/s/[slug]/page.tsx  (Server Component)
import { getStatue } from '@/lib/statues';
import { notFound } from 'next/navigation';

export default async function StatuePage({ params }: { params: { slug: string } }) {
  const statue = await getStatue(params.slug);
  if (!statue) return notFound();

  return (
    <div>
      <h1>{statue.title}</h1>
      {statue.barrio && <p>{statue.barrio}</p>}
    </div>
  );
}
