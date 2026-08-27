import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL, pageMetadata } from "@/content/metadata";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// metadataBase makes canonical and Open Graph URLs absolute. Without it Next
// emits relative URLs, which a crawler and a link preview both resolve wrongly.
// Per-page title and description live in src/content/metadata.ts; nothing
// inherits a template, because the five service pages are the ones meant to rank
// and a shared description would set them competing for the same words.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata("home"),
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans antialiased h-full`}>
      <body className="min-h-full flex flex-col surface-page text-foreground relative">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
