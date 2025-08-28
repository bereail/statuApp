// app/statues/client.tsx
"use client";
import StatueCard from "components/StatueCard";

export default function EstatuasClient({
  initialItems,
}: {
  initialItems: { slug: string; title: string; barrio?: string | null; image?: string | null }[];
}) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialItems.map((s) => (
        <li key={s.slug}>
          <StatueCard statue={s} />
        </li>
      ))}
    </ul>
  );
}
