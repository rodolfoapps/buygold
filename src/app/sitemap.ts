import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllDocs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const docRoutes: MetadataRoute.Sitemap = (["guides", "blog"] as const).flatMap(
    (collection) =>
      getAllDocs(collection).map((doc) => ({
        url: `${site.url}${doc.url}`,
        lastModified: new Date(doc.frontmatter.updated ?? doc.frontmatter.date),
        changeFrequency: "monthly" as const,
        priority: doc.frontmatter.cornerstone ? 0.8 : 0.6,
      })),
  );

  return [...staticRoutes, ...docRoutes];
}
