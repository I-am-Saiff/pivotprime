"use client";

import { useState } from "react";
import PairToggle from "@/components/PairToggle";

/**
 * The as-it-runs-today process map, lifted out of Service1ClarityAudit.
 *
 * The page around it is a server component now. Only this diagram needs state,
 * so only this diagram ships JavaScript. The whole page used to be a client
 * component, which put a hydration cost on a page spec 4.1 earmarks for paid
 * traffic in exchange for one two-state toggle. PENDING-COPY 1j.
 */
export default function ClarityAuditProcessMap() {
  const [mapState, setMapState] = useState<0 | 1>(0); // 0 = Messy, 1 = Clean

  const MESSY = [
    { x: 4, y: 18, t: "Enquiry" },
    { x: 26, y: 64, t: "Quote" },
    { x: 14, y: 6, t: "Approval", dead: true },
    { x: 48, y: 34, t: "Onboard" },
    { x: 38, y: 80, t: "Rework", dead: true },
    { x: 68, y: 14, t: "Deliver" },
    { x: 82, y: 62, t: "Invoice" },
  ];
  const CLEAN = [
    { x: 2, y: 42, t: "Enquiry" },
    { x: 18, y: 42, t: "Quote" },
    { x: 34, y: 42, t: "Approval" },
    { x: 50, y: 42, t: "Onboard" },
    { x: 66, y: 42, t: "Deliver" },
    { x: 82, y: 42, t: "Invoice" },
  ];
  
  const MESSY_LINKS = [[0, 1], [1, 2], [2, 1], [1, 3], [3, 4], [4, 3], [3, 5], [5, 6], [4, 6]];
  const CLEAN_LINKS = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];

  const maxNodes = Math.max(MESSY.length, CLEAN.length);
  const set = mapState ? CLEAN : MESSY;
  const links = mapState ? CLEAN_LINKS : MESSY_LINKS;

  return (
      <section className="surface-page py-10 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 sm:mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              The deliverable, in one picture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              How the work runs today, <span className="text-[#009f50]">and what it becomes.</span>
            </h2>
            <p className="text-[#5e6f68] mt-3">
              Every audit produces an as-is versus to-be map. Press the toggle to see the difference we are looking for.
            </p>
          </div>

          <div className="card-dark border border-[#e3eae6] rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
            <PairToggle
              left="As it runs today"
              right="After the audit"
              active={mapState as 0 | 1}
              onChange={(n) => setMapState(n)}
              className="mb-6"
            />

            <div className="relative h-[240px] md:h-[340px] w-full">
              <svg viewBox="0 0 900 240" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                {links.map(([a, b], idx) => {
                  const A = set[a];
                  const B = set[b];
                  if (!A || !B) return null;
                  const x1 = (A.x / 100) * 900 + 37;
                  const y1 = (A.y / 100) * 240 + 17;
                  const x2 = (B.x / 100) * 900 + 37;
                  const y2 = (B.y / 100) * 240 + 17;
                  const mx = (x1 + x2) / 2;
                  const bend = mapState ? 0 : 38;
                  const warn = !mapState && a > b;

                  return (
                    <path
                      key={idx}
                      d={`M${x1},${y1} Q${mx},${(y1 + y2) / 2 - bend} ${x2},${y2}`}
                      fill="none"
                      stroke={warn ? "#e0a08c" : "#c8d9d0"}
                      strokeWidth="1.6"
                      strokeDasharray={warn ? "4 4" : "none"}
                      className="transition-all duration-700 ease-in-out"
                    />
                  );
                })}
              </svg>

              {Array.from({ length: maxNodes }).map((_, i) => {
                const s = set[i];
                if (!s) {
                  return (
                    <div
                      key={i}
                      className="absolute w-[74px] h-[34px] rounded-lg card-dark border border-[#e3eae6] flex items-center justify-center font-sans font-semibold text-[10.5px] text-[#013325] opacity-0 transition-all duration-700 ease-in-out pointer-events-none"
                      style={{ left: "90%", top: "42%", transform: "translate(-50%, -50%)" }}
                    />
                  );
                }
                const isDead = "dead" in s ? (s as { dead?: boolean }).dead : false;
                return (
                  <div
                    key={i}
                    className={`absolute w-[74px] h-[34px] rounded-lg border flex items-center justify-center font-sans font-semibold text-[10.5px] transition-all duration-700 ease-in-out z-10
                      ${isDead ? "surface-page border-[#e8c4ba] text-[#9c4f3a]" : "surface-page border-[#e3eae6] text-[#013325]"}
                    `}
                    style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    {s.t}
                  </div>
                );
              })}
            </div>
            
            {/* Both captions render, with the inactive one hidden, so neither
                half of the before-and-after is missing from the served HTML.
                Same treatment as the seat panels on the fractional page. */}
            <p className="text-[14px] text-[#5e6f68] mt-6 min-h-[44px] max-w-2xl">
              <span hidden={mapState !== 0}>
                {"Seven steps, four handoffs that double back, and two that nobody owns. This is what most businesses look like when you actually map them rather than describe them."}
              </span>
              <span hidden={mapState !== 1}>
                {"Six steps, one direction, every one owned. Same business, same people. What changed is that the work now only moves forwards, and the two steps that existed to fix earlier mistakes are gone."}
              </span>
            </p>
          </div>
        </div>
      </section>
  );
}
