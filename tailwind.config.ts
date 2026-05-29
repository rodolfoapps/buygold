import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm "paper" surfaces — credible, editorial, not a doomsday-ad.
        paper: {
          DEFAULT: "#fbfaf7",
          raised: "#ffffff",
          sunken: "#f4f1ea",
        },
        // Ink for text — near-black with a touch of warmth.
        ink: {
          DEFAULT: "#1c1a17",
          soft: "#43403a",
          muted: "#6b6760",
          faint: "#9a958c",
        },
        // Restrained gold accent. Used sparingly for emphasis and links.
        gold: {
          50: "#fbf7ed",
          100: "#f5ecd2",
          200: "#ead6a1",
          300: "#dcbb6a",
          400: "#cda044",
          500: "#b9852b",
          600: "#9c6a22",
          700: "#7c511f",
          800: "#684320",
          900: "#59391f",
        },
        line: "#e7e2d7",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        content: "72rem",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#43403a",
            "--tw-prose-headings": "#1c1a17",
            "--tw-prose-links": "#7c511f",
            "--tw-prose-bold": "#1c1a17",
            "--tw-prose-quotes": "#43403a",
            "--tw-prose-quote-borders": "#dcbb6a",
            "--tw-prose-bullets": "#cda044",
            "--tw-prose-counters": "#9c6a22",
            "--tw-prose-th-borders": "#e7e2d7",
            "--tw-prose-td-borders": "#e7e2d7",
            maxWidth: "68ch",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
