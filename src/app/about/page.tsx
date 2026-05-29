import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { site, author } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";

const description = `Why ${site.name} exists, how we write, and who's behind it. Educational, plain-spoken, and free of the doomsday-ad noise the gold niche is known for.`;

export const metadata: Metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={[
          personJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-prose">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />

        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          About Buy Gold Insider
        </h1>

        <div className="prose prose-lg mt-8 max-w-none prose-a:font-medium prose-a:text-gold-700 hover:prose-a:text-gold-800">
          <p>
            Most writing about gold falls into one of two buckets: dry market
            data nobody finishes, or fear-soaked sales pitches dressed up as
            news. <strong>Buy Gold Insider sits in the gap between them.</strong>{" "}
            The goal is simple — answer the real questions a careful person asks
            before they buy gold, in plain language, without the hype.
          </p>

          <h2>What you&apos;ll find here</h2>
          <p>
            Two things, mostly. <Link href="/guides">Guides</Link> are the
            backbone: durable, carefully researched explainers on how gold
            prices move, how to actually buy and store metal, and how people
            near retirement use hard assets to diversify. The{" "}
            <Link href="/blog">blog</Link> is lighter — short notes on the news
            that moves metals and the questions readers keep asking.
          </p>

          <h2>How we write</h2>
          <p>
            Calm and specific. We&apos;d rather give you the number and the
            tradeoff than tell you what to do. When something is a rule, we say
            so; when it&apos;s a judgment call, we say that too.
          </p>

          <h2>Who&apos;s behind it</h2>
          <p>
            {author.shortBio} He writes the guides and keeps the tone honest.
          </p>

          <Link
            href="/guides"
            className="inline-block rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper no-underline transition-colors hover:bg-ink-soft"
          >
            Read the guides →
          </Link>

          <hr />

          <p className="text-sm text-ink-muted">
            <strong>A note on advice.</strong> Everything here is educational
            information, not financial, tax, or investment advice. We don&apos;t
            sell metals and we&apos;re not your advisor. Verify current prices
            and rules, and talk to a qualified professional before you make a
            decision with your money.
          </p>
        </div>
      </div>
    </Container>
  );
}
