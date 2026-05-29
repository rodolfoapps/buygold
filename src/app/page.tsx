import Link from "next/link";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { author } from "@/lib/site";
import { getAllDocs, getCornerstones } from "@/lib/content";

export default function HomePage() {
  const cornerstones = getCornerstones("guides");
  const recentGuides = getAllDocs("guides").slice(0, 6);
  const recentPosts = getAllDocs("blog").slice(0, 3);
  const [featured, ...restCornerstones] = cornerstones;

  return (
    <>
      {/* Hero — calm, plain-spoken, anti-hype. */}
      <section className="border-b border-line bg-gradient-to-b from-paper-sunken/60 to-paper">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-wide text-gold-700">
              Gold &amp; precious metals, explained plainly
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              The straight story on gold — before you buy.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              No doomsday ads. No pressure. Just clear, careful answers about how
              gold prices move, how to actually buy it, and how people near
              retirement use hard assets to steady a portfolio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/guides"
                className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
              >
                Start with the guides
              </Link>
              <Link
                href="/guides/what-moves-the-price-of-gold"
                className="rounded-lg border border-line bg-paper-raised px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold-300"
              >
                What moves the gold price?
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Cornerstone "quality nodes" near the homepage. */}
      {cornerstones.length > 0 ? (
        <section>
          <Container className="py-16 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Start here
                </h2>
                <p className="mt-2 max-w-xl text-ink-muted">
                  The cornerstone guides — the ones worth reading first.
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden flex-none text-sm font-medium text-gold-700 hover:text-gold-800 sm:block"
              >
                All guides →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {featured ? <ArticleCard doc={featured} featured /> : null}
              <div className="grid gap-6">
                {restCornerstones.slice(0, 2).map((doc) => (
                  <ArticleCard key={doc.slug} doc={doc} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Who writes this — minimal author presence. */}
      <section className="border-y border-line bg-paper-sunken">
        <Container className="py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
              Who writes this
            </p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
              “{author.shortBio}”
            </p>
            <p className="mt-5 text-sm text-ink-muted">
              — {author.name} ·{" "}
              <Link href="/about" className="text-gold-700 hover:text-gold-800">
                more about this site
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Recent guides grid. */}
      {recentGuides.length > 0 ? (
        <section>
          <Container className="py-16 sm:py-20">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              More guides
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentGuides.map((doc) => (
                <ArticleCard key={doc.slug} doc={doc} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Latest from the blog. */}
      {recentPosts.length > 0 ? (
        <section className="border-t border-line bg-paper-sunken/50">
          <Container className="py-16 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                From the blog
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-gold-700 hover:text-gold-800"
              >
                All posts →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((doc) => (
                <ArticleCard key={doc.slug} doc={doc} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
