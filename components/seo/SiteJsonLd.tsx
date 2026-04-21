import { getPersonWebsiteJsonLd } from "@/lib/jsonld";

/**
 * JSON-LD for Person + WebSite — identity signals for search engines.
 * Content comes from `content/site.ts` (`seo`, `person`, `social`, `links`).
 */
export function SiteJsonLd() {
  const json = getPersonWebsiteJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
