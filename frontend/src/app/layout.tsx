// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'], display: 'swap' });



export const metadata: Metadata = { /* …igual que el tuyo… */ };
export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 👇 Esto fija el tema "light" sin depender del SO
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <meta name="color-scheme" content="light" />
    <meta name="theme-color" content="#ffffff" />
      {/* 👇 base de colores legibles: fondo claro + texto */}
      <body className={`min-h-dvh antialiased bg-base-100 text-base-content ${inter.className}`}
      suppressHydrationWarning>
        <header className="sticky top-0 z-10 bg-base-100/80 backdrop-blur border-b border-base-200">
          <nav className="navbar mx-auto max-w-6xl px-4">
            <div className="navbar-start">
              <Link  href="/" className="font-semibold text-lg">StatuApp</Link >
            </div>
            <div className="navbar-end gap-2">
              <Link className="btn btn-ghost btn-sm" href="/statues">Estatuas    </Link>
              <a className="btn btn-ghost btn-sm" href="/mapa">  Mapa    </a>
              <a className="btn btn-primary btn-sm" href="/buscar">  Buscar   </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-base-content/70">
          © {new Date().getFullYear()} StatuApp — Rosario
        </footer>
      </body>
    </html>
  );
}
