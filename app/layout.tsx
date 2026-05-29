export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppShell from "./components/AppShell";
import Footer from "./components/Footer";
import { baseMetadata } from "@/lib/metadata";
import { getPledgesAction } from "@/lib/actions";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const counts = await getPledgesAction();
  const totalPledges = counts.reduce_screen_time + counts.take_a_break + counts.quit_for_good;

  return (
    <html lang="en">
      <body
        className={`${builtTitling.variable} ${raleway.variable} ${sueEllenFrancisco.variable} antialiased`}
      >
        <AppShell totalPledges={totalPledges}>
          {children}
        </AppShell>
        <Footer />
      </body>
    </html>
  );
}
