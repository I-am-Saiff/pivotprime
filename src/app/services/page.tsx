import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import { SERVICES_EYEBROW, SERVICES_HEADING, SERVICES_STANDFIRST } from "@/content/services";
import ServiceCards from "@/components/ServiceCards";

// Spec 4. The parent overview lists all five in spec order with the 3.4 card
// copy and a link each. Order is deliberate: the audit first because it is the
// entry point and the only priced offer, the retainer second because it is the
// destination. Do not alphabetise.
export const metadata: Metadata = pageMetadata("services");

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col surface-page">
      <section className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 md:pt-40 lg:px-8">
        <header className="mb-14 max-w-3xl md:mb-20">
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

        {/* The same component the homepage 3.4 section renders. Spec 4 defines
            this page as "a copy of the services section from the home page", so
            two implementations would drift. They did: this page kept its own
            grid until the heading-order check reported five H2 headings where
            the shared component renders card titles as H3. */}
        <ServiceCards headingLevel="h2" />
      </section>
    </div>
  );
}
