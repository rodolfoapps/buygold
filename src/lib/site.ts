/**
 * Central site configuration.
 *
 * In Koray's framework this file pins down the "source context" and the
 * "central entity": who we are, what we cover, and how the site presents
 * itself everywhere. Keep it in one place so every page stays consistent
 * (no contradictions across the knowledge base).
 */

export const site = {
  name: "Buy Gold Insider",
  domain: "buygoldinsider.com",
  url: "https://buygoldinsider.com",
  // Central entity + source context, stated plainly.
  tagline: "Plain answers about gold, before you buy.",
  description:
    "Buy Gold Insider is a calm, plain-spoken guide to gold and precious metals — how prices move, how to buy, and how people near retirement use hard assets to diversify. No hype, no doomsday ads.",
  // Short, repeatable framing used in metadata and the footer.
  shortDescription:
    "A no-hype guide to gold, precious metals, and protecting savings.",
  locale: "en_US",
  // Set this once Twitter/X presence exists; harmless if left blank.
  twitter: "",
  navigation: [
    { label: "Guides", href: "/guides" },
    { label: "Gold Prices", href: "/guides/what-moves-the-price-of-gold" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ] as const,
};

/**
 * The author persona — deliberately minimal.
 *
 * This establishes a real, checkable human (E-E-A-T) without turning the
 * site into a financial-advisor sales page. "Gary Whitman" is a placeholder;
 * swap in the real person and a verifiable credential (e.g. a CFP number you
 * can look up) before launch. Keep it small.
 */
export const author = {
  name: "Gary Whitman",
  // One line. Plain. No alphabet soup.
  role: "Writer, Buy Gold Insider",
  // Replace with the real, verifiable bio when the person is finalized.
  shortBio:
    "Gary spent his career around money and retirement planning, watched plenty of people get caught off guard in downturns, and now writes about gold the way he'd explain it to his brother-in-law at a barbecue — plainly, and without the hype.",
  // Used by the byline. Keep it honest: we inform, we don't advise.
  byline: "By Gary Whitman",
  slug: "about",
};

export type SiteConfig = typeof site;
