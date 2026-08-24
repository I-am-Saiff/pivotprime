"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAVIGATION, type NavItem } from "@/content/navigation";
import { HEADER_CTA } from "@/content/cta";

function PivotLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="28"
        height="28"
        viewBox="0 0 36 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-neon"
        aria-hidden="true"
      >
        <path d="M24.711 0.003H18.048V6.581H24.711V0.003Z" fill="currentColor" />
        <path d="M13.533 0H8.056V5.407H13.533V0Z" fill="currentColor" />
        <path d="M24.117 10.927H18.64V16.334H24.117V10.927Z" fill="currentColor" />
        <path d="M23.407 21.489H19.349V25.496H23.407V21.489Z" fill="currentColor" />
        <path d="M13.052 11.627H8.993V15.634H13.052V11.627Z" fill="currentColor" />
        <path d="M12.598 21.715H9V25.267H12.598V21.715Z" fill="currentColor" />
        <path d="M3.34 11.988H0.01V15.276H3.34V11.988Z" fill="currentColor" />
        <path d="M23.042 31.713H19.712V35H23.042V31.713Z" fill="currentColor" />
        <path d="M35.528 31.713H32.198V35H35.528V31.713Z" fill="currentColor" />
        <path d="M3.33 0.213H0V3.5H3.33V0.213Z" fill="currentColor" />
        <path d="M2.872 22.073H0V24.909H2.872V22.073Z" fill="currentColor" />
        <path d="M12.257 31.948H9.385V34.784H12.257V31.948Z" fill="currentColor" />
        <path d="M1.977 32.851H0.02V34.784H1.977V32.851Z" fill="currentColor" />
        <path d="M35.531 10.343H28.868V16.921H35.531V10.343Z" fill="currentColor" />
        <path d="M35.528 20.789H30.051V26.196H35.528V20.789Z" fill="currentColor" />
        <path d="M35.531 0.003H28.868V6.581H35.531V0.003Z" fill="currentColor" />
      </svg>
      {/* One word, one weight. "Pivot" was font-bold text-white and "Prime" was
          font-semibold text-white/95, so the two halves differed in weight AND
          in opacity. Levelled down to Prime's weight rather than up, so the
          wordmark is not heavier than it was. */}
      <span className="font-sans text-lg font-semibold tracking-tight text-white">
        PivotPrime
      </span>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  /** True when a panel was opened deliberately, by click or keyboard. Hover
   *  neither opens nor closes while something is pinned. */
  const [pinned, setPinned] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Close an open dropdown on Escape or on a click outside. Without this a
  // keyboard user who opens a menu has no way back out of it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Return focus to the trigger, so a keyboard user is not dropped at the
      // top of the document after closing.
      const open = openMenu;
      setOpenMenu(null);
      setPinned(false);
      setMobileOpen(false);
      if (open) triggerRefs.current[open]?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setPinned(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
    // Re-registered when the open menu changes, so Escape knows which trigger to
    // return focus to. Reading it from a ref during render is not allowed.
  }, [openMenu]);

  const closeAll = () => {
    setOpenMenu(null);
    setPinned(false);
    setMobileOpen(false);
    setMobileSection(null);
  };

  /**
   * A disclosure, not a hover menu.
   *
   * The previous version set the open menu from onMouseEnter and toggled it from
   * onClick. By the time the click handler ran, hover had already opened the
   * panel, so the click read it as open and closed it: on a pointer device the
   * menu appeared on hover and vanished the instant you clicked the label, and
   * on touch, where there is no hover, the tap hit the same conflict.
   *
   * Click is now authoritative and hover is an enhancement. Opening by click
   * pins the panel, so moving the pointer away cannot close it, and hover only
   * acts when nothing is pinned and the device actually has a hovering pointer.
   * A phone therefore never depends on hover to reach anything.
   */
  const renderDesktopItem = (item: NavItem) => {
    const isOpen = openMenu === item.label;
    const panelId = `menu-${item.label.replace(/[^a-z]+/gi, "-").toLowerCase()}`;

    if (!item.children) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wider text-white/80 uppercase transition-colors hover:text-neon focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div
        key={item.label}
        className="relative flex h-full items-center"
        // Only on devices that genuinely hover. A touch browser may synthesise
        // pointerenter immediately before the tap, which would re-create the
        // conflict this replaced.
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse" || pinned) return;
          setOpenMenu(item.label);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse" || pinned) return;
          setOpenMenu(null);
        }}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={panelId}
          ref={(el) => {
            triggerRefs.current[item.label] = el;
          }}
          onClick={() => {
            // Authoritative: it does not matter how the panel came to be open.
            if (isOpen && pinned) {
              setOpenMenu(null);
              setPinned(false);
            } else {
              setOpenMenu(item.label);
              setPinned(true);
            }
          }}
          className="flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wider text-white/80 uppercase transition-colors hover:text-neon focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
        >
          {item.label}
          <svg
            className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-neon" : "text-white/60"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Always rendered, hidden when closed. Rendering only on open kept the
            entire dropdown out of the server HTML, which left
            /services/how-we-work linked from nowhere: no crawler and no reader
            without JavaScript could reach it. The five other service pages
            survived only because the homepage cards happen to link them. */}
        <div id={panelId} hidden={!isOpen} className="absolute top-full left-0 z-50 w-64 pt-3">
          <ul className="rounded-2xl bg-forest/95 backdrop-blur-xl border border-white/15 py-2 shadow-2xl ring-1 ring-black/20">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={closeAll}
                  className="block mx-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-neon focus-visible:bg-white/10 focus-visible:text-neon focus-visible:outline-none"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <nav ref={navRef} data-site-header className="fixed top-4 right-4 left-4 z-50">
      <div className="mx-auto max-w-6xl rounded-xl glass-nav px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-shrink-0 items-center" onClick={closeAll}>
            <PivotLogo />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-x-3">
            {NAVIGATION.map(renderDesktopItem)}
            <a
              href={HEADER_CTA.href}
              target={HEADER_CTA.external ? "_blank" : undefined}
              rel={HEADER_CTA.external ? "noopener noreferrer" : undefined}
              className="ml-3 inline-flex items-center justify-center rounded-xl bg-neon px-5 py-2 text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
            >
              {HEADER_CTA.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-xl p-2 text-white/80 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none lg:hidden"
          >
            <span className="sr-only">{mobileOpen ? "Close main menu" : "Open main menu"}</span>
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/15 bg-forest/95 backdrop-blur-xl p-4 text-white shadow-2xl lg:hidden"
        >
          <div className="space-y-1">
            {NAVIGATION.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeAll}
                    className="block rounded-xl px-3.5 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-neon"
                  >
                    {item.label}
                  </Link>
                );
              }

              const expanded = mobileSection === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-white/90 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-neon focus-visible:outline-none"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${expanded ? "rotate-180 text-neon" : "text-white/60"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expanded && (
                    <ul className="mt-1 space-y-1 border-l border-white/20 pl-4 ml-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeAll}
                            className="block rounded-lg px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-neon"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            <div className="pt-4 pb-2">
              <a
                href={HEADER_CTA.href}
                target={HEADER_CTA.external ? "_blank" : undefined}
                rel={HEADER_CTA.external ? "noopener noreferrer" : undefined}
                onClick={closeAll}
                className="flex w-full items-center justify-center rounded-xl bg-neon px-5 py-3 text-xs font-bold tracking-wider text-forest uppercase shadow-md transition-all hover:bg-white"
              >
                {HEADER_CTA.label}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
