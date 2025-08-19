import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.SITE_NAME || "Statuart",
  description: "Historia y ubicación de estatuas de Rosario mediante códigos QR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg">Statuart</a>
            <nav className="text-sm space-x-4">
              <a className="hover:underline" href="/mapa">Mapa</a>
              <a className="hover:underline" href="/acerca">Acerca</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Statuart — Rosario
        </footer>
      </body>
    </html>
  );
}
