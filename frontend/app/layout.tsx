// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

// 1) Tipografía optimizada (auto-subset + swap)
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// 2) Metadatos sólidos y URL base para construir OG absolutas
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'StatuApp',
    template: '%s · StatuApp',
  },
  description: 'Catálogo de estatuas de Rosario con QR',
  openGraph: {
    title: 'StatuApp',
    description: 'Catálogo de estatuas de Rosario con QR',
    url: '/',
    siteName: 'StatuApp',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StatuApp',
    description: 'Catálogo de estatuas de Rosario con QR',
  },
};

// 3) Viewport (tema del navegador, mobile-friendly)
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tip: si alguna extensión inyecta atributos al <html>/<body>, podés agregar suppressHydrationWarning
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-white text-zinc-900`}>
        {/* Enlace “saltar al contenido” para accesibilidad con teclado */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2"
        >
          Saltar al contenido
        </a>

        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur p-3">
          <div className="mx-auto max-w-5xl flex items-center gap-3">
            {/* 4) Navegación con <Link> para evitar recargas completas */}
            <Link href="/" className="font-semibold">
              StatuApp
            </Link>
            <nav aria-label="Principal" className="ml-auto flex gap-4 text-sm">
              <Link href="/buscar">Buscar</Link>
              <Link href="/mapa">Mapa</Link>
            </nav>
          </div>
        </header>

        {/* 5) main con id de ancla y landmark semántico */}
        <main id="contenido" className="mx-auto max-w-5xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
