import Link from "next/link";

export default function NotFound() {
  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold">Estatua no encontrada</h1>
      <Link  href="/statues" className="underline text-blue-600">Volver al listado</Link>
    </section>
  );
}
