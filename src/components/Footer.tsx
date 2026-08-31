"use client";

import Link from "next/link";
import { FOOTER_LINKS } from "@/content/navigation";


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-white pt-10 sm:pt-16 pb-8" data-site-footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top part: Logo and Social Icons */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="-my-1.5 inline-flex min-h-11 items-center py-1.5">
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="grid grid-cols-3 gap-1 w-6 h-6">
                  <div className="bg-primary rounded-sm"></div>
                  <div className="bg-primary/80 rounded-sm"></div>
                  <div className="bg-primary/60 rounded-sm"></div>
                  <div className="bg-primary/80 rounded-sm"></div>
                  <div className="bg-primary/60 rounded-sm"></div>
                  <div className="bg-primary/40 rounded-sm"></div>
                  <div className="bg-primary/60 rounded-sm"></div>
                  <div className="bg-primary/40 rounded-sm"></div>
                  <div className="bg-primary/20 rounded-sm"></div>
                </div>
                PivotPrime
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="h-11 w-11 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-forest transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="h-11 w-11 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-forest transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-600 mb-8"></div>
        
        {/* Bottom part: Links and Back to top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-medium mb-8">
          {/* Spec 3.12: the link list matches the new navigation, plus the
              privacy policy required by 2.7. The contact link is the 2.4 fix:
              it pointed at /contact while the live page was /contact-us, so the
              site standardises on /contact and /contact-us redirects to it. */}
          {/* -my-2 py-2 keeps the visual spacing while giving every link a 44px
              hit area. Measured at 320: these were 16px tall. */}
          {/* TWO COLUMNS BELOW 400, from the 31 August responsive audit. As a
              flex-wrap the seven links broke 3/3/1 at 320, leaving "Privacy"
              alone on a row of its own. grid-flow-col with grid-rows-4 fills
              down the first column before starting the second, which is what
              produces 4/3 rather than the 2/2/2/1 a plain two-column grid
              would give. auto-cols-fr keeps the two columns even.

              From 400 up, min-[400px]:flex restores the wrap exactly as it
              was, so 400 to 767 and everything from 768 are untouched. */}
          <div className="-my-2 grid auto-cols-fr grid-flow-col grid-rows-4 gap-x-6 min-[400px]:flex min-[400px]:flex-wrap">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 min-w-11 items-center tracking-wider text-gray-300 uppercase transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-6 md:mt-0">
            <button onClick={scrollToTop} className="-my-2 inline-flex min-h-11 items-center py-2 text-gray-300 transition-colors hover:text-white">
              Back to top 
              <span className="ml-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
              </span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Pivot Prime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
