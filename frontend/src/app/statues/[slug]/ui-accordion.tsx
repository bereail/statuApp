// app/statues/[slug]/ui-accordion.tsx
"use client";
import { useState } from "react";

export default function Accordion({
  title,
  children,
  id,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="border border-base-200 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-base-200/50 hover:bg-base-200"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium">{title}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </section>
  );
}
