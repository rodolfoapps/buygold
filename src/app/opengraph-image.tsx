import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "The straight story on gold — before you buy.",
    eyebrow: "Gold & Precious Metals",
  });
}
