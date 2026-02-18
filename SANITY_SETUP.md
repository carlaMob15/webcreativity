# Sanity CMS – Connection Overview

This doc explains how the portfolio is connected to Sanity so you can safely make CMS changes on the `porject-details-cms` branch.

## What’s connected

| Piece | Location | Purpose |
|-------|----------|--------|
| **Sanity client** | `lib/sanity.js` | Reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (fallbacks: `dvy4l5vj`, `production`). Used by the Next app to fetch content. |
| **Queries** | `lib/sanity-queries.js` | GROQ queries for projects, home, services, testimonials, site settings, etc. Imports `client` from `lib/sanity.js`. |
| **Schemas** | `sanity.config.js` | Defines document types: `project`, `offering`, `testimonial`, `siteSettings`, `navigationLink`, `experience`, `homePage`, `aboutPage` (document type `servicesPage` in Sanity), `projectsPage`. Same projectId/dataset as client. |
| **Studio** | `sanity.cli.js` | Studio host: `webcreativity` → **https://webcreativity.sanity.studio**.
| **Studio redirect** | `pages/studio/[[...index]].js` | `/studio` on the site redirects to the hosted Studio above. |
| **Revalidation API** | `pages/api/revalidate.js` | Webhook endpoint. When Sanity sends a POST with `?secret=SANITY_REVALIDATE_SECRET` and body `{ _type, slug? }`, the site revalidates the right pages (e.g. project slug → `/projects`, `/projects/[slug]`). |
| **Images** | `next.config.mjs` | `cdn.sanity.io` is in `images.domains` so Next can optimize Sanity images. |

## Project detail page (case study)

- **Data**: `getProjectBySlug(slug)` in `lib/sanity-queries.js` returns the full project document.
- **Page**: `pages/projects/[slug].jsx` — CMS projects use the flexible layout (mainImage + sections only). Legacy projects (hardcoded in `src/data/projectsData.js`) use the old layout (gallery, overview, etc.). If you see “Project not found”, ensure the document is **published** in Studio and that `slug.current` matches the URL (or add the slug to legacy data in `src/data/projectsData.js`).

## Env vars you need

Copy from `.env.example` and set in `.env.local` (and in your host’s env for production):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` – Sanity project ID (default in code: `dvy4l5vj`).
- `NEXT_PUBLIC_SANITY_DATASET` – Dataset name (default: `production`).
- `SANITY_REVALIDATE_SECRET` – Random string; must match the secret in the Sanity webhook URL.

## Webhook (optional but recommended)

So that publishing in Sanity updates the live site without a full rebuild:

1. In [sanity.io](https://sanity.io) go to your project → **API** → **Webhooks**.
2. Add a webhook:
   - **URL**: `https://YOUR_DEPLOYMENT_DOMAIN/api/revalidate?secret=YOUR_SANITY_REVALIDATE_SECRET`
   - **Trigger**: On create, update, delete (or as you prefer).
   - **Payload**: e.g. `{ "slug": "{slug.current}", "_type": "{_type}" }` for project documents, or the relevant fields for other types (see `pages/api/revalidate.js` for which `_type` values are handled).

## Running the Studio locally (clean project schema)

The **hosted** Studio at **https://webcreativity.sanity.studio** may be an older deployment and can still show legacy project fields (Description Legacy, Overview, Gallery, Technical Approach, etc.). To use the **clean** project schema (only mainImage + sections), run the Studio from this repo:

From the repo root:

```bash
npm run studio
```

(or `npx sanity dev`). This starts the Studio using this repo’s `sanity.config.js` (projectId `dvy4l5vj`, dataset `production`). Open the URL it prints (e.g. http://localhost:3333) and create/edit projects there — you’ll only see Title, Slug, Main Image, Chips, Intro, Client, Year, Role, Tools, Thumbnail Summary, Is Featured, Featured Order, and Sections. No legacy fields.

## Summary

- **Content** is edited in Sanity (webcreativity.sanity.studio or `npx sanity dev`).
- **Next app** reads it via `lib/sanity.js` + `lib/sanity-queries.js`.
- **Project details** come from the `project` schema and `getProjectBySlug`; the detail page is wired and normalized for CMS.
- **Revalidation** is wired via `/api/revalidate`; set the webhook and `SANITY_REVALIDATE_SECRET` to keep the site in sync after CMS changes.

You can proceed to update project-details (and other) content in the CMS with this setup.
