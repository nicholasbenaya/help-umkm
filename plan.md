# Nadia Collection — Engineering Plan (JSM HQ)

> **Important for JSM HQ:** This root `plan.md` is the human/lead planning brief. **Never** create or edit `docs/plan.md` manually (JSM HQ overwrites `docs/plan.md` when plan export is enabled).
>
> **Required reading before creating or starting any task:**
> - `ROLE.md` — Hard guardrails & monorepo rules
> - `nadia-collection/PRD.md` — Full product requirements, CMS content model, and Decision Gate status
> - `nadia-collection/DESIGN.md` — Design system & visual rules *(created in Phase 1 before UI work)*

---

## Project Overview & Stack

- **Project:** Nadia Collection — Personal Brand & Multi-Venture Showcase (Afisa Bouquet, Nadia Artistry MUA, and future ventures)
- **Active Directory:** `nadia-collection/` (inside monorepo `help-umkm`; legacy v1 is archived read-only at `archive/nadia-studio-v1/`)
- **Tech Stack:**
  - **Framework:** Next.js (App Router, TypeScript) in `nadia-collection`
  - **Styling:** Tailwind CSS
  - **CMS:** Sanity CMS Free Tier (`sanity`, `next-sanity`, `@sanity/image-url`) with Embedded Studio at `/studio` (`docs: https://www.sanity.io/docs`)
  - **Deployment:** Vercel Free Tier (Root Directory: `nadia-collection`)
- **Workflow Rules (JSM HQ):**
  - **One task = one branch = one PR** titled `[TASK-ID] Short title`.
  - Workers may **only edit files listed under `Files`** for their assigned task.
  - All PRs must pass `npm run lint` and `npm run build` inside `nadia-collection/` (from Phase 2 onward).

---

## Phase 1 — Design System & Figma Exploration (`P1`)

> **Goal:** Lock down visual direction (`DESIGN.md`) and design both layout options in Figma so the client can choose **Option 1** or **Option 2** before any frontend UI coding begins.

### `P1-T01` — Generate `DESIGN.md` from Reference Websites
- **Role:** Designer / Lead (with Human input)
- **Needs:** none (waits for user to supply 2–3 reference websites via `ask_user` if not yet provided)
- **Files:** `nadia-collection/DESIGN.md`
- **Description:** Translate the user's reference websites and brand direction into a concrete design specification covering color tokens, typography scale, spacing/grid rhythm, component rules, mobile-first breakpoints, placeholder art direction, and anti-patterns.
- **Done when:** `nadia-collection/DESIGN.md` is committed on `main` and approved by the user.

### `P1-T02` — Design Option 1 & Option 2 in Figma + Placeholder Brand Logos
- **Role:** Designer (with Figma MCP access)
- **Needs:** `P1-T01`
- **Files:** `nadia-collection/DESIGN.md`, `nadia-collection/public/logos/nadia-collection-logo.svg`, `nadia-collection/public/logos/afisa-bouquet-logo.svg`, `nadia-collection/public/logos/nadia-artistry-logo.svg`
- **Description:** Using `nadia-collection/PRD.md` and `nadia-collection/DESIGN.md`, create clean Figma frames for both **Option 1 (Single-Page Personal Hub)** and **Option 2 (Personal Hub + `/ventures/[slug]` Detail Pages)** in Desktop (`1440px`) and Mobile (`390px`), plus regenerated minimal placeholder SVG logos (editable/replaceable later in Sanity CMS). Record the Figma file/frame URLs in `nadia-collection/DESIGN.md`.
- **Done when:** Both Figma options (desktop + mobile) are accessible in Figma, 3 clean SVG placeholder logos exist in `nadia-collection/public/logos/`, and Figma URLs are documented in `nadia-collection/DESIGN.md`.

### `P1-T03` — Client Decision Gate (Select Final Layout Option)
- **Role:** Lead (`ask_user` — Human/Client approval)
- **Needs:** `P1-T02`
- **Files:** `nadia-collection/PRD.md`, `plan.md`
- **Description:** Pause via `ask_user` so the user can present Option 1 and Option 2 in Figma to Nadia. Once Nadia selects one option, record the approved decision (`Option 1` or `Option 2`) in `nadia-collection/PRD.md` and unlock Phase 3.
- **Done when:** `Selected Layout Option` in `nadia-collection/PRD.md` is updated from `PENDING` to `Option 1` or `Option 2` on `main`.

---

## Phase 2 — Next.js Foundation & Sanity CMS Setup (`P2`)

> **Goal:** Establish a clean, minimal Next.js TypeScript codebase and Sanity CMS Embedded Studio (`/studio`). Can start in parallel with `P1-T02` because CMS schemas support both Option 1 and Option 2 identically.

