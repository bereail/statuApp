// components/InfoSection.tsx
export default function InfoSection(
  { title, children, defaultOpen = false }:
  { title: string; children: React.ReactNode; defaultOpen?: boolean }
) {
  return (
    <details className="group rounded-xl border p-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="font-medium">{title}</span>
        <span className="transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-3 text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}
