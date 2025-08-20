// frontend/types/statues.ts
export type EstatuaList = {
  slug: string;
  titulo: string;
  ubicacion?: string;
  imagen_destacada?: string;
};

export type EstatuaDetail = EstatuaList & {
  descripcion_md?: string;
  barrio?: string;
  anio?: number;
  lat?: number;
  lng?: number;
  // agrega aquí lo que devuelva tu detalle
};
