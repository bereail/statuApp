// app/page.tsx
import FeatureCard from "components/FeatureCard";
import StatueIntro from "components/StatueIntro";

export default function HomePage() {
  return (
    <>
      {/* Fondo suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-10 -bottom-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <section className="px-4 py-12 sm:py-16 space-y-12">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-base-200 px-3 py-1 text-xs font-medium">
              <span>📍 Rosario</span>
              <span className="text-base-content/60">•</span>
              <span>Patrimonio en tu celular</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Bienvenida a <span className="text-primary">StatuApp</span>
            </h1>

            <p className="text-base sm:text-lg text-base-content/80">
              Explorá el patrimonio por <b>barrio</b>, <b>autor</b> o <b>palabra clave</b>. 
              Mapas, fichas e imágenes optimizadas.
            </p>


          </div>

          {/* Intro card */}
          <div className="w-full">
            <div className="card border border-base-200 bg-base-100 shadow-xl">
              <div className="card-body">
                <StatueIntro />
              </div>
            </div>
          </div>
        </div>

        {/* Acciones principales (sin duplicar botones) */}
        <div className="grid gap-4 sm:grid-cols-3">
          <FeatureCard
            href="/buscar"
            icon={"🔎"}
            title="Buscar"
            desc="Encontrá por nombre, barrio, autor o palabra clave."
          />
          <FeatureCard
            href="/mapa"
            icon={"🗺️"}
            title="Mapa"
            desc="Recorridos por zona y puntos cercanos."
          />
          <FeatureCard
            href="/statues"
            icon={"🏛️"}
            title="Estatuas"
            desc="Fichas con año, autor, materiales e imágenes."
          />
        </div>
      </section>
    </>
  );
}
