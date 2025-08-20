import { NextResponse } from 'next/server';
const MOCK = [
{ slug: 'mujer-con-nino-rosedal', titulo: 'Mujer con Niño (Rosedal)', barrio: 'Parque Independencia', descripcion_md: '<p>Escultura ubicada en el Rosedal del Parque Independencia.</p>' },
{ slug: 'madre-rosario', titulo: 'Monumento a la Madre', barrio: 'Parque Independencia', descripcion_md: '<p>Obra de José Gerbino, inaugurada el 10/12/1967.</p>' }
];
export async function GET(req: Request) {
const url = new URL(req.url);
const q = url.searchParams.get('q')?.toLowerCase();
const data = q ? MOCK.filter(x => JSON.stringify(x).toLowerCase().includes(q)) : MOCK;
return NextResponse.json(data);
}