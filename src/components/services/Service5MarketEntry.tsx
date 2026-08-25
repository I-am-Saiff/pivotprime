"use client";

import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import { MARKET_ENTRY } from "@/content/services-detail";
import { CopyList, CopyProse } from "./SpecCopyBlocks";


export default function Service5MarketEntry() {
  const [calMode, setCalMode] = useState<0 | 1>(0); // 0 = Home-market plan, 1 = Built for here

  // Representing the height percentages for each month.
  // Home-market plan is mostly flat. Built for here has dips.
  const CAL_DATA = [
    { m: "JAN", h0: 40, h1: 45, dip: false },
    { m: "FEB", h0: 42, h1: 48, dip: false },
    { m: "MAR", h0: 43, h1: 52, dip: false },
    { m: "APR", h0: 43, h1: 25, dip: true }, // Ramadan dip
    { m: "MAY", h0: 45, h1: 35, dip: false },
    { m: "JUN", h0: 46, h1: 20, dip: true }, // Summer dip
    { m: "JUL", h0: 48, h1: 15, dip: true }, // Summer dip
    { m: "AUG", h0: 50, h1: 15, dip: true }, // Summer dip
    { m: "SEP", h0: 51, h1: 40, dip: false },
    { m: "OCT", h0: 53, h1: 65, dip: false },
    { m: "NOV", h0: 55, h1: 85, dip: false }, // Q4 peak
    { m: "DEC", h0: 56, h1: 75, dip: false },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            UAE Market <span className="text-[#00d76d]">Entry.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            From licence to a functioning, properly priced operation.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">Scoped per engagement</b>
            <span className="text-sm text-[#8fb3a4]">Financial model built before anything else</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Priced on the entity structure, whether the products need regulatory approval, and how much of the operation we build rather than advise on.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Stage / Map Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#009f50]">
              The misconception
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#0c1a15]">
              A plan built on twelve even months <span className="text-[#009f50]">will miss badly.</span>
            </h2>
            <p className="text-[#5e6f68] mt-3">
              Most businesses arrive with a home-market forecast. This market does not trade that way.
            </p>
          </div>

          <div className="bg-white border border-[#e3eae6] rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
            <div className="inline-flex bg-[#f7f9f8] border border-[#e3eae6] rounded-full p-1 gap-1 mb-6">
              <button
                onClick={() => setCalMode(0)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  calMode === 0 ? "bg-[#013325] text-white" : "text-[#5e6f68] hover:bg-[#e3eae6]"
                }`}
              >
                Home-market plan
              </button>
              <button
                onClick={() => setCalMode(1)}
                className={`px-4 py-2 font-semibold text-[13px] rounded-full transition-colors ${
                  calMode === 1 ? "bg-[#013325] text-white" : "text-[#5e6f68] hover:bg-[#e3eae6]"
                }`}
              >
                Built for here
              </button>
            </div>

            <div className="h-[190px] grid grid-cols-12 gap-1 md:gap-[6px] items-end pb-6 border-b border-[#e3eae6]">
              {CAL_DATA.map((d, i) => {
                const h = calMode === 0 ? d.h0 : d.h1;
                const isDip = calMode === 1 && d.dip;
                return (
                  <div key={i} className="relative flex flex-col justify-end h-full">
                    <div 
                      className={`rounded-t-sm md:rounded-t-md transition-all duration-[900ms] ease-[cubic-bezier(.6,.02,.2,1)] ${isDip ? "bg-[#af8943]" : "bg-[#009f50]"}`}
                      style={{ height: `${h}%` }}
                    />
                    <div className="text-center font-sans font-semibold text-[8.5px] md:text-[10px] text-[#5e6f68] mt-2 tracking-[0.04em] absolute -bottom-6 left-0 right-0">
                      {d.m}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mt-10 min-h-[60px]">
              <span className={`text-[12.5px] text-[#5e6f68] border border-[#e3eae6] rounded-full px-3.5 py-1.5 transition-all duration-[450ms] ${calMode === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 absolute pointer-events-none'}`}>
                <b className="text-[#af8943] font-sans font-semibold">Ramadan</b> reshapes trading for a month
              </span>
              <span className={`text-[12.5px] text-[#5e6f68] border border-[#e3eae6] rounded-full px-3.5 py-1.5 transition-all duration-[450ms] delay-75 ${calMode === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 absolute pointer-events-none'}`}>
                <b className="text-[#af8943] font-sans font-semibold">Summer</b> takes a large part of your customer base out of the country
              </span>
              <span className={`text-[12.5px] text-[#5e6f68] border border-[#e3eae6] rounded-full px-3.5 py-1.5 transition-all duration-[450ms] delay-150 ${calMode === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 absolute pointer-events-none'}`}>
                <b className="text-[#af8943] font-sans font-semibold">Heat</b> changes logistics, storage and footfall for half the year
              </span>
              <span className={`text-[12.5px] text-[#5e6f68] border border-[#e3eae6] rounded-full px-3.5 py-1.5 transition-all duration-[450ms] delay-200 ${calMode === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5 absolute pointer-events-none'}`}>
                <b className="text-[#af8943] font-sans font-semibold">Q4</b> has to carry what the rest of the year cannot
              </span>
            </div>
            
            <p className="text-[14px] text-[#5e6f68] mt-6 min-h-[44px] max-w-2xl">
              A flat forecast assumes every month behaves the same way. Press the toggle to see what the year actually looks like, and what it does to a plan built elsewhere.
            </p>
          </div>
        </div>
      </section>

      {/* Columns Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              The numbers come first
            </div>
            <p className="text-[#0c1a15] mb-3">
              There are hundreds of company formation experts in Dubai who will get you a licence and sometimes a bank account. We support all of that, but the licence is where we start rather than where we stop.
            </p>
            <p className="text-[#0c1a15] mb-3">
              Before anything else we build a financial model with you: every assumption of the entry priced in, the investment required, the breakeven point and the expected return. We are not interested in beginning a UAE entry that will not make money in the UAE.
            </p>
            <p className="text-[#0c1a15]">
              This is where most international businesses go wrong. They price for this market using home-market assumptions and end up busy but unprofitable.
            </p>
          </div>
          <div>
            <div className="font-sans font-semibold text-[10.5px] tracking-[0.2em] uppercase text-[#af8943] mb-4">
              What we build
            </div>
            <ul className="space-y-3">
              {[
                "Entity structure, licensing and regulatory approvals",
                "A full financial model: investment, breakeven, return and local pricing",
                "Product and regulatory compliance, so what you sell can be sold here",
                "Commercial real estate and office fit-out",
                "Hiring, with local market HR expertise",
                "Manufacturing, logistics and supply chain",
                "Brand localisation and go-to-market",
                "The operating model, and the people to run it once you are live"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-[15.5px] text-[#0c1a15]">
                  <div className="w-[17px] h-[17px] rounded-full bg-[#009f50] flex-shrink-0 mt-1 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closer Section */}
      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#02291e] text-white rounded-xl p-8 md:p-12">
            <span className="block font-sans font-semibold text-[10.5px] tracking-[0.24em] uppercase text-[#00d76d] mb-4">
              Straight answer
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 max-w-lg text-white">
              We are not interested in launching a business in the UAE which will fail.
            </h3>
            <p className="text-[#bfd8cd] mb-8">
              If after assessment, we feel your business will fail here, we will tell you to save your money and not enter this market or most of the time we will show you how you can make it work.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
                {WHATSAPP_CTA.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spec 4.5, restored. The designed page compressed THE MISCONCEPTION to
          a single clause and dropped most of WHAT WE BUILD and the CLOSE. The
          design above is kept; this carries the copy the spec sets verbatim.
          See docs/PENDING-COPY.md. */}
      <section className="bg-white py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse
            heading={MARKET_ENTRY.misconceptionHeading}
            paragraphs={MARKET_ENTRY.misconception}
          />
        </div>
      </section>

      <section className="bg-[#f7f9f8] py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyList heading={MARKET_ENTRY.buildHeading} items={MARKET_ENTRY.build} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <CopyProse heading={MARKET_ENTRY.closeHeading} paragraphs={[MARKET_ENTRY.close]} />
        </div>
      </section>

    </div>
  );
}
