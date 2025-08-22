// lib/api.ts

/* 
  Este archivo centraliza la lógica de acceso al backend.
  Todo el frontend debe usar fetchJson() para consumir la API.
*/

// URL base de tu backend
// 🔑 La podés definir en .env.local como:
// NEXT_PUBLIC_API_BASE="http://127.0.0.1:8000/api/v1"
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api/v1";

/**
 * Función genérica para hacer fetch a la API y obtener JSON tipado.
 * @param path - Endpoint relativo (ej: "/statues/").
 * @param init - Config extra para fetch (headers, método, body, etc.).
 * @returns Promesa con JSON parseado.
 */
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  // construye la URL final
  const url = `${API_BASE}${path}`;

  // 👀 Log de depuración → se ve en la terminal de Next.js (porque es Server Component)
  console.log("➡️ Llamando a:", url);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    ...init,
  });

  // manejo de errores
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);

  return res.json();
}
