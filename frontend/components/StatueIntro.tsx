"use client";
import { useState } from "react";
import Link from "next/link";

export default function StatueIntro() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border bg-white/70 p-6 shadow-sm">
      <h2 className="text-xl font-semibold">¿Qué es una “estatua”?</h2>
      <p className="mt-2 text-gray-700">
        Viene del latín <span className="font-bold">statua</span>, derivado de{" "}
        <span className="font-bold">statuō</span> (“erigir”, “colocar de pie”) y
        relacionado con <span className="font-bold">stare</span> (“permanecer”). En esencia:{" "}
        <span className="font-bold">algo que se mantiene firme y erguido</span>.
      </p>

      <button
        onClick={() => setOpen(!open)}
        className="mt-3 inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        aria-expanded={open}
        aria-controls="historia-estatua"
      >
        {open ? "Ocultar historia" : "Ver historia breve"}
      </button>

      {open && (
        <div id="historia-estatua" className="mt-4 space-y-3 text-gray-700">
          <p>
            La <span className="font-bold">escultura</span> es antiquísima: desde el{" "}
            <span className="font-bold">Paleolítico</span> hay figuras talladas en marfil con más
            de <span className="font-bold">30 000 años</span>. También destaca el{" "}
            <span className="font-bold">Ídolo de Shigir</span> (c. 9000 a. C.). Con el tiempo,
            culturas como <span className="font-bold">Egipto</span>, <span className="font-bold">China</span>,{" "}
            <span className="font-bold">India</span> y <span className="font-bold">Mesopotamia</span> perfeccionaron técnicas
            en piedra y metal para homenajear dioses, líderes e ideas (como la libertad).
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Dato curioso:</span> en 1988 se presentó en Viena una{" "}
            <span className="font-bold">estatuilla paleolítica</span> que representa a un humano en
            movimiento—¡hecha hace ~30 000 años y aún “respira” vida!
          </p>
          <Link
            href="/statues"
            className="inline-block rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90"
          >
            Ver cronología de estatuas en Rosario
          </Link>
        </div>
      )}
    </section>
  );
}
