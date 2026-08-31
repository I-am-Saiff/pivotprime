import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/insights/CategoryFilter";
import SubscribeForm from "@/components/insights/SubscribeForm";
import { Segments } from "@/components/insights/Segments";
import {
  FEATURED,
  INSIGHTS_CTA,
  INSIGHTS_HERO,
  INSIGHTS_META,
  POSTS,
  POSTS_LABEL,
  SUBSCRIBE,
  TOPICS,
  TOPICS_LABEL,
} from "@/content/insights";
import { SITE_NAME, OG_IMAGE } from "@/content/metadata";

/**
 * Insights, built from the client's pp-insights_3.html of 29 August 2026.
 *
 * HER TITLE, DESCRIPTION AND KEYWORDS, VERBATIM. She has done the SEO work and
 * her file carries all three in its head, so they are passed straight through
 * rather than being rewritten through pageMetadata(), which holds our own
 * wording for every other page. The keywords tag is hers too. It carries no
 * ranking weight with Google and has not for years, but it is her file and
 * removing it is not our call to make silently.
 *
 * THE NOINDEX IS GONE. It was there because the page was a heading and two
 * sentences with no articles under it, which is a thin-content signal. There are
 * four articles now, so the reason has expired. The page is also back in the
 * main navigation and in the sitemap for the same reason. PENDING-COPY 1k.
 *
 * COLOUR MAPPING. Her file names five values that are not in the ten-colour
 * palette. Each is mapped to the nearest existing token, measured rather than
 * eyeballed, and the mapping is recorded in docs/PENDING-COPY.md:
 *   #f5f5f3 paper  -> .surface-page, the page ground        #f8f4ee   d 5.9
 *   #ffffff card   -> bg-shell                              #fefbf8   d 5.9
 *   #0a1a12 ink    -> text-foreground                       #000000   d 33
 *   #4a6657 muted  -> text-forest/75                        #40655a   d 10.2
 *   #dde6e0 line   -> border-forest/12                      #e0e3df   d 4.2
 *   #001f14 photo  -> bg-forest                             #013325   d 26.3
 * Her forest, neon and mid are already exact palette values and are unchanged.
 */
export const metadata: Metadata = {
  title: INSIGHTS_META.title,
  description: INSIGHTS_META.description,
  keywords: INSIGHTS_META.keywords,
  alternates: { canonical: "/insights" },
  openGraph: {
    title: INSIGHTS_META.title,
    description: INSIGHTS_META.description,
    url: "/insights",
    siteName: SITE_NAME,
    locale: "en_AE",
    type: "website",
    ...(OG_IMAGE ? { images: [OG_IMAGE] } : {}),
  },
  twitter: {
    card: OG_IMAGE ? "summary_large_image" : "summary",
    title: INSIGHTS_META.title,
    description: INSIGHTS_META.description,
  },
};

const DOT_GRID =
  "bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:26px_26px]";

