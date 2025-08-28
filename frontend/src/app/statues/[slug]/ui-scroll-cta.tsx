// app/statues/[slug]/ui-scroll-cta.tsx
"use client";

export default function ScrollCta({ to = "#historia" }: { to?: string }) {
  return (
    <button
      onClick={() => document.querySelector(to)?.scrollIntoView({ behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg bg-base-200 hover:bg-base-300
                 grid place-items-center text-xl"
      aria-label="Ir a Historia"
      title="Ir a Historia"
    >
      ↓
    </button>
  );
}
