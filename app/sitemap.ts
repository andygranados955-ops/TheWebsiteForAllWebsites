import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { getEssaySlugs, getThoughtSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const last = new Date();

  const staticRoutes = [
    "",
    "/essays",
    "/thoughts",
    "/projects",
    "/interests",
    "/gallery",
    "/about",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: last,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const essays = getEssaySlugs().map((slug) => ({
    url: `${base}/essays/${slug}`,
    lastModified: last,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const thoughts = getThoughtSlugs().map((slug) => ({
    url: `${base}/thoughts/${slug}`,
    lastModified: last,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...essays, ...thoughts];
}
