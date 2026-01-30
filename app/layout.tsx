import type { Metadata } from "next";
import { Geist, Geist_Mono, Handjet, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { baseMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handjet = Handjet({
  variable: "--font-handjet",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk"
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
        className={`${geistSans.variable} ${geistMono.variable} ${handjet.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <header>
         <Navigation />
        </header>
        <main id="main-content" className="flex min-h-screen w-full flex-col items-center justify-between py-18 px-16 bg-color-background sm:items-start">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
