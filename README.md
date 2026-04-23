# Personal Web

A warm, editorial personal site built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Content lives in Markdown and JSON so you can update copy without touching React code.

## Prerequisites

- **Node.js 20+** (recommended; matches Vercel defaults)
- **npm** (ships with Node)

## Setup (local)

1. **Install dependencies**

   ```bash
   cd "/path/to/Personal Web"
   npm install
   ```

2. **Optional:** set the public site URL (used for SEO, Open Graph, RSS, and sitemap)

   Create a `.env.local` file in the project root:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

   For local development you can omit this; it defaults to `http://localhost:3000`.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Production build (sanity check)**

   ```bash
   npm run build
   npm run start
   ```

## Project layout (architecture)

```text
app/                    # Routes, layouts, metadata, RSS, sitemap
components/
  content/              # SafeMarkdown (sanitized markdown)
  essays/               # Envelope grid UI
  layout/                 # Header, footer, shell
  ui/                     # Small shared UI (headings, external links)
content/
  essays/*.md             # Essays (frontmatter + Markdown body)
  thoughts/*.md           # Shorter pieces
  stories/*.md            # Short fiction
  projects.json
  interests.json
  gallery.json
  about.md
  site.ts                 # Name, tagline, social links, base URL fallback
lib/
  content.ts              # Read Markdown / JSON from disk
  seo.ts                  # Shared metadata helper
public/
  images/gallery/         # Images referenced from gallery.json
```

- **Rendering model:** Pages are **statically generated** where possible (`generateStaticParams` for essays and thoughts). Markdown is rendered with `react-markdown`, **GitHub-flavored Markdown** (`remark-gfm`), and **HTML sanitization** (`rehype-sanitize`).
- **Security:** No third-party analytics or embed scripts. External links use `rel="noopener noreferrer"`. Security-related HTTP headers are set in `next.config.ts`.
- **Animation:** Framer Motion is used for lightweight route transitions (`app/template.tsx`) and the essay envelopes. `prefers-reduced-motion` is respected.

## Typography & palette (design notes)

- **Fraunces** (display): soft, literary serif with personality, used for headings and the site name. Feels closer to a book than a dashboard.
- **Literata** (body): designed for long reading; warm, sturdy serifs at small sizes.

Colors are defined as CSS variables in `app/globals.css` (cream paper, espresso ink, terracotta accent). Adjust there for global theming.

## Deploy on Vercel

1. Push this folder to a **Git** repository (GitHub, GitLab, or Bitbucket).

2. In [Vercel](https://vercel.com), **Import** the repository.

3. **Framework preset:** Next.js (auto-detected).

4. **Build command:** `npm run build` (default).

5. **Output:** default (`.next`).

6. **Environment variables:** add `NEXT_PUBLIC_SITE_URL` with your **production** URL, e.g. `https://your-domain.com`. This keeps canonical URLs, Open Graph links, RSS, and `sitemap.xml` correct.

7. Deploy. Vercel will run `next build` and serve the app on HTTPS.

**Custom domain:** In the Vercel project → *Settings* → *Domains*, add your domain and follow DNS instructions.

## What to edit (quick reference)

| Goal | File(s) |
|------|---------|
| **Identity & SEO:** titles, meta descriptions, canonical domain (`url`), person/social, homepage copy, index blurbs | `content/site.ts` |
| **Profile / hero photo:** file path, crop, blend, matte | Put the image in `public/images/`, set `profileImageSrc` (+ optional `profileImageFit`, `profileImageBlendMode`, `profileImageBackdrop`) in `content/site.ts` |
| Home page structure (sections, internal links) | `app/page.tsx` |
| Global colors, selection, markdown article styles | `app/globals.css` |
| Fonts | `app/layout.tsx` (Google fonts) + `app/globals.css` if you add variables |
| Essays | Add/edit `content/essays/your-slug.md` (filename = URL slug) |
| Thoughts | `content/thoughts/*.md` |
| Stories | `content/stories/*.md` |
| Projects | `content/projects.json` |
| Interests | `content/interests.json` |
| Gallery images & captions | `content/gallery.json` + files under `public/images/gallery/` |
| About page | `content/about.md` |
| Footer / nav labels | `components/layout/SiteFooter.tsx`, `components/layout/SiteHeader.tsx` |
| SEO helpers (canonical URLs, metadata merge) | `lib/seo.ts` |
| JSON-LD (Person + WebSite) | `lib/jsonld.ts` + `components/seo/SiteJsonLd.tsx` (wired in `app/layout.tsx`) |
| Security headers | `next.config.ts` |

### Essay / thought frontmatter (YAML)

```yaml
---
title: "Title in quotes if needed"
description: "Short preview line"
date: "2026-04-18"
---
```

Body is standard Markdown below the `---`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint |
| `npm run generate:icons` | Regenerate `app/favicon.ico` and `app/icon.png` from the built-in AG mark |

## License

Personal project. Use and adapt freely for your own site.
