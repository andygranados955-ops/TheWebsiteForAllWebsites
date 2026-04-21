import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  EssayFrontmatter,
  Interest,
  GalleryImage,
  PostMeta,
  Project,
  StoryFrontmatter,
  ThoughtFrontmatter,
} from "@/lib/types";

const ROOT = process.cwd();

function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getEssaySlugs(): string[] {
  return readDirSafe(path.join(ROOT, "content", "essays")).map((f) =>
    f.replace(/\.md$/, ""),
  );
}

export function getThoughtSlugs(): string[] {
  return readDirSafe(path.join(ROOT, "content", "thoughts")).map((f) =>
    f.replace(/\.md$/, ""),
  );
}

export function getStorySlugs(): string[] {
  return readDirSafe(path.join(ROOT, "content", "stories")).map((f) =>
    f.replace(/\.md$/, ""),
  );
}

export function getEssayBySlug(slug: string): PostMeta<EssayFrontmatter> | null {
  const file = path.join(ROOT, "content", "essays", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as EssayFrontmatter,
    content,
  };
}

export function getThoughtBySlug(
  slug: string,
): PostMeta<ThoughtFrontmatter> | null {
  const file = path.join(ROOT, "content", "thoughts", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ThoughtFrontmatter,
    content,
  };
}

export function getStoryBySlug(slug: string): PostMeta<StoryFrontmatter> | null {
  const file = path.join(ROOT, "content", "stories", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as StoryFrontmatter,
    content,
  };
}

export function getAllEssays(): PostMeta<EssayFrontmatter>[] {
  return getEssaySlugs()
    .map((slug) => getEssayBySlug(slug))
    .filter(Boolean) as PostMeta<EssayFrontmatter>[];
}

export function getAllThoughts(): PostMeta<ThoughtFrontmatter>[] {
  return getThoughtSlugs()
    .map((slug) => getThoughtBySlug(slug))
    .filter(Boolean) as PostMeta<ThoughtFrontmatter>[];
}

export function getAllStories(): PostMeta<StoryFrontmatter>[] {
  return getStorySlugs()
    .map((slug) => getStoryBySlug(slug))
    .filter(Boolean) as PostMeta<StoryFrontmatter>[];
}

export function getProjects(): Project[] {
  const file = path.join(ROOT, "content", "projects.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as Project[];
}

export function getInterests(): Interest[] {
  const file = path.join(ROOT, "content", "interests.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as Interest[];
}

export function getGallery(): GalleryImage[] {
  const file = path.join(ROOT, "content", "gallery.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as GalleryImage[];
}

/** Plain markdown body for the About page (no frontmatter). */
export function getAboutMarkdown(): string {
  const file = path.join(ROOT, "content", "about.md");
  return fs.readFileSync(file, "utf8");
}
