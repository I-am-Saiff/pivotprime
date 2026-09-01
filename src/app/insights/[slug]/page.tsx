import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Segments } from "@/components/insights/Segments";
import { ARTICLES, articleBySlug } from "@/content/insights";
import { SITE_NAME, OG_IMAGE } from "@/content/metadata";

/**
 * One article, built from her pp-blog-1 through pp-blog-4.
 *
 * HER METADATA, VERBATIM. Each of her files carries its own title, description
 * and keywords, written for search. All three are passed through exactly as she
 * wrote them rather than regenerated, which is why this page does not use
 * pageMetadata(): that helper holds our wording, and hers is already done.
 *
 * STATICALLY GENERATED, ALL FOUR. generateStaticParams enumerates her slugs, so
 * each article is prerendered rather than rendered per request, and
 * dynamicParams is false so an unknown slug is a 404 at the routing layer
 * instead of a rendered empty page.
 *
 * THE SLUGS ARE HERS. Her four files cross-link each other with
 * /blog/consultant-leaves and the rest. Those slugs are kept and moved under
 * /insights; next.config.ts redirects /blog and /blog/* so nothing she has
 * already sent to anyone breaks.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `/insights/${article.slug}`,
      siteName: SITE_NAME,
      locale: "en_AE",
      // An article, not a page. The listing stays type website.
      type: "article",
      ...(OG_IMAGE ? { images: [OG_IMAGE] } : {}),
    },
    twitter: {
      card: OG_IMAGE ? "summary_large_image" : "summary",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="surface-page flex min-h-screen flex-col">
      {/* HERO */}
      <header className="relative overflow-hidden bg-forest px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-[72px] md:pt-40 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:26px_26px]"
        />
        <div className="relative mx-auto max-w-[760px]">
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="rounded-[100px] border border-neon/25 bg-neon/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-neon uppercase">
              {article.tag}
            </span>
            <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-white/25" />
            <span className="text-xs text-white/40">{article.date}</span>
            <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-white/25" />
            <span className="text-xs text-white/40">{article.readTime}</span>
          </div>
          <h1 className="mb-5 text-[30px] leading-[1.07] font-extrabold tracking-[-0.028em] text-balance text-white sm:text-[42px] lg:text-[56px]">
            <Segments segments={article.headline} />
          </h1>
          <p className="max-w-[580px] text-[17px] leading-[1.7] text-white/58">{article.deck}</p>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto w-full max-w-[700px] px-4 pt-10 pb-14 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
        <div className="mb-12 flex items-center gap-3.5 border-y border-forest/12 py-6">
          <span
            aria-hidden="true"
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-forest text-[13px] font-extrabold text-neon"
          >
            {article.author.initials}
          </span>
          <span>
            <span className="block text-[13px] font-bold text-foreground">
              {article.author.name}
            </span>
            <span className="block text-xs text-forest/75">{article.author.role}</span>
          </span>
        </div>

        <div>
          {article.body.map((block, i) => {
            if (block.type === "h2")
              return (
                <h2
                  key={i}
                  className="mt-13 mb-4 text-[21px] leading-[1.25] font-extrabold tracking-[-0.02em] text-forest"
                >
                  {block.text}
                </h2>
              );
            if (block.type === "quote")
              return (
                <blockquote
                  key={i}
                  className="my-11 rounded-r-xl border-l-[3px] border-neon bg-forest/4 px-7 py-[22px]"
                >
                  <p className="text-[19px] leading-[1.52] font-semibold text-forest italic">
                    {block.text}
                  </p>
                </blockquote>
              );
            if (block.type === "lead")
              return (
                <p key={i} className="mb-[30px] text-[18px] leading-[1.82] text-foreground">
                  {block.text}
                </p>
              );
            return (
              <p key={i} className="mb-[26px] text-base leading-[1.85] text-forest/85">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>

      {/* HER PER-ARTICLE CTA, BOXED 1 September, on the service closer's
          geometry. One file, so all four articles move together. The dot
          texture and overflow-hidden move inside the box with the fill they
          belong to. Nothing inside changes. PENDING-COPY 1d5. */}
      <section className="surface-page px-4 pb-12 text-center sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-forest p-7 sm:p-10 md:p-11">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="relative mx-auto max-w-[560px]">
          <h2 className="mb-3 text-2xl leading-[1.1] font-extrabold tracking-[-0.022em] text-white sm:text-[38px]">
            <Segments segments={article.cta.headline} />
          </h2>
          <p className="mb-7 text-[15px] leading-[1.65] text-white/50">{article.cta.body}</p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-[100px] bg-neon px-[30px] py-3.5 text-[13px] font-bold text-forest transition-opacity hover:opacity-88"
          >
            {article.cta.button}
          </Link>
        </div>
        </div>
      </section>

      {/* MORE */}
      <div className="mx-auto w-full max-w-[700px] px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-5 text-[10px] font-bold tracking-[0.2em] text-mid uppercase">
          {article.moreLabel}
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {article.more.map((m) => (
            <Link
              key={m.slug}
              href={`/insights/${m.slug}`}
              className="flex flex-col gap-2 rounded-[14px] border border-forest/12 bg-shell p-6 transition-colors hover:border-mid"
            >
              <span className="text-[10px] font-bold tracking-[0.16em] text-mid uppercase">
                {m.tag}
              </span>
              <span className="text-[15px] leading-[1.38] font-bold tracking-[-0.01em] text-forest">
                {m.title}
              </span>
              <span className="mt-1 text-xs font-semibold text-mid">{m.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
