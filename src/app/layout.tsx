import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eco Celestial - Cancionero Litúrgico Digital",
    template: "%s | Eco Celestial",
  },
  description:
    "Herramienta digital para buscar, transponer y gestionar canciones litúrgicas. Diseñada para músicos y comunidades religiosas.",
  keywords: [
    "liturgia",
    "música",
    "canciones",
    "iglesia",
    "acordes",
    "transposición",
    "cancionero",
  ],
  authors: [{ name: "Eco Celestial Team" }],
  creator: "Eco Celestial",
  publisher: "Eco Celestial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eco-celestial.vercel.app"),
  openGraph: {
    title: "Eco Celestial - Cancionero Litúrgico Digital",
    description:
      "Herramienta digital para buscar, transponer y gestionar canciones litúrgicas",
    url: "https://eco-celestial.vercel.app",
    siteName: "Eco Celestial",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Celestial - Cancionero Litúrgico Digital",
    description:
      "Herramienta digital para buscar, transponer y gestionar canciones litúrgicas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
