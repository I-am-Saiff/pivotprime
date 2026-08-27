import type { ServiceDetailCard } from "@/content/services-detail";

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
          <li key={card.title} className="rounded-xl border border-forest/10 surface-page p-7">
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
