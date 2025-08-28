// app/statues/[slug]/ui-show-markdown.tsx
"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export default function ShowMarkdown({ md }: { md: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`prose max-w-none transition-all ${open ? "max-h-none" : "max-h-60 overflow-hidden"}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
      </div>
      {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-base-100 to-transparent" />}
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-2 text-sm underline opacity-80 hover:opacity-100"
      >
        {open ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
}
