import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

/** Absolute canonical URL for a site path (`/` or `/about`). */
export function canonicalUrl(path?: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildOptions = {
  /** Sets `alternates.canonical` and `openGraph.url` for this page. */
  path?: string;
};

/**
 * Next.js Metadata with defaults from `content/site.ts`.
 * Pass `path` for correct canonical + Open Graph URL (e.g. `/about`, `/essays/slug`).
 */
export function buildMetadata(
  overrides: Metadata = {},
  options?: BuildOptions,
): Metadata {
  const canonical =
    options?.path != null ? canonicalUrl(options.path) : undefined;
  const ogUrl = canonical ?? siteConfig.url.replace(/\/$/, "");
  const ogImage = `${siteConfig.url.replace(/\/$/, "")}/opengraph-image`;

  const base: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.seo.titleTemplateBrand,
      template: `%s · ${siteConfig.seo.titleTemplateBrand}`,
    },
    description: siteConfig.seo.defaultMetaDescription,
    applicationName: siteConfig.seo.ogSiteName,
    authors: [{ name: siteConfig.author, url: canonicalUrl("/") }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.seo.ogSiteName,
      title: siteConfig.seo.titleTemplateBrand,
      description: siteConfig.seo.defaultMetaDescription,
      url: ogUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — personal website`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.seo.titleTemplateBrand,
      description: siteConfig.seo.defaultMetaDescription,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
  };

  return {
    ...base,
    ...overrides,
    alternates: { ...base.alternates, ...overrides.alternates },
    openGraph: { ...base.openGraph, ...overrides.openGraph },
    twitter: { ...base.twitter, ...overrides.twitter },
  };
}