### `P2-T01` — Scaffold Next.js App & Monorepo Hygiene
- **Role:** Developer
- **Needs:** none
- **Files:** `nadia-collection/package.json`, `nadia-collection/package-lock.json`, `nadia-collection/tsconfig.json`, `nadia-collection/next.config.ts`, `nadia-collection/postcss.config.mjs`, `nadia-collection/eslint.config.mjs`, `nadia-collection/.env.example`, `nadia-collection/app/layout.tsx`, `nadia-collection/app/page.tsx`, `nadia-collection/app/globals.css`
- **Description:** Initialize a clean Next.js App Router + TypeScript + Tailwind CSS project inside `nadia-collection/`. Configure `next.config.ts` to allow `cdn.sanity.io` in `images.remotePatterns`. Add `.env.example` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_REVALIDATE_SECRET`. Keep the initial homepage minimal.
- **Done when:** `npm run lint` and `npm run build` succeed cleanly inside `nadia-collection/` with zero warnings/errors.

### `P2-T02` — Define Sanity Schemas, Typed Client & Graceful Fallback Data
- **Role:** Developer
- **Needs:** `P2-T01`
- **Files:** `nadia-collection/package.json`, `nadia-collection/package-lock.json`, `nadia-collection/sanity/env.ts`, `nadia-collection/sanity/schemaTypes/siteSettings.ts`, `nadia-collection/sanity/schemaTypes/venture.ts`, `nadia-collection/sanity/schemaTypes/index.ts`, `nadia-collection/lib/sanity/client.ts`, `nadia-collection/lib/sanity/image.ts`, `nadia-collection/lib/sanity/queries.ts`, `nadia-collection/lib/sanity/types.ts`, `nadia-collection/lib/sanity/fallback.ts`
- **Description:** Install `sanity`, `next-sanity`, and `@sanity/image-url`. Implement the exact `siteSettings` singleton and `venture` document schemas defined in `nadia-collection/PRD.md` (Section 6). Build typed GROQ queries and a graceful fallback dataset (`fallback.ts`) containing Nadia Collection, Afisa Bouquet (Samarinda), and Nadia Artistry (service area optional/empty) with clean placeholder references so the app builds and renders cleanly even when Sanity env vars are unset.
- **Done when:** TypeScript types match all PRD schema fields, `getSiteData()` safely falls back when `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty, and `npm run lint && npm run build` passes.

