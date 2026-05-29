/**
 * Custom renderers for MDX content.
 *
 * These let article authors drop in a few semantic blocks that match the
 * framework: a clear "Key takeaway" callout, a comparison table wrapper,
 * and links that default to internal styling. Anchor text matters for
 * contextual connections, so links are first-class.
 */

import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";
import {
  FlowSteps,
  FactGrid,
  GoldIraFlow,
  GoldPriceStack,
  GoldPriceForces,
} from "@/components/visuals";

/** Loose component map accepted by MDXRemote's `components` prop. */
type MdxComponentMap = Record<string, ComponentType<Record<string, unknown>>>;

function Callout({
  children,
  label = "Key takeaway",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <aside className="not-prose my-8 rounded-lg border border-gold-200 bg-gold-50 px-5 py-4">
      <p className="m-0 text-xs font-semibold uppercase tracking-wide text-gold-700">
        {label}
      </p>
      <div className="mt-2 text-[0.975rem] leading-relaxed text-ink-soft [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}

function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8 overflow-x-auto rounded-lg border border-line">
      <div className="[&_table]:m-0 [&_table]:w-full [&_table]:border-collapse [&_th]:bg-paper-sunken [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-ink-soft">
        {children}
      </div>
      {caption ? (
        <figcaption className="border-t border-line bg-paper-sunken px-4 py-2 text-xs text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MdxLink({
  href = "#",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: MdxLink,
  Callout,
  Figure,
  FlowSteps,
  FactGrid,
  GoldIraFlow,
  GoldPriceStack,
  GoldPriceForces,
} as unknown as MdxComponentMap;
