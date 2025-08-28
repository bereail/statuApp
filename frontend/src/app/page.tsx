/* la ruta / */
import StatueIntro from "components/StatueIntro";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 place-items-center py-10">
      <h1 className="text-3xl font-bold">Bienvenida a StatuApp</h1>
      <p className="text-lg text-center max-w-xl">
        Escaneá un QR o explorá el patrimonio de Rosario por barrio, autor o palabra clave.
      </p>

      {/* Botones con DaisyUI */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/buscar" className="btn btn-primary">
          🔎 Ir a Buscar
        </Link>
        <Link href="/mapa" className="btn btn-secondary">
          🗺️ Ver Mapa
        </Link>
        <Link href="/statues" className="btn btn-accent">
          🏛️ Estatuas
        </Link>
      </div>

      {/* Una card opcional de bienvenida */}
      <div className="card w-96 bg-base-100 shadow-xl mt-6">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Explorá Rosario</h2>
          <p>
            Descubrí historias, autores y curiosidades de las estatuas de la ciudad.
          </p>
          <div className="card-actions justify-end">
            <Link href="/statues" className="btn btn-outline btn-primary">
              Ver Estatuas
            </Link>
          </div>
        </div>

      </div>
                <StatueIntro />
    </section>
  );
}
