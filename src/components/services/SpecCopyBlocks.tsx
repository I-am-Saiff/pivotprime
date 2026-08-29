import type { ServiceDetailCard } from "@/content/services-detail";
import { CONTACT_CTA as SIGN_OFF_CTA } from "@/content/cta";

/**
 * Presentation for spec copy the designed pages omitted.
 *
 * Deliberately plain, and deliberately placed below the designed sections rather
 * than replacing them. The design survives, the copy is restored, and Iram can
 * see both when she reviews.
 */

export function CopyProse({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-forest md:text-3xl">{heading}</h2>
      <div className="space-y-5">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="leading-relaxed text-forest/70">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export function CopyCards({ heading, cards }: { heading: string; cards: ServiceDetailCard[] }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-8 text-2xl font-bold text-forest md:text-3xl">{heading}</h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className="rounded-xl border border-forest/10 bg-shell p-7">
            <h3 className="mb-3 font-bold text-forest">{card.title}</h3>
            <p className="leading-relaxed text-forest/70">{card.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CopyList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-forest md:text-3xl">{heading}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-forest">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mid" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The sign-off at the foot of every service page.
 *
 * Restored on 29 August. Each page used to end with a closing section and a
 * call to action; the 28 August cut took the whole tail off all five and this
 * went with it. One shared component rather than five copies, so the five
 * cannot drift apart again, and it reads its label and destination from
 * src/content/cta.ts rather than holding a second copy of either.
 *
 * Deliberately light. She has said twice that boxes should not be dark green
 * across the site, so the sign-off sits on the page ground rather than becoming
 * a sixth dark panel.
 */
export function ServiceSignOff({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="surface-page px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-forest/10 bg-linen p-7 text-center sm:p-10">
        <h2 className="mb-3 text-2xl font-bold text-forest md:text-3xl">{heading}</h2>
        <p className="mx-auto mb-7 max-w-2xl leading-relaxed text-forest/75">{body}</p>
        <a
          href={SIGN_OFF_CTA.href}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-mid px-7 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-forest"
        >
          {SIGN_OFF_CTA.label}
        </a>
      </div>
    </section>
  );
}
