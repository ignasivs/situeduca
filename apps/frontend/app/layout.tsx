// apps/frontend/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'SituEduca',
  description: 'Generador de situaciones de aprendizaje',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
