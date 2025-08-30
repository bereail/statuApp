// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'StatuApp — Rosario',
  description: 'Explorá el patrimonio escultórico de Rosario',
};
export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <meta name="color-scheme" content="light" />
      <meta name="theme-color" content="#ffffff" />
      <body className={`min-h-dvh bg-base-100 text-base-content antialiased ${inter.className}`}>
        {/* NAVBAR */}
        <header className="sticky top-0 z-10 bg-base-100/90 backdrop-blur border-b border-base-200">
          <nav className="navbar container mx-auto max-w-6xl px-4">
            <div className="navbar-start">
              <Link href="/" className="font-semibold text-xl">StatuApp</Link>
            </div>
            <div className="navbar-end gap-1 sm:gap-2">
              <Link className="btn btn-ghost btn-sm" href="/statues">Estatuas   </Link>
              <Link className="btn btn-ghost btn-sm" href="/mapa">Mapa   </Link>
              <Link className="btn btn-primary btn-sm" href="/buscar">Buscar  </Link>
            </div>
          </nav>
        </header>

        {/* CONTENIDO */}
        <main className="container mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="container mx-auto max-w-6xl px-4 py-10 border-t border-base-200 text-sm text-base-content/70">
          © {new Date().getFullYear()} StatuApp — Rosario
        </footer>
      </body>
    </html>
  );
}
