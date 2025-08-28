// components/StatueCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";

type StatueCardProps = {
  statue?: {
    slug: string;
    title: string;
    barrio?: string | null;
    image?: string | null;
  };
};

export default function StatueCard({ statue }: StatueCardProps) {
  if (!statue) return null;

  const img = statue.image ?? "/statue-placeholder.jpg";

  return (
    <article className="rounded-xl ring-1 ring-slate-200 overflow-hidden">
      <Link href={`/statues/${statue.slug}`} className="block">
        <div className="relative w-full aspect-[4/3]"> 
          <Image
            src={img}
            alt={statue.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold">{statue.title}</h3>
          <p className="text-sm text-slate-600">{statue.barrio ?? "s/barrio"}</p>
        </div>
      </Link>
    </article>
  );
}
