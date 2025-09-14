// lib/api.ts
function resolveBase(): string {
  const raw =
    (typeof window === "undefined"
      ? process.env.API_URL ||
        process.env.NEXT_PUBLIC_API_BASE ||
        process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_BASE ||
        process.env.NEXT_PUBLIC_API_URL) || "";

  const base = raw.trim().replace(/\/+$/, "");
  if (!base) {
    throw new Error(
      "Falta NEXT_PUBLIC_API_BASE en frontend/.env.local (p.ej. http://127.0.0.1:8000/api/v1)"
    );
  }
  return base;
}

function joinUrl(base: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = String(path).trim().replace(/^\/+/, "");
  return `${base}/${clean}`;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const BASE = resolveBase();
  const url = joinUrl(BASE, path);
  console.log("➡️ fetch:", url);

  const res = await fetch(url, { headers: { Accept: "application/json" }, ...init });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${url}${text ? " • " + text : ""}`);
  }
  return res.json() as Promise<T>;
}
