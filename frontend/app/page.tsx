export default function HomePage() {
return (
<section className="grid gap-4">
<h1 className="text-2xl font-bold">Bienvenida a StatuApp</h1>
<p>Escaneá un QR o buscá por barrio, autor o palabra clave.</p>
<div className="flex gap-3">
<a className="underline" href="/buscar">Ir a Buscar</a>
<a className="underline" href="/mapa">Ver Mapa</a>
<a className="underline" href="/estatuas">Estatuas</a>
</div>
</section>
);
}