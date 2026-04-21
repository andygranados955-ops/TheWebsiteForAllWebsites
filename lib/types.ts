export type EssayFrontmatter = {
  title: string;
  description: string;
  date: string;
  /** Optional — shown on detail page */
  updated?: string;
};

export type ThoughtFrontmatter = {
  title: string;
  description: string;
  date: string;
};

export type PostMeta<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  detail: string;
};

export type Interest = {
  title: string;
  items: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};
