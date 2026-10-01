import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { SERVICES_EYEBROW, SERVICES_HEADING, SERVICES_STANDFIRST } from "@/content/services";
import HomeServices from "@/components/HomeServices";

// Spec 4. The parent overview lists all five in spec order with the 3.4 card
// copy and a link each. Order is deliberate: the audit first because it is the
// entry point and the only priced offer, the retainer second because it is the
// destination. Do not alphabetise.
export const metadata: Metadata = pageMetadata("services");

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col surface-page">
      <section className="mx-auto w-full max-w-7xl px-4 pt-28 sm:pt-32 pb-14 sm:pb-24 sm:px-6 md:pt-40 lg:px-8">
        <header className="mb-9 sm:mb-14 max-w-3xl md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-mid uppercase">
            {SERVICES_EYEBROW}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {SERVICES_HEADING}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600 md:text-xl">
            {SERVICES_STANDFIRST}
          </p>
        </header>

        {/* HER v3 SLIDE 2: the same three cards and the same diagnostic panel
            as the homepage, from the same component.

            THIS PAGE SHOWED SIX CARDS AND SAID FIVE. Before this change it
            rendered ServiceCards: the Operational Clarity Audit, Fractional COO
            CFO and Chief of Staff, Build and Place, Technology Builds and UAE
            Market Entry, each with "Scoped per engagement" except the audit,
            plus the diagnostic as a sixth card inside the grid. Her note: "The
            page still says which of the five you actually need. Changing that
            word while the same page still lists five cards would contradict
            itself. Make /services render the same three cards and diagnostic
            panel as the homepage, from the same component, so the two cannot
            drift again."

            Spec 4 always defined this page as "a copy of the services section
            from the home page" with "no new copy needed for it", which is what
            this now is. The card titles are H2 here and H3 on the homepage,
            because here the page heading is the H1 and there would otherwise be
            no H2 at all, which skips a level.

            WHAT THIS PAGE NO LONGER LINKS DIRECTLY: /services/build-and-place
            and /services/uae-market-entry. Both are still live and still
            linked, one hop further on, from the UAE Market Entry block on the
            audit page and the Need other staff block on the fractional page,
            and both of those pages are linked from the cards above. Her slide
            listed this page as a third route to them, which it cannot be while
            it renders her three cards; PENDING-COPY 1f6 puts that back to
            her. */}
        <HomeServices headingLevel="h2" />
      </section>
    </div>
  );
}
