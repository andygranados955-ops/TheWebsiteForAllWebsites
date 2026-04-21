import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { getEssaySlugs, getStorySlugs, getThoughtSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const last = new Date();

  const staticRoutes = [
    "",
    "/essays",
    "/thoughts",
    "/stories",
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

  const stories = getStorySlugs().map((slug) => ({
    url: `${base}/stories/${slug}`,
    lastModified: last,
    changeFrequency: "monthly" as const,
    priority: 0.62,
  }));

  return [...staticRoutes, ...essays, ...thoughts, ...stories];
}
