import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { AuthorByline } from "./AuthorByline";
import { JsonLd } from "./JsonLd";
import { ArticleCard } from "./ArticleCard";
import { mdxComponents } from "@/lib/mdx-components";
import type { Doc } from "@/lib/content";
import { getRelatedDocs } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";

/**
 * Renders a full article (guide or blog post): breadcrumbs, byline, MDX body,
 * structured data, and a related-reading block for contextual connections.
 */
export function Article({ doc, crumbs }: { doc: Doc; crumbs: Crumb[] }) {
  const { frontmatter } = doc;
  const related = getRelatedDocs(frontmatter.related);
  const updated = frontmatter.updated;

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={[
          articleJsonLd(doc),
          personJsonLd(),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <div className="mx-auto max-w-prose">
        <Breadcrumbs crumbs={crumbs} />

        <header className="mt-6">
          {frontmatter.category ? (
            <p className="text-sm font-medium uppercase tracking-wide text-gold-700">
              {frontmatter.category}
            </p>
          ) : null}
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.75rem]">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {frontmatter.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
            <AuthorByline
              date={frontmatter.date}
              readingMinutes={doc.readingMinutes}
            />
            {updated ? (
              <p className="text-xs text-ink-faint">
                Updated{" "}
                {new Date(updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
          </div>
        </header>

        <div className="prose prose-lg mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:font-serif prose-headings:tracking-tight prose-a:font-medium prose-a:text-gold-700 hover:prose-a:text-gold-800">
          <MDXRemote source={doc.content} components={mdxComponents} />
        </div>

        {/* Honest, non-advisory disclaimer on every article. */}
        <p className="mt-12 rounded-lg border border-line bg-paper-sunken px-5 py-4 text-sm leading-relaxed text-ink-muted">
          This article is educational information, not financial, tax, or
          investment advice. Prices and rules change — verify current figures
          and talk to a qualified professional before making decisions.
        </p>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto mt-16 max-w-content">
          <div className="rule-gold" />
          <h2 className="mt-10 font-serif text-2xl font-semibold tracking-tight text-ink">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <ArticleCard key={rel.slug} doc={rel} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto mt-14 max-w-prose">
        <Link
          href={`/${doc.collection}`}
          className="text-sm font-medium text-gold-700 hover:text-gold-800"
        >
          ← Back to {doc.collection === "guides" ? "all guides" : "the blog"}
        </Link>
      </div>
    </Container>
  );
}
