# Buy Gold Insider

The foundation of [BuyGoldInsider.com](https://buygoldinsider.com) — a calm,
plain-spoken authority site about gold, precious metals, and protecting
retirement savings. No doomsday ads, no hype.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and
file-based **MDX** content, designed to deploy on **Vercel** and scale into a
large semantic content network.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

## How content works

Articles are MDX files with YAML frontmatter. No CMS required.

```
content/
  guides/   # durable, SEO-focused explainers (the backbone)
  blog/     # lighter, timely posts (for social)
```

Each file's frontmatter drives titles, metadata, structured data, listings,
and the sitemap. See `src/lib/content.ts` for the schema. Key fields:

- `title`, `description`, `date` — required.
- `updated` — last meaningful refresh (feeds "momentum" + sitemap).
- `category` — short label on cards/breadcrumbs.
- `cornerstone: true` — marks a "quality node," surfaced near the homepage.
- `related: [slug, ...]` — internal links for contextual connections.
- `draft: true` — hides from listings and sitemap while writing.

### Add a new guide

1. Create `content/guides/my-new-guide.mdx` with the frontmatter above.
2. Write the body in Markdown/MDX. Custom components available:
   `<Callout>…</Callout>` and `<Figure caption="…">…table…</Figure>`.
3. It appears automatically in `/guides`, the sitemap, and (if `cornerstone`)
   the homepage. It's statically generated at build time.

## SEO foundation

- Per-page metadata + canonical URLs (`src/lib/seo.ts`).
- JSON-LD structured data: Organization + WebSite site-wide; Article + Person +
  BreadcrumbList on content pages.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Breadcrumbs, semantic headings, and internal "related" linking throughout.

## Content strategy

`docs/topical-map.md` is the topical map (Koray semantic-SEO framework): central
entity, source context, pillars, the cornerstones shipped, and the backlog to
build out. Reference material lives in the separate `semantic-seo` repo.

## Editing the author / brand

The author persona and site identity are centralized in `src/lib/site.ts`.
"Gary Whitman" is a **placeholder** — swap in the real person and a verifiable
credential before launch, and keep it minimal: this is an informational site,
not a financial-advisor sales page.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js; no special settings needed.
3. Add the `buygoldinsider.com` domain in the Vercel project settings.

The `site.url` in `src/lib/site.ts` is the production base URL used for
canonicals, sitemap, and structured data.
