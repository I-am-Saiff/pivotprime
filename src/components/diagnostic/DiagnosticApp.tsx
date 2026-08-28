"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DOMAIN_NAMES as D,
  DOMAIN_ORDER as ORDER,
  rankByWeightedDeficit,
} from "@/lib/diagnostic/domains";
import {
  PER_DOMAIN,
  buildStatements,
  shuffleWithinDomains,
} from "@/lib/diagnostic/presentation";
import { POOL } from "@/lib/diagnostic/statements";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";


// Deep spec 8.2: one domain per screen, seven statements, six steps. Statements
// are grouped into six contiguous blocks of seven in canonical domain order, and
// shuffled within each block per session, which protects against straight-lining
// down a column of near-identical statements without breaking the specified
// structure. See src/lib/diagnostic/presentation.ts.
const BASE_STATEMENTS = buildStatements(POOL);

const PER_PAGE = PER_DOMAIN;
const PAGES = ORDER.length;

// Section titles are the domain names from spec 7.1. The six thematic titles
// that were here belonged to the interleaved layout, where a page genuinely had
// no single subject. They are not copy from either document, so they are logged
// in docs/PENDING-COPY.md rather than carried forward.
const PAGE_TITLES = ORDER.map((d) => D[d]);

const SCALE = [
  { v: 4, t: "Strongly agree" },
  { v: 3, t: "Agree" },
  { v: 2, t: "Neither" },
  { v: 1, t: "Disagree" },
  { v: 0, t: "Strongly disagree" },
  { v: 1, t: "Do not know", dk: true },
  { v: null, t: "Not applicable", na: true },
];

type WeightKeys = "founder" | "process" | "commercial" | "data" | "people" | "tech";
const WEIGHTS: Record<string, { label: string } & Record<WeightKeys, number>> = {
  founderled: { label: "Founder-led, under 20 staff", founder: 25, process: 20, commercial: 20, data: 10, people: 15, tech: 10 },
  sme: { label: "Scaling SME, 20 to 100 staff", founder: 15, process: 20, commercial: 25, data: 15, people: 15, tech: 10 },
  midmarket: { label: "Mid-market, 100+ staff", founder: 5, process: 25, commercial: 20, data: 20, people: 20, tech: 10 },
};

const FREETEXT = [
  "What have you already tried to fix, and what happened?",
  "What do you believe is actually holding the business back?",
  "What single change would make the biggest difference in the next six months?",
  "What is coming in the next twelve months that the business is not ready for?",
];

const BANDS = [
  { min: 85, n: "Built to scale", l: "Structurally sound. The constraint is more likely to be demand than operations." },
  { min: 65, n: "Stable", l: "The foundations hold. One area is limiting what the rest could do." },
  { min: 40, n: "Straining", l: "The business works, but it is absorbing effort it should not need to." },
  { min: 0, n: "Constrained", l: "The business is being held back in more than one place at once. Sequencing matters more than effort." },
];

const COMMENTARY: Record<string, { line: string; body: string; svc: string }> = {
  founder: { line: "Everything routes back to one person, and that is the ceiling.", body: "A business that cannot run without its founder is not yet an asset. It caps growth, makes absence expensive, and is the first thing an investor or buyer discounts.", svc: "Fractional Leadership" },
  commercial: { line: "The business may be working hard on revenue that is not earning.", body: "Where margin is not known by unit, pricing is set on instinct and corrected after the fact. It shows up as habitual discounting, unprofitable work being repeated, and growth that adds revenue without adding profit.", svc: "Operational Clarity Audit" },
  process: { line: "The work gets done, but only because people push it.", body: "Undocumented process means the business runs on individual memory. Quality slips as volume rises, onboarding takes months, and the same problems are solved repeatedly.", svc: "Fractional Leadership" },
  tech: { line: "People are doing work the systems should be doing.", body: "Manual re-entry between tools scales linearly with volume and never appears as a line on the P&L. It appears as headcount instead.", svc: "Technology Builds" },
  people: { line: "Everyone is busy and very little finishes.", body: "Where outcomes have no single owner, work stalls in the gaps between people. Meetings multiply to compensate, and good people leave for clarity rather than money.", svc: "Build and Place" },
  data: { line: "Decisions are being made on the loudest opinion in the room.", body: "Without trusted numbers, leadership hears about problems from customers rather than from reporting. Forecasts miss, and the business reacts to last month instead of steering the next one.", svc: "Technology Builds" },
};

