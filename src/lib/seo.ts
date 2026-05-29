/**
 * SEO helpers: metadata builders and JSON-LD structured data.
 *
 * Structured data is part of how we declare entities to search engines.
 * We emit Organization + WebSite site-wide, and Article + Person +
 * BreadcrumbList on content pages.
 */

import type { Metadata } from "next";
import { site, author } from "./site";
import type { Doc } from "./content";

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http")) return pathname;
  return `${site.url}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [author.name] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  } as Metadata;
}

/* ------------------------------- JSON-LD -------------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about#person`,
    name: author.name,
    description: author.shortBio,
    url: `${site.url}/about`,
  };
}

export function articleJsonLd(doc: Doc) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.frontmatter.title,
    description: doc.frontmatter.description,
    datePublished: doc.frontmatter.date,
    dateModified: doc.frontmatter.updated ?? doc.frontmatter.date,
    author: { "@type": "Person", name: author.name, url: `${site.url}/about` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(doc.url),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
