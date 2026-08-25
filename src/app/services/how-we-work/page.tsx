import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/content/metadata";
import { HOW_WE_WORK_PUBLISHED } from "@/lib/flags";
import { CONTACT_CTA } from "@/content/cta";

export const metadata: Metadata = pageMetadata("howWeWork");


export default function WhatWeDo() {
  if (!HOW_WE_WORK_PUBLISHED) notFound();

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16 overflow-x-clip">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 tracking-tight leading-tight">
          How we work
        </h1>
        {/* AUTHORED. It read "It's about doing what works", which asserts without
            saying what the page is, so the first quotable line under the H1 told a
            reader nothing. PENDING-COPY 1r. */}
        <p className="text-2xl md:text-3xl text-mid font-semibold mb-6">
          How an engagement actually runs, from the first conversation to the point where the
          change holds without us.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
          At Pivot Prime, we help uncover what’s blocking progress, we align your teams and we turn strategy in to real results. <span className="text-primary font-bold">Without the fluff.</span>
        </p>
      </section>

      {/* Core Focus Areas */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">What we do:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Box 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Turn plans into outcomes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Help teams translate strategy into clear actions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Set decision rights, success standards, and operating rhythm so progress does not depend on one person pushing.</span>
                </li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Make the business run cleanly.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Fix broken processes and unclear ownership.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Remove slow decisions, wasted time, and duplicated effort so work moves without friction.</span>
                </li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Make data useful, not overwhelming.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Help teams capture the right data at source by redesigning workflows, decision points, and accountability.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Clean, structure, and visualise it so leaders can trust what they are seeing and act with confidence.</span>
                </li>
              </ul>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ul className="space-y-6 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Build cultures that support performance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Clarify expectations, standards, and accountability.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 text-2xl">•</span>
                  <span>Help teams work with trust, pace, and ownership instead of burnout or confusion.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-forest text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
            Most consultants stop at strategy.<br/>
            We step into the messy middle and help you execute, adapt, and move the business forward.
          </h2>
          <p className="text-xl md:text-2xl text-primary font-medium mb-16">
            Businesses don’t need more ideas, they need results. With Pivot Prime you get real support, real momentum, and real results.
          </p>

          <div className="bg-white/5 border border-white/[0.14] rounded-3xl p-10 md:p-16">
            <h3 className="text-6xl md:text-8xl font-bold text-primary mb-4">90%</h3>
            <p className="text-xl font-medium mb-4">of senior executives say they miss goals due to poor execution*</p>
            <p className="text-sm text-gray-400">*Source: Robert S. Kaplan, David P. Norton, Balanced Scorecard</p>
          </div>
        </div>
      </section>

      {/* The Method Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">The Pivot Prime Method</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            We focus on what actually moves the business.<br/>
            You can bring us in for the full journey or for a single step, we meet you where you need us most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Method 1 */}
          <div className="border-t-4 border-primary pt-8">
            <h3 className="text-4xl font-extrabold text-gray-200 mb-2">01.</h3>
            <h4 className="text-2xl font-bold mb-4">Discover</h4>
            <h5 className="text-lg font-bold text-primary mb-6">See what is really holding you back.</h5>
            <p className="text-gray-600 mb-6">We go inside the business to understand how it truly runs.</p>
            <ul className="space-y-2 text-gray-600 font-medium mb-6">
              <li>• Structure and roles</li>
              <li>• How decisions are made</li>
              <li>• How work flows day to day</li>
              <li>• Where time and effort are lost</li>
            </ul>
            <p className="text-gray-600 mb-6">This includes real conversations, process mapping, and close observation when needed.</p>
            <p className="text-black font-bold">You can stop here if clarity is what you need first.</p>
          </div>

          {/* Method 2 */}
          <div className="border-t-4 border-primary pt-8">
            <h3 className="text-4xl font-extrabold text-gray-200 mb-2">02.</h3>
            <h4 className="text-2xl font-bold mb-4">Design</h4>
            <h5 className="text-lg font-bold text-primary mb-6">Decide what to fix and how.</h5>
            <p className="text-gray-600 mb-6">We design a plan with both quick wins and long term moves:</p>
            <ul className="space-y-2 text-gray-600 font-medium mb-6">
              <li>• What matters now</li>
              <li>• What can wait</li>
              <li>• What will move results</li>
              <li>• Who owns each decision</li>
            </ul>
            <p className="text-gray-600 mb-6">Plans are built for your people, pace, and reality.</p>
            <p className="text-black font-bold">You can start at this phase if the problems are already clear.</p>
          </div>

          {/* Method 3 */}
          <div className="border-t-4 border-primary pt-8">
            <h3 className="text-4xl font-extrabold text-gray-200 mb-2">03.</h3>
            <h4 className="text-2xl font-bold mb-4">Deliver</h4>
            <h5 className="text-lg font-bold text-primary mb-6">Ensure there are measurable results.</h5>
            <p className="text-gray-600 mb-6">We stay with you as plans turn into action.</p>
            <ul className="space-y-2 text-gray-600 font-medium mb-6">
              <li>• Execution support alongside your team</li>
              <li>• Help hiring or reshaping roles</li>
              <li>• Ongoing check-ins and accountability</li>
            </ul>
            <p className="text-gray-600 mb-6">We stay until progress is visible.</p>
            <p className="text-black font-bold">You can bring us in just for delivery if needed.</p>
          </div>

        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">People, roles, and ways of working must support it.</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We can diagnose the right problems and design the right plan, but delivery only happens when people understand the strategy, trust the decisions behind it, and see how their work connects. That is why leadership, decision-making, and ways of working matter; they determine whether plans move forward or stall.
            </p>
            <p className="text-xl font-bold text-primary">
              Underpinning the Pivot Prime Method are two execution pillars that ensure delivery holds in the real world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Executive coaching and leadership labs</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We work with leaders to strengthen judgment under pressure, improve how they show up with others, and make decisions that translate into action. Sessions are tailored to the person, the role, and the context they are operating in.
                </p>
                <p className="text-black font-medium mb-8">
                  Designed for founders, senior leaders, and managers navigating complex decisions and people dynamics.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 font-bold uppercase text-white bg-primary hover:bg-mid/90 transition-colors rounded-md shadow w-fit">
                {CONTACT_CTA.label}
              </Link>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Team building workshops and communication labs</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We run practical sessions that improve how teams communicate, make decisions, and work together under pressure. Our approach draws on behavioural and personality assessments, neuroscience, and organisational psychology to help teams understand how they think, react, and interact at work.
                </p>
                <p className="text-black font-medium mb-8">
                  When teams struggle to work well together, progress slows and effort is wasted.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 font-bold uppercase text-white bg-primary hover:bg-mid/90 transition-colors rounded-md shadow w-fit">
                {CONTACT_CTA.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Steps Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Strategy sets direction, but execution is what creates results
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            At Pivot Prime, we do not give advice and walk away, we work with you to understand what is blocking progress, agree what matters most, and act on it together.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            You may come to us at the start, in the middle, or under pressure. Wherever you are, we meet you there, define the work that will make the biggest difference, and stay with you as it gets done.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            We take responsibility for outcomes, not activity. That means agreeing what success looks like upfront, tracking progress along the way, and ensuring the work leads to measurable results you can see in performance, profit, or cost control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">01.</div>
            <h4 className="text-xl font-bold mb-4">What is blocking progress</h4>
            <p className="text-gray-600 mb-6 text-sm">A short assessment that surfaces the real constraints in the business, not surface symptoms, and focuses attention on what is actually slowing results.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> Clarity on the true blockers to performance.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">02.</div>
            <h4 className="text-xl font-bold mb-4">First conversation</h4>
            <p className="text-gray-600 mb-6 text-sm">A focused conversation to understand your context, pressure points, and goals, and to determine whether working together is the right next step.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> Clear alignment on the problem, the ambition, and whether Pivot Prime is the right fit.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">03.</div>
            <h4 className="text-xl font-bold mb-4">Discover through a deep diagnostic</h4>
            <p className="text-gray-600 mb-6 text-sm">We examine strategy, operations, structure, culture, people, and numbers to identify where work is breaking down and where effort is not translating into results.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> A clear, in-depth view of strengths, weaknesses, and the true sources of friction in the business.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">04.</div>
            <h4 className="text-xl font-bold mb-4">Design the action plan</h4>
            <p className="text-gray-600 mb-6 text-sm">A focused plan that sets priorities, ownership, and sequencing, balancing immediate improvements with decisions that strengthen performance over time.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> A practical plan built for execution and results, not presentation.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">05.</div>
            <h4 className="text-xl font-bold mb-4">Deliver with hands-on support</h4>
            <p className="text-gray-600 mb-6 text-sm">We work alongside you and your team to turn the plan into action, remove obstacles, and maintain momentum through delivery.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> Progress you can see and measure, whether that is revenue growth, improved margins, or a more controlled and effective operation.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-4xl font-extrabold text-primary mb-4 opacity-50">06.</div>
            <h4 className="text-xl font-bold mb-4">Sustained results</h4>
            <p className="text-gray-600 mb-6 text-sm">A business that runs with clarity and control delivers stronger financial performance, and gives leaders confidence that effort and decisions are producing real outcomes.</p>
            <p className="font-bold text-sm"><span className="text-primary">Outcome:</span> Long term momentum, confidence, and a sustained strategic edge.</p>
          </div>
        </div>

        {/* Spec 4.6 routing block, at the end of the Pathway. */}
        <div className="mx-auto mb-12 max-w-3xl rounded-xl border border-forest/10 bg-forest/[0.04] p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-forest">Where this starts</h3>
          <p className="mb-6 leading-relaxed text-neutral-600">
            Almost every engagement begins with an Operational Clarity Audit, because we will not
            take responsibility for outcomes in a business we have not properly diagnosed.
          </p>
          <Link
            href="/services/operational-clarity-audit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-mid/90"
          >
            See what the audit covers
            <span aria-hidden="true" className="ml-2 text-lg leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="text-center bg-forest text-white p-12 md:p-20 rounded-3xl">
          <h3 className="text-3xl md:text-5xl font-extrabold mb-10 leading-tight">
            Stop guessing what is holding growth back,<br/>
            start with a proper diagnosis.
          </h3>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 font-bold tracking-wide uppercase text-white bg-primary hover:bg-neon/90 transition-colors rounded-md shadow-lg group">
            Book your first conversation <span className="ml-2 font-normal text-xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
