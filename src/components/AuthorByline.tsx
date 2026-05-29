import Link from "next/link";
import { author } from "@/lib/site";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * Minimal author byline. Establishes a real human without the
 * financial-advisor sales-page feel. Optionally shows date + reading time.
 */
export function AuthorByline({
  date,
  readingMinutes,
  className = "",
}: {
  date?: string;
  readingMinutes?: number;
  className?: string;
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold-100 font-serif text-sm font-semibold text-gold-700"
      >
        {initials(author.name)}
      </span>
      <div className="text-sm leading-tight">
        <Link href="/about" className="font-medium text-ink hover:text-gold-700">
          {author.name}
        </Link>
        <p className="text-ink-muted">
          {[formattedDate, readingMinutes ? `${readingMinutes} min read` : null]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </div>
  );
}
