import { NextResponse } from 'next/server';
const MOCK = [
{ slug: 'mujer-con-nino-rosedal', titulo: 'Mujer con Niño (Rosedal)', barrio: 'Parque Independencia', descripcion_md: '<p>Escultura ubicada en el Rosedal del Parque Independencia.</p>' },
{ slug: 'madre-rosario', titulo: 'Monumento a la Madre', barrio: 'Parque Independencia', descripcion_md: '<p>Obra de José Gerbino, inaugurada el 10/12/1967.</p>' }
];
export async function GET(_: Request, { params }: { params: { slug: string } }) {
const one = MOCK.find(x => x.slug === params.slug);
if (!one) return new NextResponse('Not found', { status: 404 });
return NextResponse.json(one);
}