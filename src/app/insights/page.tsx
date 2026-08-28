import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";

// Spec 2.1 renames Prime Insights to Insights. Stage one scope item 5 is "a
// simple listing of existing posts, no new editorial features". There are no
// posts yet and the spec supplies no copy for this page, so it states that
// plainly rather than inventing an editorial promise.
/**
 * NOINDEX WHILE THERE IS NOTHING TO READ.
 *
 * The page is a heading and two sentences, roughly two hundred words including
 * the footer. Indexed, that is a thin-content signal against the whole domain
 * for no gain, and an answer engine has nothing to quote from it. The route
 * stays live so any existing link resolves, and it is already out of the main
 * navigation and out of the sitemap.
 *
 * follow: true deliberately. Crawlers should still walk the footer links out of
 * it rather than treating it as a dead end.
 *
 * All three come back the day there is a first article. PENDING-COPY 1k.
 */
export const metadata: Metadata = {
  ...pageMetadata("insights"),
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col surface-page">
      <section className="mx-auto w-full max-w-3xl px-4 pt-28 sm:pt-32 pb-14 sm:pb-24 sm:px-6 md:pt-40 lg:px-8">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Insights
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600">
          Writing from the team on operations, execution and what actually moves a business. The
          first pieces are on their way.
        </p>

        {/*
          TODO(client): posts. Spec 2.3 also lists an insights signup as one of
          three things that send or receive mail, and says it "does not exist yet
          and needs building". It is out of stage one scope, which ships the
          contact form as the only backend, so no signup is rendered here rather
          than one that collects an address and does nothing with it.
        */}
      </section>
    </div>
  );
}
