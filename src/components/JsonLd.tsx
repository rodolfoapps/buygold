/**
 * Renders a JSON-LD <script> block. Pass any schema.org object (or array).
 * Server component — emitted directly into the HTML for crawlers.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Data is built server-side from our own content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
