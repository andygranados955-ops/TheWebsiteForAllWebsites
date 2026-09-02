import { getAllEssays, getAllStories, getAllThoughts } from "@/lib/content";
import {
  sortEssaysNewestFirst,
  sortStoriesNewestFirst,
  sortThoughtsNewestFirst,
} from "@/lib/sort";

export type RecentUploadKind = "essay" | "thought" | "story";

export type RecentUpload = {
  kind: RecentUploadKind;
  slug: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

const kindLabels: Record<RecentUploadKind, string> = {
  essay: "Essay",
  thought: "Thought",
  story: "Story",
};

export function getRecentUploadLabel(kind: RecentUploadKind): string {
  return kindLabels[kind];
}

const pathByKind: Record<RecentUploadKind, string> = {
  essay: "essays",
  thought: "thoughts",
  story: "stories",
};

function toRecentUpload(
  kind: RecentUploadKind,
  slug: string,
  title: string,
  description: string,
  date: string,
): RecentUpload {
  return {
    kind,
    slug,
    title,
    description,
    date,
    href: `/${pathByKind[kind]}/${slug}`,
  };
}

/** Latest essay, thought, and story, sorted newest first. */
export function getRecentUploads(): RecentUpload[] {
  const items: RecentUpload[] = [];

  const latestEssay = sortEssaysNewestFirst(getAllEssays())[0];
  if (latestEssay) {
    items.push(
      toRecentUpload(
        "essay",
        latestEssay.slug,
        latestEssay.frontmatter.title,
        latestEssay.frontmatter.description,
        latestEssay.frontmatter.date,
      ),
    );
  }

  const latestThought = sortThoughtsNewestFirst(getAllThoughts())[0];
  if (latestThought) {
    items.push(
      toRecentUpload(
        "thought",
        latestThought.slug,
        latestThought.frontmatter.title,
        latestThought.frontmatter.description,
        latestThought.frontmatter.date,
      ),
    );
  }

  const latestStory = sortStoriesNewestFirst(getAllStories())[0];
  if (latestStory) {
    items.push(
      toRecentUpload(
        "story",
        latestStory.slug,
        latestStory.frontmatter.title,
        latestStory.frontmatter.description,
        latestStory.frontmatter.date,
      ),
    );
  }

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
