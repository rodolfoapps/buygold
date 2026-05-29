/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Content is authored in MDX files under /content and rendered with
  // next-mdx-remote, so no special webpack/MDX loader config is required here.
};

export default nextConfig;
