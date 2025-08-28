// app/statues/loading.tsx
export default function Loading() {
  return (
    <div className="p-4 animate-pulse">
      <div className="h-6 w-40 bg-slate-200 rounded mb-3" />
      <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
      <div className="h-4 w-2/3 bg-slate-200 rounded" />
    </div>
  );
}
