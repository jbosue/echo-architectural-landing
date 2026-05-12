import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECHO - Materia arquitectónica reimaginada',
  description:
    'Un panel de superficie arquitectónica de alta precisión hecho con polímeros recuperados. Una nueva categoría de materia arquitectónica.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
