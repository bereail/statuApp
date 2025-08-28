import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold">No encontrado</h1>
      <p className="text-gray-500 mt-2">La estatua o página que buscás no existe.</p>
      <Link  href="/" className="underline mt-4 inline-block">Volver al inicio</Link>
    </div>
  );
}
