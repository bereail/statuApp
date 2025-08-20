/*es el lugar donde conviene centralizar toda la lógica de acceso al backend.*/


// Define la constante API_BASE tomando la variable de entorno NEXT_PUBLIC_API_BASE.
// El "!" al final le dice a TypeScript que confíe en que siempre va a estar definida.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/**
 * Función genérica para hacer fetch a la API y obtener JSON tipado.
 * @param path - El endpoint relativo (ej: "/estatuas/")
 * @param init - Opcional: configuración extra para fetch (headers, método, body, etc.)
 * @returns Promesa con el resultado parseado como JSON (del tipo T).
 */
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  // Hace la petición HTTP combinando la base de la API con el path recibido.
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" }, // fuerza que el backend devuelva JSON
    ...init, // permite sobreescribir o agregar configuración extra
  });

  // Si la respuesta no es "ok" (status 200–299), lanza un error con el código y el texto devuelto.
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);

  // Si todo salió bien, parsea y devuelve el JSON.
  return res.json();
}


/*API_BASE es la URL base de tu backend (por ejemplo http://localhost:8000/api/v1).

fetchJson es un wrapper genérico para hacer peticiones a tu API, controlar errores y recibir datos tipados en TypeScript.

Lo usás en tu frontend Next.js para consumir endpoints como /estatuas/ o /estatuas/{slug}/ que definiste en tu API.*/