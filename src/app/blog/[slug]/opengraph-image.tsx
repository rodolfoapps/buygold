import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { getDoc, getSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = `${site.name} blog post`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("blog", slug);
  return renderOgImage({
    title: doc?.frontmatter.title ?? "From the blog",
    eyebrow: doc?.frontmatter.category ?? "Blog",
  });
}
