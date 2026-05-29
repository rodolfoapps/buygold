import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-700">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        It may have moved, or never existed. The guides are a good place to pick
        the thread back up.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-ink-soft"
        >
          Go home
        </Link>
        <Link
          href="/guides"
          className="rounded-lg border border-line bg-paper-raised px-5 py-3 text-sm font-semibold text-ink hover:border-gold-300"
        >
          Browse guides
        </Link>
      </div>
    </Container>
  );
}
