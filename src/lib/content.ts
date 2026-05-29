/**
 * File-based content layer.
 *
 * Articles live as MDX files under /content/<collection>/<slug>.mdx with
 * YAML frontmatter. This is intentionally simple: it scales to thousands of
 * pages (the "vastness" pillar) without a CMS, keeps everything in git, and
 * gives us full control over metadata for SEO.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Collection = "guides" | "blog";

export interface Frontmatter {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-05-20". */
  date: string;
  /** ISO date string for the last meaningful update (refreshment/momentum). */
  updated?: string;
  /** Short category label shown on cards and breadcrumbs. */
  category?: string;
  /** Marks a cornerstone "quality node" / root document. */
  cornerstone?: boolean;
  /** Slugs of related articles for contextual connections (internal links). */
  related?: string[];
  /** Optional hand-written excerpt; falls back to description. */
  excerpt?: string;
  /** Set true to hide from listings and sitemaps while drafting. */
  draft?: boolean;
}

export interface Doc {
  slug: string;
  collection: Collection;
  url: string;
  frontmatter: Frontmatter;
  content: string;
  readingMinutes: number;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function collectionDir(collection: Collection): string {
  return path.join(CONTENT_DIR, collection);
}

function urlFor(collection: Collection, slug: string): string {
  return `/${collection}/${slug}`;
}

export function getSlugs(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getDoc(collection: Collection, slug: string): Doc | null {
  const dir = collectionDir(collection);
  const fullPath = [path.join(dir, `${slug}.mdx`), path.join(dir, `${slug}.md`)].find(
    (p) => fs.existsSync(p),
  );
  if (!fullPath) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  return {
    slug,
    collection,
    url: urlFor(collection, slug),
    frontmatter,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/**
 * All published docs in a collection, newest first.
 * Drafts are excluded unless includeDrafts is set (used in dev tooling).
 */
export function getAllDocs(
  collection: Collection,
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
): Doc[] {
  return getSlugs(collection)
    .map((slug) => getDoc(collection, slug))
    .filter((doc): doc is Doc => doc !== null)
    .filter((doc) => includeDrafts || !doc.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/** Cornerstone "quality nodes" — surfaced near the homepage. */
export function getCornerstones(collection: Collection): Doc[] {
  return getAllDocs(collection).filter((doc) => doc.frontmatter.cornerstone);
}

/** Resolve a list of related slugs (within the guides collection) to Docs. */
export function getRelatedDocs(slugs: string[] = []): Doc[] {
  return slugs
    .map((slug) => getDoc("guides", slug))
    .filter((doc): doc is Doc => doc !== null && !doc.frontmatter.draft);
}
