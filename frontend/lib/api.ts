// frontend/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    ...init,
    // Para desarrollo: cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
  return res.json();
}
