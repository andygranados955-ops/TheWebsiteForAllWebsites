# Security

This document describes the security baseline for this site and a simple process to keep it healthy over time.

## Scope

This is a mostly static personal site built with Next.js App Router. There is no user authentication, no database, and no user-generated content submission flow.

## Current Security Posture

- Markdown content is sanitized before rendering.
- External links use `rel="noopener noreferrer"`.
- Security headers are set in `next.config.ts`.
- Canonical domain and robots/sitemap are configured for production.
- Preview deployments (`*.vercel.app`) are marked noindex.

## Pre-Deploy Checklist

Run these before pushing production updates:

```bash
npm run build
npm run lint
npm audit --omit=dev
```

If build and lint pass, deploy is generally safe for this project type.

## Dependency Vulnerabilities

If `npm audit` reports vulnerabilities:

1. Check whether they are in runtime or build tooling.
2. Do not run `npm audit fix --force` blindly.
3. Prefer upgrading the primary package (`next`, etc.) to a supported current version.
4. Re-run build/lint/audit after any dependency change.

Notes:

- Some advisories can be low practical risk for static sites.
- Still track and address them when safe updates are available.

## Content Safety Rules

- Do not commit secrets (`.env`, API keys, private tokens).
- Keep email/contact info intentional and public-only.
- Prefer local images under `public/images/...` rather than remote untrusted sources.

## Browser and Search Security Signals

- Keep `app/robots.ts` and `app/sitemap.ts` aligned to the canonical domain.
- Keep `app/favicon.ico` and `app/icon.png` present and valid.
- Keep structured data (`JSON-LD`) clean and accurate.

## Incident Response (If Something Looks Wrong)

If you suspect a security issue:

1. Stop deploying new changes.
2. Check latest commits and dependency updates.
3. Rotate any exposed credentials immediately.
4. Revert to last known-good deployment.
5. Patch and redeploy with verification.

## Responsible Disclosure

For this personal project, report issues directly to the site owner via the contact email shown on the site.
