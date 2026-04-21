import { siteConfig } from "@/content/site";

/** Unique profile URLs for schema.org sameAs (optional; from `social` in site config). */
export function getSameAsUrls(): string[] {
  const urls = new Set<string>();
  for (const item of siteConfig.social) {
    try {
      const u = new URL(item.href);
      if (u.protocol === "http:" || u.protocol === "https:") urls.add(item.href);
    } catch {
      /* skip */
    }
  }
  return [...urls];
}

/** schema.org WebSite + Person @graph for the homepage / site identity */
export function getPersonWebsiteJsonLd(): Record<string, unknown> {
  const base = siteConfig.url.replace(/\/$/, "");
  const sameAs = getSameAsUrls();
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: base,
    description: siteConfig.person.description,
    jobTitle: siteConfig.person.jobTitle,
    knowsAbout: [...siteConfig.person.knowsAbout],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/`,
    },
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.person.affiliation.name,
      alternateName: siteConfig.person.affiliation.alternateName,
    },
  };

  if (siteConfig.links.email && siteConfig.links.email.includes("@")) {
    person.email = siteConfig.links.email;
  }

  const src = siteConfig.profileImageSrc;
  person.image = src.startsWith("http")
    ? src
    : `${base}${src.startsWith("/") ? src : `/${src}`}`;

  if (sameAs.length > 0) {
    person.sameAs = sameAs;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${base}/`,
    name: siteConfig.seo.ogSiteName,
    description: siteConfig.seo.homeMetaDescription,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: { "@id": personId },
    about: { "@id": personId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, person],
  };
}
