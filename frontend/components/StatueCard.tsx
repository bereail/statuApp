// components/StatueCard.tsx
"use client";
import Link from "next/link";

type StatueCardProps = {
  statue?: {
    slug: string;
    title: string;
    barrio?: string | null;
    image?: string | null;           // campo normalizado
  };
};

export default function StatueCard({ statue }: StatueCardProps) {
  if (!statue) return null;          // evita crashear si viene undefined

const img = statue.image ?? "/statue-placeholder.jpg";

  return (
    <article className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
      <Link href={`/statues/${statue.slug}`} className="block">
        {/* Si usás next/image, cámbialo por <Image ... /> */}
        <img src={img} alt={statue.title} className="w-full h-40 object-cover" />
        <div className="p-3">
          <h3 className="font-semibold">{statue.title}</h3>
          <p className="text-sm text-slate-600">{statue.barrio ?? "s/barrio"}</p>
        </div>
      </Link>
    </article>
  );
}
