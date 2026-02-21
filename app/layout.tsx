export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Handjet, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "./components/NavigationWrapper";
import Footer from "./components/Footer";
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
          <NavigationWrapper />
        </header>
        <main id="main-content" className="flex min-h-screen w-full flex-col items-center justify-between py-10 px-4 sm:px-8 lg:px-16 bg-color-background sm:items-start">
          {children}
        </main>
        <Footer />
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}
