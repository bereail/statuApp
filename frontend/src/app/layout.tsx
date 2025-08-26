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

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh antialiased">
        <header className="sticky top-0 z-10 bg-[var(--bg)]/80 backdrop-blur border-b border-[var(--border)]">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
            <a href="/" className="font-semibold">StatuApp</a>
            <div className="ml-auto flex gap-3 text-sm">
              <a className="hover:underline" href="/statues">Estatuas</a>
              <a className="hover:underline" href="/mapa">Mapa</a>
              <a className="hover:underline" href="/buscar">Buscar</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} StatuApp — Rosario
        </footer>
      </body>
    </html>
  );
}
