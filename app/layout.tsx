export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationWrapper from "./components/NavigationWrapper";
import Footer from "./components/Footer";
import { baseMetadata } from "@/lib/metadata";

// Display / Hero — Built Titling (self-hosted OTF, free for commercial use per dafont)
const builtTitling = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/built-titling/built titling el.otf", weight: "200", style: "normal" },
    { path: "./fonts/built-titling/built titling el it.otf", weight: "200", style: "italic" },
    { path: "./fonts/built-titling/built titling lt.otf", weight: "300", style: "normal" },
    { path: "./fonts/built-titling/built titling lt it.otf", weight: "300", style: "italic" },
    { path: "./fonts/built-titling/built titling rg.otf", weight: "400", style: "normal" },
    { path: "./fonts/built-titling/built titling rg it.otf", weight: "400", style: "italic" },
    { path: "./fonts/built-titling/built titling sb.otf", weight: "600", style: "normal" },
    { path: "./fonts/built-titling/built titling sb it.otf", weight: "600", style: "italic" },
    { path: "./fonts/built-titling/built titling bd.otf", weight: "700", style: "normal" },
    { path: "./fonts/built-titling/built titling bd it.otf", weight: "700", style: "italic" },
  ],
});

// Body / Copy / UI — Raleway (variable, SIL OFL)
const raleway = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/raleway/Raleway-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "./fonts/raleway/Raleway-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
});

// Accent / Handwritten — Sue Ellen Francisco (SIL OFL), used sparingly for quotes/callouts
const sueEllenFrancisco = localFont({
  variable: "--font-accent",
  display: "swap",
  src: [
    { path: "./fonts/sue-ellen-francisco/SueEllenFrancisco-Regular.ttf", weight: "400", style: "normal" },
  ],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${builtTitling.variable} ${raleway.variable} ${sueEllenFrancisco.variable} antialiased`}
      >
        <header>
          <NavigationWrapper />
        </header>
        <main id="main-content" className="flex min-h-screen w-full flex-col items-center justify-between py-10 px-4 sm:px-8 lg:px-16 bg-background sm:items-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
