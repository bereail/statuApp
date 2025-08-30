// app/page.tsx
import Link from "next/link";
import StatueIntro from "components/StatueIntro";

export default function HomePage() {
  return (
    <section className="grid place-items-center gap-10">
      {/* HERO */}
      <div className="text-center max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Bienvenida a <span className="text-primary">StatuApp</span>
        </h1>
        <p className="text-base sm:text-lg text-base-content/80">
          Escaneá un QR o explorá el patrimonio de Rosario por barrio, autor o palabra clave.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/buscar" className="btn btn-primary btn-md">
            🔎 Buscar
          </Link>
          <Link href="/mapa" className="btn btn-secondary btn-md">
            🗺️ Ver Mapa
          </Link>
          <Link href="/statues" className="btn btn-outline btn-md">
            🏛️ Ver Estatuas
          </Link>
        </div>
      </div>


      {/* INTRO (tu componente actual) */}
      <div className="w-full max-w-5xl">
        <StatueIntro />
      </div>
    </section>
  );
}
