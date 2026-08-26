"use client";

import { useState, useEffect } from "react";
import { HAS_WHATSAPP, WHATSAPP_URL } from "@/lib/flags";

/* Smaller and tighter into the corner below sm. A fixed button passes over
   whatever is beneath it as the page scrolls, so it cannot be made never to
   overlap; at 360 it was 64px square over a full-width text column and covered
   the tail of a line. 48px in the corner, plus a bottom gutter on the sections
   a reader actually stops at, is what is available short of removing it.
   PENDING-COPY 1ak. */
export default function WhatsappButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 500px is roughly past the hero section, you can adjust this value if needed
      if (window.scrollY > 500) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // #25D366 is Meta's mandated WhatsApp brand green and is deliberately not a
    // Pivot Prime token. It is the only off-palette colour on the site that is
    // correct as it stands. Do not "fix" it to --color-neon: the brand
    // guidelines require this exact value on the WhatsApp mark.
    // Registered in scripts/palette-allow.json for the same reason.
    <a
      href={WHATSAPP_URL}
      // WHATSAPP_URL degrades to /contact when NEXT_PUBLIC_WHATSAPP_NUMBER is
      // unset, and it is unset in production today. The target and rel were
      // unconditional, so the fallback opened our own contact page in a new tab.
      target={HAS_WHATSAPP ? "_blank" : undefined}
      rel={HAS_WHATSAPP ? "noopener noreferrer" : undefined}
      aria-label={HAS_WHATSAPP ? "Message Pivot Prime on WhatsApp" : "Talk to us"}
      className={`fixed bottom-4 right-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl sm:bottom-6 sm:right-6 sm:p-4 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <svg aria-hidden="true" className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
    </a>
  );
}
