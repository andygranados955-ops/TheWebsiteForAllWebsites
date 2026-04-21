import type { EssayFrontmatter, ThoughtFrontmatter, PostMeta } from "@/lib/types";

function parseDate(d: string): number {
  return new Date(d).getTime();
}

export function sortEssaysNewestFirst(
  posts: PostMeta<EssayFrontmatter>[],
): PostMeta<EssayFrontmatter>[] {
  return [...posts].sort(
    (a, b) => parseDate(b.frontmatter.date) - parseDate(a.frontmatter.date),
  );
}

export function sortThoughtsNewestFirst(
  posts: PostMeta<ThoughtFrontmatter>[],
): PostMeta<ThoughtFrontmatter>[] {
  return [...posts].sort(
    (a, b) => parseDate(b.frontmatter.date) - parseDate(a.frontmatter.date),
  );
}
