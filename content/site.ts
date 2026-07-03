/**
 * Site-wide copy, SEO, and identity. Edit this file to change most public text.
 *
 * Essays: `content/essays/*.md` (YAML `title`). Thoughts: `content/thoughts/*.md`.
 * Stories: `content/stories/*.md`.
 * Projects: `content/projects.json`. Interests: `content/interests.json`.
 * About body: `content/about.md`.
 */
const CANONICAL_PRODUCTION_URL = "https://www.andygranados.com";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const normalized = fromEnv.replace(/\/$/, "");
    if (
      process.env.NODE_ENV !== "development" &&
      normalized.includes("localhost")
    ) {
      return CANONICAL_PRODUCTION_URL;
    }
    return normalized;
  }
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return CANONICAL_PRODUCTION_URL;
}

export const siteConfig = {
  name: "Andy Granados",
  author: "Andy Granados",
  /** Canonical origin for metadata, sitemap, and robots */
  url: resolveSiteUrl(),
  locale: "en_US",

  /** Short line under the name on the home hero */
  tagline: "Essays, thoughts, stories, and projects.",
  /** Home hero paragraph (visible). Keep aligned with `seo.homeMetaDescription` themes. */
  homepageIntro:
    "I’m Andy Granados, a bioengineering student at UIUC. This is my personal site for essays, thoughts, stories, pictures, and projects tied to soft robotics and the ideas I keep exploring.",
  bio: "Andy Granados, bioengineering at UIUC, soft robotics, writing, and personal notes.",
  profileImageSrc: "/images/andy-granados.jpg",
  profileImageAlt: "Andy Granados",
  profileImageShape: "soft" as "soft" | "circle" | "square",
  /** Photos usually look best with `cover`; logos with `contain` */
  profileImageFit: "cover" as "cover" | "contain",
  /**
   * `normal`: show the file as-is (use with a white matte via `profileImageBackdrop`, or real PNG alpha).
   * `multiply`: black line art on white, no alpha (blends into the page; can look wrong if the file is not white-backed).
   * `screen`: white line art on dark background, no alpha.
   */
  profileImageBlendMode: "normal" as "normal" | "screen" | "multiply",
  /** `white`: solid white behind the image (matches JPEG line art). `transparent`: for PNG or WebP with alpha. */
  profileImageBackdrop: "white" as "white" | "transparent",
  profileShowPlaceholderHint: false,

  /** Line under “Essays” on the essays index (envelope interaction hint) */
  essaysPageDescription:
    "Open on hover for long-form essays, shared as letters.",

  /** Line under “Stories” on the stories page */
  storiesPageDescription:
    "Open on hover to reveal personal stories.",

  /** Line under “Projects” on the projects page. Edit this text here. */
  projectsPageDescription:
    "Things I'm proud of.",

  /**
   * Search and social metadata: titles, descriptions, identity for Google, Open Graph, and Twitter.
   * Keep phrasing natural; avoid repeating the same sentence everywhere.
   */
  seo: {
    /** Default `<title>` suffix via template on inner pages: "Essays · …" */
    titleTemplateBrand: "Andy Granados",
    /** Homepage tab title (full string, not templated) */
    homeDocumentTitle:
      "Andy Granados | Bioengineering at UIUC, Essays and Projects",
    /** Primary meta description for the homepage (~150 to 160 chars is ideal) */
    homeMetaDescription:
      "Andy Granados personal website featuring essays, thoughts, stories, projects, gallery photos, and contact. Bioengineering student at UIUC focused on soft robotics.",
    /** Default meta description when a page does not set its own */
    defaultMetaDescription:
      "Andy Granados | Bioengineering at the University of Illinois Urbana-Champaign (UIUC). Personal site with essays, thoughts, stories, writing, and projects.",
    /** Open Graph / social site name */
    ogSiteName: "Andy Granados",
    /** About page meta description */
    aboutMetaDescription:
      "About Andy Granados | bioengineering at UIUC, soft robotics, and how to get in touch.",
    /** Index pages */
    essaysIndexDescription:
      "Essays by Andy Granados | longer personal writing, ideas, and notes.",
    thoughtsIndexDescription:
      "Thoughts and short notes by Andy Granados.",
    storiesIndexDescription:
      "Stories by Andy Granados | short fiction, scenes, and narrative experiments.",
    galleryIndexDescription:
      "Pictures and visual notes on Andy Granados's personal website.",
    projectsIndexDescription:
      "Projects and milestones | Andy Granados, UIUC bioengineering and personal work.",
    interestsIndexDescription:
      "Interests and curiosities | Andy Granados' personal site.",
  },

  /**
   * Person facts for JSON-LD (schema.org Person). Align with visible About page.
   * Optional `social` entries add schema.org `sameAs` only (not shown in the footer).
   */
  person: {
    /** Same one-liner can appear in structured data */
    description:
      "Andy Granados is a bioengineering student at the University of Illinois Urbana-Champaign (UIUC), interested in soft robotics. This website publishes personal essays, thoughts, stories, and projects.",
    jobTitle: "Student",
    affiliation: {
      name: "University of Illinois Urbana-Champaign",
      alternateName: "UIUC",
    },
    department: "Bioengineering",
    /** Topics for schema.org knowsAbout. Keep in sync with how you describe yourself on the site. */
    knowsAbout: [
      "Bioengineering",
      "Soft robotics",
      "Writing",
      "University of Illinois Urbana-Champaign",
    ] as const,
  },

  /** Contact: email is the only link shown in the footer and colophon */
  links: {
    email: "andygranados955@gmail.com",
  },
  /**
   * Optional extra profile URLs for JSON-LD `sameAs` only (not shown in the UI).
   * Leave empty if you only want email as your public contact.
   */
  social: [] as { label: string; href: string }[],
  homeHighlights: [
    {
      href: "/essays",
      title: "Essays",
      copy: "Longer pieces saved as letters.",
    },
    {
      href: "/thoughts",
      title: "Thoughts",
      copy: "Short notes.",
    },
    {
      href: "/stories",
      title: "Stories",
      copy: "Narrative pieces with a book-style layout.",
    },
    {
      href: "/gallery",
      title: "Pictures",
      copy: "Photos from lab life and everyday scenes.",
    },
  ],
} as const;