export default function DiagnosticApp() {
  const [step, setStep] = useState(0);
  const [meta, setMeta] = useState({ biz: "", who: "", role: "leadership", preset: "sme" });
  const [answers, setAnswers] = useState<Record<number, { oi: number; v: number | null; na: boolean; dk: boolean }>>({});
  const [textAnswers, setTextAnswers] = useState<string[]>(["", "", "", ""]);
  const [hint, setHint] = useState("");

  // Presentation order, shuffled within each domain. Held as state and seeded
  // with the canonical order so the server and the first client render agree:
  // drawing from Math.random at module scope or in a useState initialiser would
  // hydrate mismatched. The shuffle happens in handleStart rather than in an
  // effect, which is both the correct moment, since step 0 is the intro screen
  // and no statement has been shown or answered yet, and avoids a cascading
  // render on mount.
  const [questions, setQuestions] = useState(BASE_STATEMENTS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  const progress = step === 0 ? 0 : Math.min(100, ((step - 1) / (PAGES + 1)) * 100);
  let stepText = "Operational Constraint Diagnostic";
  if (step > 0 && step <= PAGES) stepText = `Section ${step} of ${PAGES}`;
  else if (step === PAGES + 1) stepText = "Four open questions";
  else if (step > PAGES + 1) stepText = "The result";

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestions(shuffleWithinDomains(BASE_STATEMENTS));
    setStep(1);
  };

  const handleNextPage = () => {
    const from = (step - 1) * PER_PAGE;
    const to = Math.min(from + PER_PAGE, questions.length);
    let missing: number | null = null;
    for (let i = from; i < to; i++) {
      if (!answers[i]) {
        missing = i;
        break;
      }
    }

    if (missing !== null) {
      setHint("Answer every statement in this section before continuing.");
      document.getElementById("card" + missing)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setHint("");
    setStep(step + 1);
  };

  const compute = () => {
    const w = WEIGHTS[meta.preset];
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    ORDER.forEach((d) => { sums[d] = 0; counts[d] = 0; });
    
    questions.forEach((q, i) => {
      const a = answers[i];
      if (!a || a.na || a.v === null) return;
      sums[q.d] += a.v;
      counts[q.d]++;
    });

    const rows = ORDER.map((d) => {
      if (counts[d] < 4) return { d, name: D[d], scored: counts[d], insufficient: true, score: 0, weight: 0, deficit: 0, joint: false };
      return { d, name: D[d], scored: counts[d], insufficient: false, score: Math.round((sums[d] / (4 * counts[d])) * 100), weight: 0, deficit: 0, joint: false };
    });

    const usable = rows.filter((r) => !r.insufficient);
    const wSum = usable.reduce((t, r) => t + (w as Record<string, number>)[r.d], 0);
    usable.forEach((r) => { r.weight = wSum ? ((w as Record<string, number>)[r.d] / wSum) * 100 : 0; });
    const overall = wSum ? Math.round(usable.reduce((t, r) => t + r.score * r.weight, 0) / 100) : null;
    usable.forEach((r) => { r.deficit = +(r.weight * (100 - r.score) / 100).toFixed(1); });
    
    const ranked = rankByWeightedDeficit(usable);
    ranked.forEach((r, i) => { r.joint = i === 1 && Math.abs(ranked[0].deficit - r.deficit) <= 3; });
    
    return {
      rows,
      ranked,
      overall,
      band: overall === null ? null : BANDS.find((b) => overall >= b.min),
      wLabel: w.label,
      answered: Object.values(answers).filter((a) => !a.na).length
    };
  };

  const handleExport = () => {
    const r = compute();
    const payload = {
      instrument: "Pivot Prime Operational Constraint Diagnostic",
      version: "1.0",
      completedAt: new Date().toISOString(),
      meta,
      weighting: r.wLabel,
      overall: r.overall,
      band: r.band ? r.band.n : null,
      domains: r.rows,
      constraintRanking: r.ranked.map((x) => ({ domain: x.name, score: x.score, weight: Math.round(x.weight), weightedDeficit: x.deficit })),
      // Keyed by the stable, spec-derived statement id rather than by the
      // position it happened to render at. Presentation order is randomised
      // within each domain per session, so a positional key would label the
      // same answer differently between two runs and quietly break both
      // re-run comparison and the twelve short-instrument anchors.
      answers: Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [
          questions[+k].id,
          v.na ? "n/a" : v.v,
        ]),
      ),
      freeText: Object.fromEntries(FREETEXT.map((q, i) => [q, textAnswers[i]]))
    };
    
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (meta.biz || "diagnostic").toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-constraint-diagnostic.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-50 bg-[#013325] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-3.5 flex justify-between items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 font-sans font-semibold text-[17px] tracking-tight text-white hover:text-white/80">
            <span className="grid grid-cols-4 gap-[2.5px]">
              {[...Array(12)].map((_, i) => (
                <i key={i} className={`w-[3px] h-[3px] rounded-full ${i % 4 === 3 ? "bg-white/35" : "bg-[#00d76d]"}`} />
              ))}
            </span>
            PivotPrime
          </Link>
          <div className="font-sans font-semibold text-[11px] tracking-[0.18em] uppercase text-[#8fb3a4] text-right truncate">
            {stepText}
          </div>
        </div>
        <div className="h-[3px] bg-white/10">
          <div className="h-full bg-[#00d76d] transition-all duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-grow">
        {step === 0 && (
          <section className="bg-[#013325] text-white relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center py-10 sm:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:26px_26px] opacity-55" />
            <div className="absolute w-[60vw] h-[60vw] -right-[20vw] -top-[24vw] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.2),transparent_62%)]" />
            
            <div className="max-w-4xl mx-auto px-4 md:px-10 relative z-10 w-full animate-fade-in">
              <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d]">
                The full instrument
              </span>
              <h1 className="text-[clamp(32px,5.2vw,54px)] font-bold tracking-tight mt-5 mb-0 font-sans leading-[1.14]">
                Operational Constraint<br/><span className="text-[#00d76d]">Diagnostic.</span>
              </h1>
              <p className="text-[#bfd8cd] mt-5 text-[17px] max-w-2xl">
                Forty-two statements across six areas of the business, weighted for your size, producing a ranked view of what is limiting growth and the order in which to fix it.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
                <div className="bg-white/5 border border-white/15 rounded-xl p-4">
                  <b className="block font-sans font-bold text-[22px] text-[#00d76d] tracking-tight">42</b>
                  <span className="text-[12.5px] text-[#a9c8ba]">Statements across six areas</span>
                </div>
                <div className="bg-white/5 border border-white/15 rounded-xl p-4">
                  <b className="block font-sans font-bold text-[22px] text-[#00d76d] tracking-tight">20 min</b>
                  <span className="text-[12.5px] text-[#a9c8ba]">Six short sections</span>
                </div>
                <div className="bg-white/5 border border-white/15 rounded-xl p-4">
                  <b className="block font-sans font-bold text-[22px] text-[#00d76d] tracking-tight">Ranked</b>
                  <span className="text-[12.5px] text-[#a9c8ba]">All six constraints, in order</span>
                </div>
              </div>

              <form onSubmit={handleStart} className="mt-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block font-sans font-semibold text-[11px] tracking-[0.14em] uppercase text-[#00d76d] mb-1.5">Business name</span>
                    <input type="text" required value={meta.biz} onChange={(e) => setMeta({ ...meta, biz: e.target.value })} className="w-full font-sans text-[15.5px] text-white bg-white/5 border border-white/15 rounded-lg px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00d76d]" placeholder="Business name" />
                  </label>
                  <label className="block">
                    <span className="block font-sans font-semibold text-[11px] tracking-[0.14em] uppercase text-[#00d76d] mb-1.5">Your name</span>
                    <input type="text" required value={meta.who} onChange={(e) => setMeta({ ...meta, who: e.target.value })} className="w-full font-sans text-[15.5px] text-white bg-white/5 border border-white/15 rounded-lg px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00d76d]" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="block font-sans font-semibold text-[11px] tracking-[0.14em] uppercase text-[#00d76d] mb-1.5">Your role</span>
                    <select value={meta.role} onChange={(e) => setMeta({ ...meta, role: e.target.value })} className="w-full font-sans text-[15.5px] text-white bg-white/5 border border-white/15 rounded-lg px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00d76d] [&>option]:text-black">
                      <option value="leadership">Founder or leadership team</option>
                      <option value="team">Team, manager or specialist</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block font-sans font-semibold text-[11px] tracking-[0.14em] uppercase text-[#00d76d] mb-1.5">Size of business</span>
                    <select value={meta.preset} onChange={(e) => setMeta({ ...meta, preset: e.target.value })} className="w-full font-sans text-[15.5px] text-white bg-white/5 border border-white/15 rounded-lg px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#00d76d] [&>option]:text-black">
                      {Object.entries(WEIGHTS).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
                
                <div className="mt-7">
                  <button type="submit" className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl px-6 py-3.5 hover:bg-white hover:-translate-y-0.5 transition-all">
                    Begin
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-5 border-t border-white/15 text-[13.5px] text-[#8fb3a4] max-w-2xl">
                Size sets how the six areas are weighted: founder dependency matters far more in an eight-person business than in a two-hundred-person one. Answer as things are, not as they should be. Individual answers are held by Pivot Prime and are not shared with anyone else in your business.
              </div>
            </div>
          </section>
        )}

        {step > 0 && step <= PAGES && (() => {
          const pi = step - 1;
          const from = pi * PER_PAGE;
          const to = Math.min(from + PER_PAGE, questions.length);
          const currentQuestions = questions.slice(from, to);

          return (
            <main className="py-10 md:py-16 max-w-4xl mx-auto px-4 md:px-10">
              <section className="animate-fade-in">
                <div className="flex justify-between items-end gap-5 flex-wrap mb-2">
                  <div>
                    <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
                      Section {step} of {PAGES}
                    </span>
                    <h2 className="text-[clamp(24px,3.2vw,34px)] font-bold mt-2.5 text-[#0c1a15]">
                      {PAGE_TITLES[pi]}
                    </h2>
                  </div>
                  <div className="font-sans font-bold text-[44px] text-[#e3eae6] tracking-tight leading-none">
                    {String(step).padStart(2, '0')}
                  </div>
                </div>
                
                <p className="text-[#5e6f68] mb-7 max-w-2xl">
                  Seven statements on this one area. Answer on instinct rather than deliberating.
                </p>

                <div className="space-y-3">
                  {currentQuestions.map((q, idx) => {
                    const globalIdx = from + idx;
                    const a = answers[globalIdx];
                    return (
                      <div key={globalIdx} id={`card${globalIdx}`} className={`card-dark border rounded-xl p-5 md:p-6 transition-colors ${a ? "border-[#cfe3d8]" : "border-[#e3eae6]"}`}>
                        <div className="flex gap-3 items-start mb-4">
                          <div className="font-sans font-bold text-[11.5px] tracking-[0.14em] text-[#af8943] pt-1 w-7 shrink-0">
                            {String(globalIdx + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="text-[16.5px] font-medium text-[#0c1a15] max-w-2xl">
                              {q.t}
                            </div>
                            <span className="inline-block text-[11px] tracking-[0.1em] uppercase text-[#5e6f68] card-dark border border-[#e3eae6] rounded-xl px-2.5 py-1 mt-2">
                              {D[q.d]}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 md:pl-10">
                          {SCALE.map((o, oi) => (
                            <label key={oi} className="relative group">
                              <input 
                                type="radio" 
                                name={`q${globalIdx}`} 
                                value={oi} 
                                checked={a?.oi === oi}
                                onChange={() => {
                                  setAnswers({ ...answers, [globalIdx]: { oi, v: o.v, na: !!o.na, dk: !!o.dk } });
                                  setHint("");
                                }}
                                className="absolute opacity-0 w-0 h-0 peer"
                              />
                              <span className={`block cursor-pointer text-[13.5px] px-3.5 py-2 border rounded-full select-none transition-all
                                ${a?.oi === oi 
                                  ? (o.na ? "bg-[#5e6f68] border-[#5e6f68] text-white" : o.dk ? "bg-[#af8943] border-[#af8943] text-white" : "bg-[#013325] border-[#013325] text-white") 
                                  : "surface-page border-[#e3eae6] text-[#0c1a15] hover:border-[#009f50] peer-focus-visible:ring-2 peer-focus-visible:ring-[#00d76d]"
                                }
                              `}>
                                {o.t}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 mt-8 flex-wrap">
                  <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-transparent border border-[#e3eae6] text-[#0c1a15] rounded-xl px-6 py-3.5 hover:border-[#013325] transition-all">
                    Back
                  </button>
                  <button onClick={handleNextPage} className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-[#009f50] text-white rounded-xl px-6 py-3.5 hover:bg-[#013325] hover:-translate-y-0.5 transition-all">
                    {pi === PAGES - 1 ? "Continue to open questions" : "Next section"}
                  </button>
                  {hint && <span className="text-[13.5px] text-[#af8943] font-medium">{hint}</span>}
                </div>
              </section>
            </main>
          );
        })()}

        {step === PAGES + 1 && (
          <main className="py-10 md:py-16 max-w-4xl mx-auto px-4 md:px-10">
            <section className="animate-fade-in">
              <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
                Four open questions
              </span>
              <h2 className="text-[clamp(24px,3.2vw,34px)] font-bold mt-2.5 mb-3 text-[#0c1a15]">
                In your own <span className="text-[#009f50]">words.</span>
              </h2>
              <p className="text-[#5e6f68] mb-7 max-w-2xl">
                Optional, but the result is materially more useful when they are answered. The gap between what you believe is wrong and what the scores say is usually the most productive thing in the report.
              </p>

              <div className="space-y-6">
                {FREETEXT.map((q, idx) => (
                  <div key={idx}>
                    <div className="font-sans font-semibold text-[16.5px] mb-2 text-[#0c1a15]">{q}</div>
                    <textarea 
                      value={textAnswers[idx]}
                      onChange={(e) => {
                        const newT = [...textAnswers];
                        newT[idx] = e.target.value;
                        setTextAnswers(newT);
                      }}
                      className="w-full font-sans text-[15.5px] text-[#0c1a15] card-dark border border-[#e3eae6] rounded-xl px-4 py-3 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-[#009f50]" 
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-8 flex-wrap">
                <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-transparent border border-[#e3eae6] text-[#0c1a15] rounded-xl px-6 py-3.5 hover:border-[#013325] transition-all">
                  Back
                </button>
                <button onClick={() => setStep(step + 1)} className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-[#009f50] text-white rounded-xl px-6 py-3.5 hover:bg-[#013325] hover:-translate-y-0.5 transition-all">
                  See the result
                </button>
              </div>
            </section>
          </main>
        )}

        {step > PAGES + 1 && (() => {
          const r = compute();
          const primary = r.ranked[0];
          const c = primary ? COMMENTARY[primary.d] : null;
          const maxDef = r.ranked.length ? r.ranked[0].deficit : 1;

          return (
            <main className="py-10 md:py-16 max-w-4xl mx-auto px-4 md:px-10">
              <section className="animate-fade-in">
                <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50] print:hidden">
                  The result
                </span>
                <h2 className="text-[clamp(24px,3.2vw,34px)] font-bold mt-2.5 mb-1.5 text-[#0c1a15]">
                  {meta.biz ? meta.biz : "Your business"}
                </h2>
                <p className="text-[#5e6f68] text-[14px] mb-6">
                  {meta.who ? `${meta.who} · ` : ""}{meta.role === "leadership" ? "Leadership" : "Team"} · {r.wLabel} · {r.answered} of 42 statements scored
                </p>

                <div className="bg-[#013325] text-white rounded-xl p-8 md:p-10 flex gap-7 items-center flex-wrap mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
                  
                  <div className="font-sans font-bold text-[62px] leading-none text-[#00d76d] tracking-tight relative z-10">
                    {r.overall !== null ? r.overall : "n/a"}
                    <em className="block not-italic font-semibold text-[10.5px] tracking-[0.18em] uppercase text-[#8fb3a4] mt-1.5">
                      out of 100
                    </em>
                  </div>
                  <div className="flex-1 min-w-[230px] relative z-10">
                    <div className="font-sans font-bold text-[25px] tracking-tight mb-2">
                      {r.band ? r.band.n : "Not enough data"}
                    </div>
                    <p className="text-[#c9e0d6] text-[15px] m-0">
                      {r.band ? r.band.l : "Too many statements were marked not applicable to produce a score."}
                    </p>
                  </div>
                </div>

                <h3 className="text-[19px] font-bold mb-4 text-[#0c1a15]">The six areas</h3>
                <div className="space-y-4">
                  {r.rows.map((row, i) => {
                    const isPrimary = primary && row.d === primary.d;
                    if (row.insufficient) {
                      return (
                        <div key={i} className="mb-3.5">
                          <div className="flex justify-between items-baseline mb-1.5">
                            <span className="font-sans font-semibold text-[14.5px] text-[#0c1a15]">{row.name}</span>
                            <span className="font-sans font-medium text-[12.5px] text-[#5e6f68]">Insufficient data</span>
                          </div>
                          <div className="h-2 bg-[#e3eae6] rounded-full overflow-hidden" />
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="mb-3.5">
                        <div className="flex justify-between items-baseline mb-1.5">
                          <span className="font-sans font-semibold text-[14.5px] text-[#0c1a15]">{row.name}</span>
                          <span className={`font-sans font-bold text-[14.5px] ${isPrimary ? "text-[#af8943]" : "text-[#009f50]"}`}>
                            {row.score}
                          </span>
                        </div>
                        <div className="h-2 bg-[#e3eae6] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${isPrimary ? "bg-[#af8943]" : "bg-[#009f50]"}`} 
                            style={{ width: `${row.score}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="text-[19px] font-bold mt-7 sm:mt-10 mb-2 text-[#0c1a15]">Constraint ranking</h3>
                <p className="text-[#5e6f68] text-[14.5px] mb-4 max-w-3xl">
                  Ranked by weighted deficit rather than lowest score. An area scoring 40 at a weight of 25 holds the business back more than one scoring 30 at a weight of 5. This order is the recommended sequence of work.
                </p>

                <div className="border border-[#e3eae6] rounded-xl overflow-hidden card-dark">
                  {r.ranked.map((row, i) => (
                    <div key={i} className={`grid grid-cols-[34px_1fr_104px] gap-4 items-center p-4 border-t border-[#e3eae6] first:border-0 ${i === 0 ? "bg-[#efe7d8]" : ""}`}>
                      <div className={`font-sans font-bold text-[15px] ${i === 0 ? "text-[#013325]" : "text-[#af8943]"}`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-sans font-semibold text-[15px] text-[#0c1a15]">
                          {row.name}{row.joint ? " (joint)" : ""}
                        </div>
                        <div className="text-[12.5px] text-[#5e6f68]">
                          Score {row.score} &middot; weight {Math.round(row.weight)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-sans font-bold text-[16px] text-[#af8943]">{row.deficit}</div>
                        <div className="h-[5px] bg-[#e3eae6] rounded-sm mt-1.5 overflow-hidden">
                          <div className="h-full bg-[#af8943] rounded-sm" style={{ width: `${maxDef ? Math.round((row.deficit / maxDef) * 100) : 0}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {c && primary && (
                  <div className="bg-[#efe7d8] rounded-xl p-7 my-8">
                    <div className="font-sans font-semibold text-[11px] tracking-[0.16em] uppercase text-[#6b5a3c] mb-2">
                      Your primary constraint
                    </div>
                    <h3 className="text-[22px] font-bold text-[#013325] mb-2.5">
                      {primary.name} &middot; scored {primary.score}
                    </h3>
                    <p className="font-sans font-semibold text-[#013325] mb-2.5">
                      {c.line}
                    </p>
                    <p className="text-[#5a4d38] text-[15.5px] m-0">
                      {c.body}
                    </p>
                  </div>
                )}

                {textAnswers.some(t => t.trim()) && (
                  <>
                    <h3 className="text-[19px] font-bold mt-8 mb-4 text-[#0c1a15]">What you told us</h3>
                    <dl className="mt-5 space-y-5">
                      {FREETEXT.map((q, i) => textAnswers[i].trim() ? (
                        <div key={i}>
                          <dt className="font-sans font-semibold text-[14.5px] text-[#009f50] mb-1">{q}</dt>
                          <dd className="m-0 pl-4 border-l-2 border-[#e3eae6] whitespace-pre-wrap text-[15.5px] text-[#0c1a15]">
                            {textAnswers[i]}
                          </dd>
                        </div>
                      ) : null)}
                    </dl>
                  </>
                )}

                {c && (
                  <div className="bg-[#02291e] text-white rounded-xl p-8 mt-8 print:hidden">
                    <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d]">
                      What we would do
                    </span>
                    <h3 className="text-[21px] font-bold text-white mt-3 mb-2.5">
                      Start with the {c.svc}
                    </h3>
                    <p className="text-[#bfd8cd] text-[15.5px] mb-5">
                      On these findings, that is the engagement the result actually justifies. Everything below it in the ranking gets easier once this one moves.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href={WHATSAPP_URL} className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl px-6 py-3.5 hover:bg-white hover:-translate-y-0.5 transition-all">
                        {WHATSAPP_CTA.label}
                      </a>
                      <Link href="/services" className="inline-flex items-center gap-2 font-sans font-semibold text-[15px] bg-transparent border border-white/30 text-white rounded-xl px-6 py-3.5 hover:border-white transition-all">
                        See what the audit covers
                      </Link>
                    </div>
                  </div>
                )}

                <div className="text-[13px] text-[#5e6f68] mt-8 pt-5 border-t border-[#e3eae6]">
                  Scoring is deterministic: the same answers always produce the same result, so this score can be compared against a later one. Where several people in the same business complete the diagnostic, only the aggregate is shared.
                </div>

                <div className="flex gap-3 mt-8 print:hidden flex-wrap">
                  <button onClick={() => window.print()} className="inline-flex items-center font-sans font-semibold text-[15px] bg-[#009f50] text-white rounded-xl px-6 py-3 hover:bg-[#013325] transition-colors">
                    Save as PDF
                  </button>
                  <button onClick={handleExport} className="inline-flex items-center font-sans font-semibold text-[15px] bg-transparent border border-[#e3eae6] text-[#0c1a15] rounded-xl px-6 py-3 hover:border-[#013325] transition-colors">
                    Download the data
                  </button>
                  <button onClick={() => { setStep(0); setAnswers({}); setTextAnswers(["", "", "", ""]); }} className="inline-flex items-center font-sans font-semibold text-[15px] bg-transparent border border-[#e3eae6] text-[#0c1a15] rounded-xl px-6 py-3 hover:border-[#013325] transition-colors">
                    Start again
                  </button>
                </div>
              </section>
            </main>
          );
        })()}
      </div>
    </>
  );
}
