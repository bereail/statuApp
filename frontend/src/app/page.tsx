import Link from "next/link";
import StatueIntro from "components/StatueIntro";

export default function HomePage() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90 -z-10" />
      <div className="absolute inset-0 bg-[url('/textures/marble-dark.jpg')] bg-cover bg-center mix-blend-overlay opacity-30 -z-10" />

      {/* Contenido */}
      <div className="text-center max-w-3xl space-y-6 px-6">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
          Bienvenida a <span className="text-primary">StatuApp</span>
        </h1>

        <p className="text-base sm:text-lg text-base-content/80 leading-relaxed">
          Escaneá un <span className="text-primary">QR</span> o explorá el patrimonio de Rosario por{" "}
          <span className="italic">barrio</span>, <span className="italic">autor</span> o{" "}
          <span className="italic">palabra clave</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link href="/buscar" className="btn btn-primary rounded-full px-6 shadow-lg hover:scale-105 transition">
            🔎 Buscar
          </Link>
          <Link href="/mapa" className="btn btn-secondary rounded-full px-6 shadow-lg hover:scale-105 transition">
            🗺️ Ver Mapa
          </Link>
          <Link href="/statues" className="btn btn-outline rounded-full px-6 border-zinc-600 hover:bg-zinc-800">
            🏛️ Ver Estatuas
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16 px-4">
        <StatueIntro />
      </div>
    </section>
  );
}
