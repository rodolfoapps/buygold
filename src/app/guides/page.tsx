import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllDocs, getCornerstones } from "@/lib/content";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const title = "Gold &amp; Precious Metals Guides";
const description =
  "Plain-English guides to buying gold, reading gold prices, and using precious metals to diversify a retirement portfolio. Start with the cornerstones.";

export const metadata: Metadata = pageMetadata({
  title: "Gold & Precious Metals Guides",
  description,
  path: "/guides",
});

export default function GuidesIndexPage() {
  const cornerstones = getCornerstones("guides");
  const all = getAllDocs("guides");
  const others = all.filter((doc) => !doc.frontmatter.cornerstone);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ])}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          The guides
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>
      </header>

      {cornerstones.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-700">
            Cornerstones
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cornerstones.map((doc) => (
              <ArticleCard key={doc.slug} doc={doc} />
            ))}
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
            More guides
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((doc) => (
              <ArticleCard key={doc.slug} doc={doc} />
            ))}
          </div>
        </section>
      ) : null}

      {all.length === 0 ? (
        <p className="mt-12 text-ink-muted">Guides are on the way.</p>
      ) : null}
    </Container>
  );
}
