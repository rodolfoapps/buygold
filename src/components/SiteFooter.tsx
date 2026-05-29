import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-paper-sunken">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="font-serif text-lg font-semibold text-ink">
              Buy Gold <span className="text-gold-700">Insider</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Read
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-ink-soft hover:text-gold-700">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ink-soft hover:text-gold-700">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-soft hover:text-gold-700">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              The fine print
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Educational information only. Nothing here is financial, tax, or
              investment advice.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
