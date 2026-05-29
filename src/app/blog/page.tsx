import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllDocs } from "@/lib/content";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Notes, updates, and plain-spoken takes on gold, precious metals, and the news that moves them — written for people who'd rather skip the hype.";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllDocs("blog");

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          The blog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>
      </header>

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((doc) => (
            <ArticleCard key={doc.slug} doc={doc} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-ink-muted">First posts coming soon.</p>
      )}
    </Container>
  );
}