### `P2-T03` — Mount Embedded Sanity Studio (`/studio`) & Seed Helper
- **Role:** Developer
- **Needs:** `P2-T02`
- **Files:** `nadia-collection/sanity.config.ts`, `nadia-collection/sanity/structure.ts`, `nadia-collection/app/studio/[[...tool]]/page.tsx`, `nadia-collection/app/studio/[[...tool]]/layout.tsx`, `nadia-collection/scripts/seed-sanity.mjs`
- **Description:** Configure Sanity Studio with a clean Desk Structure (putting `Site Settings` singleton cleanly at top, followed by `Ventures` ordered by `order`). Mount Embedded Studio at `/studio` with `noindex` metadata. Add an optional one-command seed script (`scripts/seed-sanity.mjs`) so initial documents for Nadia Collection, Afisa Bouquet, and Nadia Artistry can be populated once the Sanity project ID & write token are created.
- **Done when:** `/studio` compiles cleanly (and renders a clear setup prompt if `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing instead of crashing), Desk Structure enforces singleton `siteSettings`, and `npm run lint && npm run build` passes.

---

## Phase 3 — Frontend UI Implementation (`P3`)

> **GATE:** Do **NOT** assign Phase 3 tasks until **`P1-T03` (Client Decision Gate)** is marked `done` and `nadia-collection/DESIGN.md` exists.

### `P3-T01` — Design Tokens, Base Shell, Navigation & WhatsApp Utility
- **Role:** Developer
- **Needs:** `P1-T03`, `P2-T02`
- **Files:** `nadia-collection/app/globals.css`, `nadia-collection/app/layout.tsx`, `nadia-collection/lib/whatsapp.ts`, `nadia-collection/components/BrandLogo.tsx`, `nadia-collection/components/Navbar.tsx`, `nadia-collection/components/Footer.tsx`, `nadia-collection/components/WhatsAppButton.tsx`
- **Description:** Apply exact colors, typography, spacing, and visual tokens from `nadia-collection/DESIGN.md`. Implement `buildWhatsAppUrl(venture, settings)` with `whatsappNumberOverride || defaultWhatsappNumber` fallback. Build `BrandLogo` (renders CMS uploaded image if present, falls back cleanly to placeholder SVG or wordmark), responsive `Navbar`, and `Footer`.
- **Done when:** Tokens match `DESIGN.md`, `BrandLogo` handles both CMS images and SVG fallback, WhatsApp URLs properly encode Indonesian messages, and `npm run lint && npm run build` passes.

### `P3-T02` — Personal Brand Hub Page (`/`)
- **Role:** Developer
- **Needs:** `P3-T01`
- **Files:** `nadia-collection/app/page.tsx`, `nadia-collection/components/HeroSection.tsx`, `nadia-collection/components/FounderSection.tsx`, `nadia-collection/components/VenturesShowcase.tsx`, `nadia-collection/components/PlaceholderMedia.tsx`
- **Description:** Build the homepage strictly following the approved Figma option (`Option 1` or `Option 2`) and `DESIGN.md`. Dynamically render all `isActive` ventures ordered by `order` so adding future ventures in Sanity requires zero code changes. Use dignified editorial placeholders via `PlaceholderMedia` when photos are not yet uploaded.
- **Done when:** Homepage matches approved Figma frames on both `390px` mobile and `1440px` desktop, displays dynamic ventures from Sanity/fallback, and `npm run lint && npm run build` passes.

### `P3-T03` — Showcase Gallery Lightbox & Venture Detail Route
- **Role:** Developer
- **Needs:** `P3-T02`
- **Files:** `nadia-collection/components/ShowcaseGallery.tsx`, `nadia-collection/components/LightboxModal.tsx`, `nadia-collection/app/ventures/[slug]/page.tsx` *(if Option 2 approved)*
- **Description:** Build the responsive showcase gallery and accessible lightbox modal (`Esc` key close, backdrop click close, focus return, prev/next navigation). If **Option 2** is approved, implement `app/ventures/[slug]/page.tsx` with static params (`generateStaticParams`), service area badge (hidden when empty, e.g., MUA TBD), service highlights, optional external tool banner (hidden when empty), gallery, and venture-specific WhatsApp CTA. If **Option 1** is approved, wire the gallery & lightbox cleanly into each venture section on `/`.
- **Done when:** Gallery and lightbox work smoothly on mobile and desktop with full keyboard accessibility, optional fields degrade cleanly when empty, and `npm run lint && npm run build` passes.

### `P3-T04` — SEO Metadata, Sitemap & Sanity Revalidation Webhook
- **Role:** Developer
- **Needs:** `P3-T03`
- **Files:** `nadia-collection/app/layout.tsx`, `nadia-collection/app/ventures/[slug]/page.tsx`, `nadia-collection/app/robots.ts`, `nadia-collection/app/sitemap.ts`, `nadia-collection/app/api/revalidate/route.ts`
- **Description:** Implement dynamic `generateMetadata` driven by Sanity `siteSettings` and `venture` documents, `robots.ts` (disallowing `/studio`), `sitemap.ts` (including active ventures), and a lightweight `POST /api/revalidate` endpoint verified with `SANITY_REVALIDATE_SECRET` so CMS edits reflect immediately on Vercel.
- **Done when:** `/robots.txt` excludes `/studio`, `/sitemap.xml` lists active pages, `/api/revalidate` rejects invalid secrets with `401` and revalidates tags on valid requests, and `npm run lint && npm run build` passes.

---

## Phase 4 — QA, Handover Guide & Deployment (`P4`)

### `P4-T01` — Responsive, Accessibility & Performance QA Pass
- **Role:** QA / Developer
- **Needs:** `P3-T04`
- **Files:** `nadia-collection/app/**`, `nadia-collection/components/**` *(fixes scoped only to verified QA issues)*
- **Description:** Audit all pages at `390px`, `768px`, and `1440px`, verify contrast ratios, alt attributes, keyboard navigation, WhatsApp redirect links, empty/placeholder CMS states, and production bundle health. Fix any layout overflow or accessibility issues found.
- **Done when:** Zero console errors, zero horizontal overflow on mobile, all WhatsApp CTAs verified, and `npm run lint && npm run build` passes cleanly.

### `P4-T02` — Client CMS Guide & Monorepo Documentation
- **Role:** Developer / Docs
- **Needs:** `P4-T01`
- **Files:** `nadia-collection/PANDUAN_CMS.md`, `README.md`
- **Description:** Write a concise, non-technical Bahasa Indonesia guide (`nadia-collection/PANDUAN_CMS.md`) showing Nadia step-by-step how to log into `/studio` to edit her brand name, replace logos, change WhatsApp numbers, upload showcase photos, and add a new business venture. Update root `README.md` with Nadia Collection deployment & status info.
- **Done when:** Guide covers every CMS action in FR-01 through FR-06 in clear Bahasa Indonesia, and root `README.md` accurately reflects the repo structure.

---

## Suggested Lead Agent Kickoff Message (Inside JSM HQ)

When launching JSM HQ (`Local mode` with Antigravity `agy` agents), send this to the Lead Agent:

> Read `ROLE.md`, `nadia-collection/PRD.md`, and `plan.md`. Create boards for `Phase 1 — Design` (active) and `Phase 2 — Foundation & CMS` (active). Do not start Phase 3 until `P1-T03` is approved. Create the Phase 1 and Phase 2 tasks with their exact file lists and `doneWhen` criteria, then tell me what you need from me first (reference websites for `DESIGN.md` and Figma access).
