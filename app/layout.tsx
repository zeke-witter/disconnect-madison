export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Handjet, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "./components/NavigationWrapper";
import Footer from "./components/Footer";
import { baseMetadata } from "@/lib/metadata";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${handjet.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <header>
            <NavigationWrapper />
          </header>
          <main id="main-content" className="flex min-h-screen w-full flex-col items-center justify-between py-10 px-4 sm:px-8 lg:px-16 bg-color-background sm:items-start">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
