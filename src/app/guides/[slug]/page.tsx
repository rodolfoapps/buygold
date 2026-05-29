import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/Article";
import { getDoc, getSlugs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("guides").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("guides", slug);
  if (!doc || doc.frontmatter.draft) return {};
  return pageMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: doc.url,
    type: "article",
    publishedTime: doc.frontmatter.date,
    modifiedTime: doc.frontmatter.updated ?? doc.frontmatter.date,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("guides", slug);
  if (!doc || doc.frontmatter.draft) notFound();

  return (
    <Article
      doc={doc}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: doc.frontmatter.title, path: doc.url },
      ]}
    />
  );
}