export default async function InsightsPage({
  searchParams,
}: {
  /** Set by /api/insights when the form posts natively, with JavaScript off. */
  searchParams: Promise<{ subscribed?: string; error?: string }>;
}) {
  const { subscribed, error } = await searchParams;

  return (
    <div className="surface-page flex min-h-screen flex-col">
      {/* HERO */}
      <header className="relative overflow-hidden bg-forest px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-[76px] md:pt-40 lg:px-8">
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${DOT_GRID}`} />
        <div className="relative mx-auto grid max-w-[1060px] items-end gap-6 md:grid-cols-[1fr_auto] md:gap-10">
          <div>
            <p className="mb-[18px] text-[10px] font-bold tracking-[0.22em] text-neon/60 uppercase">
              {INSIGHTS_HERO.eyebrow}
            </p>
            <h1 className="text-[38px] leading-[1.05] font-extrabold tracking-[-0.028em] text-balance text-white sm:text-5xl lg:text-[68px]">
              <Segments segments={INSIGHTS_HERO.headline} />
            </h1>
          </div>
          {/* HER STANDFIRST, LEFT ALIGNED.
              
              Her file sets text-align:right on this column. Right-aligned prose
              puts the ragged edge on the left, so every line starts in a
              different place and the eye loses the return sweep. It also left
              "it." alone on the last line. The block still sits where she put
              it, flush right in the hero and bottom-aligned to the heading:
              md:ml-auto moves the box, the text inside it reads left.

              THE MEASURE IS IN ch, NOT px, so it stays a reading length rather
              than a number that happens to look right at one font size. Her
              260px is about 34 characters at this size, so this is her width
              expressed as what it was for.

              text-pretty asks the browser not to leave a single word on the
              last line. Chrome and Safari honour it; where it is not supported
              the paragraph simply wraps normally, so it costs nothing.

              SHOWN AT EVERY WIDTH, which her file does not do: it drops this
              column entirely below 720px. That hides the sentence that says
              what the whole page is from every phone. The grid is one column
              there, so it stacks under the heading. Say the word and the
              breakpoint goes back. */}
          <p className="max-w-[34ch] text-sm leading-[1.7] text-pretty text-white/45 md:ml-auto">
            {INSIGHTS_HERO.standfirst}
          </p>
        </div>
      </header>

      {/* Everything the filter acts on sits inside this wrapper. */}
      <div id="insights-list">
        <CategoryFilter targetId="insights-list" />

        {/* FEATURED */}
        <div data-post-group className="mx-auto w-full max-w-[1060px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-6 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
            {FEATURED.label}
          </p>
          <Link
            href={`/insights/${FEATURED.slug}`}
            data-post-tag={FEATURED.tag}
            className="grid overflow-hidden rounded-[22px] bg-forest shadow-[0_2px_24px_rgba(1,51,37,0.12)] transition-[box-shadow,transform] duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(1,51,37,0.22)] motion-reduce:transform-none lg:grid-cols-[1fr_400px]"
          >
            {/* Left: her photograph, with her quote over it. */}
            <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden bg-forest p-7 sm:min-h-[340px] sm:p-9 lg:border-r lg:border-white/8">
              <Image
                src={FEATURED.image}
                alt={FEATURED.imageAlt}
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(1,26,14,0.96)_0%,rgba(1,26,14,0.55)_55%,rgba(1,26,14,0.25)_100%)]"
              />
              <div className="relative z-10">
                <p className="mb-3.5 text-[9px] font-bold tracking-[0.22em] text-neon/60 uppercase">
                  {FEATURED.quoteLabel}
                </p>
                <p className="text-[18px] leading-[1.48] font-bold tracking-[-0.012em] text-balance text-white">
                  <Segments segments={FEATURED.quote} />
                </p>
              </div>
            </div>

            {/* Right: her article panel. */}
            <div className="flex flex-col justify-between bg-forest p-7 pb-9 sm:p-10 lg:px-11">
              <div>
                <p className="mb-4 text-[10px] font-bold tracking-[0.2em] text-neon/65 uppercase">
                  {FEATURED.tag}
                </p>
                <p className="mb-4 text-[22px] leading-[1.2] font-extrabold tracking-[-0.022em] text-balance text-white lg:text-[28px]">
                  {FEATURED.title}
                </p>
                <p className="mb-8 text-sm leading-[1.72] text-white/50">{FEATURED.deck}</p>
              </div>
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-neon/25 bg-neon/12 text-[10px] font-extrabold text-neon"
                  >
                    {FEATURED.authorInitials}
                  </span>
                  <span className="text-xs text-white/55">
                    <strong className="block font-semibold text-white/85">
                      {FEATURED.authorName}
                    </strong>
                    {FEATURED.authorMeta}
                  </span>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-[100px] bg-neon px-5 py-2.5 text-xs font-bold text-forest">
                  {FEATURED.cta}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* POST GRID */}
        <div data-post-group className="mx-auto w-full max-w-[1060px] px-4 pb-10 sm:px-6 sm:pb-16 lg:px-8">
          <p className="mb-6 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
            {POSTS_LABEL}
          </p>
          {/* THE LAST CARD SPANS THE ROW FROM 768 TO 1023, audit item 19. Three
              cards in the two-column band left the third alone beside 368px of
              empty grid at 768 and 401px at 834. md:col-span-2 fills that row
              and lg:col-span-1 hands it back at 1024, where three into three
              divides evenly.

              THREE COLUMNS AT 768 WAS THE OTHER OPTION and it measured worse:
              at 229px every byline breaks over two lines, and it sits on one
              line at every width the site currently renders, 309px at 1024
              included. The card is built for that width.

              Literal class strings, same reason as ServiceCards: Tailwind scans
              source text, so an interpolated span never gets generated. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                data-post-tag={post.tag}
                className={`group flex flex-col overflow-hidden rounded-[18px] border border-forest/12 bg-shell transition-[border-color,box-shadow] duration-250 hover:border-mid hover:shadow-[0_6px_28px_rgba(1,51,37,0.09)] ${
                  i === POSTS.length - 1 && POSTS.length % 2 === 1
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <div className="flex flex-1 flex-col px-6 pt-[26px] pb-5">
                  <p className="mb-3.5 text-[10px] font-bold tracking-[0.18em] text-mid uppercase">
                    {post.tag}
                  </p>
                  <p className="mb-3 flex-1 text-[17px] leading-[1.32] font-extrabold tracking-[-0.018em] text-balance text-forest">
                    {post.title}
                  </p>
                  <p className="text-[13px] leading-[1.68] text-forest/75">{post.deck}</p>
                </div>
                <div className="flex items-center justify-between border-t border-forest/12 px-6 py-[18px]">
                  <span className="flex items-center gap-[9px]">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-[9px] font-extrabold text-neon"
                    >
                      {post.authorInitials}
                    </span>
                    <span className="text-[11px] font-semibold text-forest/75">
                      {post.authorName}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-[11px] text-forest/75">
                    <span>{post.date}</span>
                    <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-forest/75" />
                    <span>{post.readTime}</span>
                    <span aria-hidden="true" className="text-sm font-bold text-mid">
                      {post.cta}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Only ever visible when the chosen category matches nothing. Outside
            both groups on purpose: a group is display:none in precisely the
            case this line exists for, so inside one it could never appear. In
            the served HTML at all times, hidden by CSS, per the standing rule. */}
        <p
          data-no-matches
          className="mx-auto hidden w-full max-w-[1060px] px-4 pb-10 text-[13px] leading-[1.68] text-forest/75 sm:px-6 sm:pb-16 lg:px-8"
        >
          Nothing under this heading yet. The next piece may well be.
        </p>
      </div>

      {/* TOPICS */}
      <div className="border-y border-forest/12 bg-shell px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1060px]">
          <p className="mb-5 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
            {TOPICS_LABEL}
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {TOPICS.map((topic) => (
              <li key={topic}>
                <span className="inline-flex rounded-[100px] border border-forest/10 bg-forest/5 px-[18px] py-2 text-xs font-semibold text-forest">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SUBSCRIBE */}
      <div className="px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[520px]">
          <p className="mb-3.5 text-[10px] font-bold tracking-[0.22em] text-mid uppercase">
            {SUBSCRIBE.eyebrow}
          </p>
          <h2 className="mb-3 text-2xl leading-[1.15] font-extrabold tracking-[-0.022em] text-forest sm:text-[36px]">
            <Segments segments={SUBSCRIBE.headline} accentClassName="text-mid" />
          </h2>
          <p className="mb-7 text-[14.5px] leading-[1.7] text-forest/75">{SUBSCRIBE.standfirst}</p>
          <SubscribeForm
            initialStatus={subscribed === "1" ? "subscribed" : null}
            initialError={error ?? null}
          />
        </div>
      </div>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-forest px-4 py-12 text-center sm:px-6 sm:py-[72px] lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto max-w-[560px]">
          <h2 className="mb-3 text-2xl leading-[1.1] font-extrabold tracking-[-0.022em] text-white sm:text-[38px]">
            <Segments segments={INSIGHTS_CTA.headline} />
          </h2>
          <p className="mb-7 text-[15px] leading-[1.65] text-white/50">{INSIGHTS_CTA.body}</p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-[100px] bg-neon px-[30px] py-3.5 text-[13px] font-bold text-forest transition-opacity hover:opacity-88"
          >
            {INSIGHTS_CTA.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
