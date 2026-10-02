import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, pageMetadata } from "@/content/metadata";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// HER HEAVIER LETTERING, 2 October. Her pictures and her own files set a few
// things in Poppins 800 and 900, which this site never loaded, so every
// font-extrabold on it has always drawn in 700. Used only where her picture
// asks for it, through the font-heavy utility, so the other font-extrabold
// uses across the site keep drawing exactly as before.
//
// A LOCAL FAMILY, NOT A SECOND next/font/google CALL. That was tried first, and
// this version of Next names every Google family plainly "Poppins", so the two
// weights joined the family above and every font-extrabold on the site turned
// heavier. The files are Google's own Poppins ExtraBold and Black, latin set,
// as next/font/google itself served them (checked: weight classes 800 and 900,
// 218 glyphs each). Anything outside latin falls through to Poppins.
const poppinsHeavy = localFont({
  variable: "--font-poppins-heavy",
  src: [
    { path: "./fonts/Poppins-ExtraBold-latin.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Poppins-Black-latin.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  // No generated Arial fallback of its own: the next family in font-heavy is
  // Poppins itself, which is the right stand-in while these load.
  adjustFontFallback: false,
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
    <html lang="en" className={`${poppins.variable} ${poppinsHeavy.variable} font-sans antialiased h-full`}>
      <body className="min-h-full flex flex-col surface-page text-foreground relative">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
