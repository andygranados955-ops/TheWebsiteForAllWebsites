import { siteConfig } from "@/content/site";
import { getAllEssays } from "@/lib/content";
import { sortEssaysNewestFirst } from "@/lib/sort";

export const dynamic = "force-static";

function escapeXml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const essays = sortEssaysNewestFirst(getAllEssays());
  const items = essays
    .map((e) => {
      const url = `${siteConfig.url}/essays/${e.slug}`;
      return `
    <item>
      <title>${escapeXml(e.frontmatter.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${new Date(e.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(e.frontmatter.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.bio)}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
