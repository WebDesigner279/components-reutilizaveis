import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ServiceWorkerRegistration } from "@/components/pwa/service-worker-registration";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  applicationName: "Biblioteca de Componentes Reutilizáveis",
  title: "Componentes Reutilizáveis",
  description:
    "Base Next.js com shadcn/ui, catálogo instalável e componentes reutilizáveis.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Componentes",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/icon",
        type: "image/png",
      },
      {
        url: "/icon-192.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon",
    shortcut: "/icon-192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
