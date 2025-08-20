// frontend/types/statues.ts

// Tipo base para listar estatuas (por ejemplo, en una vista de listado)
// Define las propiedades mínimas que tendrá cada estatua en ese listado
export type EstatuaList = {
  slug: string;              // Identificador único en forma de string (ej: "monumento-a-la-madre")
  titulo: string;            // Título o nombre de la estatua
  ubicacion?: string;        // (opcional) Dirección o lugar donde está ubicada
  imagen_destacada?: string; // (opcional) URL de una imagen principal de la estatua
};

// Tipo más detallado, que extiende el anterior
// Se usa cuando consultás el detalle de una estatua específica
export type EstatuaDetail = EstatuaList & {
  descripcion_md?: string;   // (opcional) Descripción en formato Markdown
  barrio?: string;           // (opcional) Barrio de la ciudad donde está
  anio?: number;             // (opcional) Año de inauguración o creación
  lat?: number;              // (opcional) Latitud de la ubicación en mapa
  lng?: number;              // (opcional) Longitud de la ubicación en mapa
  // agrega aquí lo que devuelva tu detalle (campo extra según API o backend)
};
// EstatuaList sirve para el listado general de estatuas.

// EstatuaDetail hereda esas propiedades y agrega más información para la vista de detalle.