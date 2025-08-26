// types/statues.ts
export type StatueList = {
  slug: string;
  title: string;
  barrio?: string | null;
  image?: string | null;   // ya normalizado
};
export type Paginated<T> = { count: number; next: string|null; previous: string|null; results: T[] };
