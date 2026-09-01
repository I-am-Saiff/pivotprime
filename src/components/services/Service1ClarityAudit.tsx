import { PairDark, PairLight, ServiceSignOff, TickList } from "./SpecCopyBlocks";
import { CLARITY_AUDIT, SERVICE_CLOSERS } from "@/content/services-detail";
import { WHATSAPP_URL } from "@/lib/flags";
import { WHATSAPP_CTA } from "@/content/cta";
import ClarityAuditProcessMap from "./ClarityAuditProcessMap";

export default function Service1ClarityAudit() {

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="bg-[#013325] text-white relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-16 md:pt-40 md:pb-24">
        {/* Pattern Background */}
        {/* The dot pattern was here. Removed from every service-page dark
            background on her 29 August instruction, item 3. */}
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HER HERO EYEBROW, restored 1 September. Her file opens every
              service page with one of these above the h1 and none of the five
              was on the site. No instruction of hers removed them, so their
              absence was ours. Neon rather than mid green because her own CSS
              says so: .eyebrow is mid, and .ondark .eyebrow is neon, and every
              one of these heroes is class="hero ondark" in her file. Same
              10.5px, 600 weight and 0.24em tracking the light-ground section
              eyebrows carried when this was written.

              THOSE SECTION EYEBROWS ARE SENTENCE CASE NOW, from 1 September, and
              these hero ones deliberately are not: they were in frame in the
              screenshots that asked for the change and were not among the lines
              picked out, so they keep the capitals until asked. PENDING-COPY
              1c7 and 1c9. */}
          <span className="mb-4 block font-sans text-[10.5px] font-semibold tracking-[0.24em] text-neon uppercase">
            Service one
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl font-sans text-white">
            Operational <span className="text-[#00d76d]">Clarity Audit.</span>
          </h1>
          <p className="text-[#bfd8cd] text-lg max-w-2xl">
            A structured diagnosis of what is actually limiting the business, and a prioritised plan for fixing it.
          </p>
          
          <div className="flex flex-wrap items-baseline gap-6 mt-8 pt-6 border-t border-white/20">
            <b className="font-sans font-bold text-2xl text-[#00d76d] tracking-tight">From AED 15,000</b>
            <span className="text-sm text-[#8fb3a4]">Typically 12 to 20 working days</span>
          </div>
          <p className="text-[14.5px] text-[#a9c8ba] mt-4 max-w-2xl">
            Scope depends on the size of the business, how many functions are in review, and how many people we interview.
          </p>
          <div className="mt-8">
            <a href={WHATSAPP_URL} className="inline-flex items-center px-6 py-3 font-semibold text-[15px] bg-[#00d76d] text-[#013325] rounded-xl hover:bg-white hover:-translate-y-0.5 transition-all">
              {WHATSAPP_CTA.label}
            </a>
          </div>
        </div>
      </header>

      {/* Stage / Map Section */}
      <ClarityAuditProcessMap />

      {/* FOUR BLOCKS RESTORED, 1 September, reversing the batch-two deletion.

          That deletion followed her 30 August wording exactly, which named
          "what we look at", "what you get", "how we do it" and pricing. It is
          reversed on Saif's ruling, because her file and that instruction
          contradict each other and she has since resent the file and said the
          service pages do not match it. The file wins. PENDING-COPY 1c7.

          HER STRUCTURE, READ FROM HER MARKUP RATHER THAN ASSUMED. Between the
          process map and the closer her page zero has two sections, each one a
          two-column `cols` row:

            <section>       .lab "What we look at" + .ticks | .lab "What you get" + .ticks
            <section paper> .lab "How we do it" + 2 <p>     | .notefit "What happens after"

          So both are pairs, and the 31 August left-white-right-dark rule
          applies: PairLight on the left, PairDark on the right, which is what
          the equivalent pairs already use on Fractional Leadership, Build and
          Place and UAE Market Entry. Her reading order within each pair is
          kept, so the white half is her left column in both.

          TickList onDark on the right-hand list, the same inversion Build and
          Place and UAE Market Entry use for a tick list on the dark half.

          THE COPY IS THE CONTENT FILE'S, NOT THE MOCKUP'S. CLARITY_AUDIT already
          holds all four blocks, and its strings are spec 4.1's, which run fuller
          than the abbreviated versions in the mockup: seven look-at points
          rather than six, and a longer "What happens after". Rendering what was
          preserved is what the brief asked for, and the spec is the copy source
          of record. PENDING-COPY 1c7 notes the difference.

          THE PRICING BLOCK STAYS OFF. It is not one of the four, it is not in
          her file, and its removal was separately confirmed as her instruction
          rather than ours. Its guard assertion stays in the absent list. */}
      <section className="surface-page px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-2 md:gap-6">
          <PairLight label={CLARITY_AUDIT.lookHeading} labelAs="h3">
            <TickList items={CLARITY_AUDIT.look} />
          </PairLight>
          <PairDark label={CLARITY_AUDIT.getHeading} labelAs="h3">
            <TickList items={CLARITY_AUDIT.get} onDark />
          </PairDark>
        </div>
      </section>

      <section className="surface-page px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-2 md:gap-6">
          <PairLight label={CLARITY_AUDIT.howHeading} labelAs="h3">
            <div className="space-y-3">
              {CLARITY_AUDIT.how.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-forest/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </PairLight>
          <PairDark label={CLARITY_AUDIT.afterHeading} labelAs="h3">
            <div className="space-y-3">
              {CLARITY_AUDIT.after.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-relaxed text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>
          </PairDark>
        </div>
      </section>

      <ServiceSignOff {...SERVICE_CLOSERS.clarityAudit} />
    </div>
  );
}
