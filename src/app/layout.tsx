import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akiba Escolares - Gestión Inteligente de Transporte Escolar",
  description:
    "Plataforma de seguimiento en tiempo real de buses escolares. Seguridad para padres, eficiencia para colegios y transportistas. Disponible en Chile.",
  keywords: "transporte escolar, seguimiento bus, app escolar, seguridad estudiantes, GPS bus escolar, Chile",
  openGraph: {
    title: "Akiba Escolares",
    description: "Seguridad y tranquilidad en cada trayecto escolar.",
    siteName: "Akiba Escolares",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          async
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
