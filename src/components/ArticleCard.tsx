import Link from "next/link";
import type { Doc } from "@/lib/content";

export function ArticleCard({
  doc,
  featured = false,
}: {
  doc: Doc;
  featured?: boolean;
}) {
  const { frontmatter } = doc;
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className={`group flex flex-col rounded-xl border border-line bg-paper-raised p-6 transition-shadow hover:shadow-[0_2px_24px_-12px_rgba(28,26,23,0.25)] ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gold-700">
        {frontmatter.category ? <span>{frontmatter.category}</span> : null}
        {frontmatter.cornerstone ? (
          <span className="rounded-full bg-gold-50 px-2 py-0.5 text-gold-700">
            Cornerstone
          </span>
        ) : null}
      </div>

      <h3
        className={`mt-3 font-serif font-semibold tracking-tight text-ink ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        <Link href={doc.url} className="hover:text-gold-800">
          {frontmatter.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
        {frontmatter.excerpt ?? frontmatter.description}
      </p>

      <p className="mt-4 text-xs text-ink-faint">
        {date} · {doc.readingMinutes} min read
      </p>
    </article>
  );
}
