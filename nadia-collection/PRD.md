# Product Requirements Document (PRD) — Nadia Collection

| Field | Value |
| :--- | :--- |
| **Project Name** | Nadia Collection (Personal Brand & Multi-Venture Showcase) |
| **Workspace Path** | `nadia-collection/` (inside monorepo `help-umkm`) |
| **Legacy Archive** | `archive/nadia-studio-v1/` (read-only reference, do not reuse architecture) |
| **Document Status** | `v1.2: Option 2 APPROVED (Phase 1 Decision Gate Passed, Phase 3 Unlocked)` |
| **Selected Layout Option** | **APPROVED: Option 2 (Personal Hub `/` + Dedicated Venture Detail Pages `/ventures/[slug]`)** *([Figma Design File](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo))* |
| **Target Monthly Cost** | **Rp 0 / bulan** (Vercel Free Tier + Sanity CMS Free Tier) |

---

## 1. Executive Summary & Problem Statement

### Background
**Nadia** is a local entrepreneur who runs multiple creative business ventures under her personal brand (**Nadia Collection** as the default umbrella name), with plans to add more ventures in the future.

### Why Rebuild (v1 → v2)
The previous version (`archive/nadia-studio-v1/`) failed two real-client requirements:
1. **Visual quality:** Did not look polished or trustworthy enough for a real personal brand.
2. **Architectural bloat:** Over-assumed requirements created three overlapping custom admin routes (`/admin`, `/studio-admin`, `/kelola-studio`), mixed local JSON (`db.json`) with Supabase and custom PIN/crypto auth — creating maintenance overhead for what should be a straightforward showcase site.

### v2 Goal
Deliver a **clean, editorial, mobile-first personal branding website** that:
- Presents Nadia and her business ventures professionally under one unified home.
- Scales naturally when Nadia launches new ventures (3, 4, 5+) without code rewrites.
- Converts interested visitors directly to **WhatsApp** with clear, pre-filled messages.
- Lets Nadia update her brand name, logos, WhatsApp number, photos, and ventures herself through **Sanity CMS Embedded Studio (`/studio`)** at **Rp 0/bulan**, with zero custom backend/auth code to maintain.

---

## 2. Target Audience, Market & Language

- **Primary Audience:** Indonesian customers discovering Nadia via Instagram, WhatsApp referrals, or word of mouth.
- **Geographic Market:**
  - **Afisa Bouquet:** Local market in **Samarinda, Kalimantan Timur**.
  - **Nadia Artistry (MUA):** Service area is **not finalized yet (TBD)** — must be an **optional, editable text field in CMS** (never hardcoded as Samarinda-only).
- **Language & Copywriting Tone:**
  - **Indonesian-first with refined English accents** (*campuran Indonesia–Inggris yang elegan* — e.g., natural Indonesian body copy with crisp English section labels/subheadings where fitting).
  - Warm, personal, confident, and uncluttered. No hype buzzwords or generic placeholder sales copy.

---

## 3. Scope Boundaries

### In-Scope (MVP v2)
1. **Personal Brand Hub:** Introduces Nadia, her brand identity (default: *Nadia Collection*, editable in CMS), and all active ventures.
2. **Scalable Multi-Venture Showcase:** Initially populated with **Afisa Bouquet** and **Nadia Artistry (MUA)**; adding or hiding ventures in Sanity Studio automatically updates the site.
3. **Direct WhatsApp Conversion:** Every venture and global contact action opens WhatsApp (`https://wa.me/...`) with a pre-filled Indonesian message identifying which venture/item the visitor is asking about.
   - Uses one **default WhatsApp number** (`6282154309113` / `0821-5430-9113`), editable anytime in CMS.
   - Supports an optional **per-venture WhatsApp number override** in CMS if a venture later has a separate admin.
4. **Headless CMS (Sanity Free Tier + Embedded Studio `/studio`):**
   - Nadia signs in with her own Sanity/Google account at `/studio`.
   - Editable fields: brand name, main logo, per-venture logos, founder bio & photo, default WhatsApp & message templates, social links, ventures list (CRUD + ordering + show/hide), service highlights, and showcase photo galleries.
5. **Fresh Placeholder Brand Assets:**
   - Clean regenerated placeholder SVG logos for *Nadia Collection*, *Afisa Bouquet*, and *Nadia Artistry* — always overridable by uploading a new logo image in Sanity Studio.
   - Tasteful editorial placeholder images for showcase items until Nadia uploads real photos via `/studio`.
6. **Pre-Build Design Exploration in Figma:**
   - Design Agent creates **Option 1** and **Option 2** in Figma based on `DESIGN.md` so the client can choose before frontend implementation begins.
7. **Production Readiness:** Responsive mobile-first UI, Next.js Image + Sanity CDN optimization, on-demand revalidation/ISR, SEO & OpenGraph metadata, and Vercel deployment from monorepo subfolder `nadia-collection`.

### Explicitly Out of Scope (Do NOT Build)
- Custom authentication, PIN gates, or custom-coded admin dashboards (Sanity Studio handles 100% of CMS auth and editing).
- Database servers or ORMs (Supabase, PostgreSQL, Prisma, local `db.json`).
- Shopping cart, checkout flow, online payment gateway, shipping calculator, or inventory stock tracking.
- Automated MUA booking calendar / slot scheduler.
- Custom traffic/click analytics dashboard.
- **3D Bouquet Builder / Custom Request Configurator:** Deliberately excluded from this repository. It will be built separately as a standalone, subscription-based embeddable product that can be injected into client websites later. *(Only a lightweight, optional `externalActionUrl` + `externalActionLabel` link field is kept in the `venture` CMS schema so a link to an external tool can be attached in the future if desired — hidden whenever empty.)*

---

## 4. Initial Ventures & Baseline Contact Data

*(All values below serve as initial seed/fallback defaults and MUST be editable in Sanity Studio.)*

| Entity | Default Name | Category | Location / Market | Instagram | WhatsApp |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Personal Brand (Parent)** | Nadia Collection | Personal Brand Hub | Samarinda (default context) | `https://www.instagram.com/nadiaanfh/` | `6282154309113` (default) |
| **Venture #1** | Afisa Bouquet | Florist & Custom Bouquet (satin, wisuda, money, snack, pipe cleaner, hampers) | Samarinda, Kalimantan Timur *(workshop address editable in CMS)* | `https://www.instagram.com/afisabouquet/` | Inherits default *(overrideable in CMS)* |
| **Venture #2** | Nadia Artistry | Makeup Artist (wisuda, lamaran, event, wedding) | *TBD — optional editable field in CMS* | `https://www.instagram.com/nadiaanfh/` *(editable)* | Inherits default *(overrideable in CMS)* |

---

## 5. Layout Options for Figma Exploration (Design Brief & Decision Gate)

Before Web Dev agents write frontend UI code (Phase 3), the **Design Agent** will design **both options below in Figma** (Desktop `1440px` and Mobile `390px` viewports) following `nadia-collection/DESIGN.md`, so Nadia can review and select **one** final layout.

### Option 1 — Single-Page Personal Hub (`/`)
- **Structure:**
  1. **Minimal Header:** Brand logo/wordmark (editable from CMS), quick anchor links to active ventures, primary WhatsApp CTA.
  2. **Editorial Hero:** Personal brand statement for Nadia, concise positioning line, founder visual/placeholder, quick venture jump pills.
  3. **Founder Story (Brief):** Short, authentic bio of Nadia & the philosophy behind her ventures.
  4. **Venture Showcase Sections (Repeatable per Active Venture):**
     - Venture logo/name, category tag, optional service area badge.
     - Short description + optional service/price highlights (e.g., starting price hints).
     - Curated showcase photo grid (3–6 highlight photos) with clean zoom/lightbox view.
     - Dedicated **"Chat via WhatsApp"** CTA button with venture-specific pre-filled message.
  5. **Footer:** Social links, brand note, and direct WhatsApp contact.
- **Pros:** Immediate overview on a single scroll; luxury link-in-bio feel; fastest to build and navigate.
- **Trade-off:** Becomes longer as Nadia adds 4+ ventures; no dedicated per-venture URL for Instagram bios (only `#anchor` links).

### Option 2 — Personal Hub (`/`) + Dedicated Venture Detail Pages (`/ventures/[slug]`)
- **Structure of `/` (Personal Brand Hub):**
  1. **Minimal Header:** Brand logo/wordmark, navigation (`Home`, active ventures list/dropdown, WhatsApp CTA).
  2. **Editorial Hero:** Focuses purely on Nadia's personal brand identity.
  3. **Venture Directory:** High-craft editorial cards for each active venture (cover visual, venture logo, category, short hook, **"Lihat Showcase"** link to `/ventures/[slug]`, and quick WhatsApp action). Scales cleanly from 2 to 6+ ventures.
  4. **Founder Note + Selected Visual Strip:** Concise personal story & curated cross-venture highlights.
  5. **Footer:** Social links & direct WhatsApp CTA.
- **Structure of `/ventures/[slug]` (Dynamic Template for Every Venture):**
  1. **Breadcrumb / Back to Hub** + Venture Hero (venture logo, name, tagline, optional location badge, primary WhatsApp CTA).
  2. **About & Key Offerings:** Description + optional structured highlights (e.g., bouquet types / MUA package tiers & starting price hints).
  3. **Full Showcase Gallery:** Responsive photo grid with lightbox preview and optional captions/tags.
  4. **Optional Future Tool Banner:** Hidden by default; renders cleanly if `externalActionUrl` is populated in CMS (e.g., future standalone 3D Bouquet Builder).
  5. **Bottom Conversion Bar:** Venture-specific WhatsApp CTA + quick links to Nadia's other ventures.
- **Pros:** Scales effortlessly as Nadia launches new businesses; each venture gets its own clean shareable URL for Instagram bio (`.../ventures/afisa-bouquet`, `.../ventures/nadia-artistry`); cleaner future integration slot for standalone tools.
- **Trade-off:** Requires one extra dynamic route template (`/ventures/[slug]`) compared to Option 1.

### Decision Gate Checklist
- [x] Reference websites collected from user & `nadia-collection/DESIGN.md` generated.
- [x] Figma frames completed for **Option 1** (Desktop + Mobile) and **Option 2** (Desktop + Mobile) in [Nadia Collection: Design Exploration](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo).
- [x] Client (Nadia) selected final option: **APPROVED Option 2 (Personal Hub `/` + `/ventures/[slug]` Detail Pages)**. Approved Figma frames: [Foundations](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=3-16), [Hub Desktop](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-391), [Hub Mobile](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-536), [Afisa Bouquet Detail Desktop](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-600), [Nadia Artistry Detail Desktop](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-799), [Venture Detail Mobile](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-979), and [Lightbox Modal](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo?node-id=5-369). Phase 3 is now unlocked.

---

## 6. Content Model (Sanity CMS Schemas)

All content lives in Sanity CMS (`production` dataset) with TypeScript types mirrored in `nadia-collection/lib/sanity/types.ts`.

### 6.1 `siteSettings` (Singleton)
| Field | Type | Required | Purpose |
| :--- | :--- | :--- | :--- |
| `brandName` | `string` | Yes | Main display name (default: `"Nadia Collection"`), editable anytime by Nadia. |
| `brandLogo` | `image` | No | Uploadable SVG/PNG/WebP logo. Falls back to clean placeholder SVG / wordmark if empty. |
| `tagline` | `string` | Yes | Short personal brand headline. |
| `founderName` | `string` | Yes | Default: `"Nadia"`. |
| `founderBio` | `text` | Yes | Concise founder introduction. |
| `founderPhoto` | `image` (hotspot) | No | Portrait photo (uses editorial placeholder if empty). |
| `defaultWhatsappNumber` | `string` | Yes | Digits only with country code (default: `"6282154309113"`). |
| `defaultWhatsappMessage` | `string` | Yes | Default pre-filled greeting for general inquiries. |
| `socialLinks` | `array<{ platform, label, url }>` | No | Instagram, TikTok, etc. |
| `seoTitle` / `seoDescription` / `ogImage` | `string` / `image` | No | Search & WhatsApp/social link preview metadata. |

### 6.2 `venture` (Repeatable Document — Unlimited Ventures)
| Field | Type | Required | Purpose |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Venture name (e.g., `"Afisa Bouquet"`, `"Nadia Artistry"`). |
| `slug` | `slug` | Yes | URL/anchor identifier (auto-generated from `name`). |
| `order` | `number` | Yes | Manual display ordering (`1`, `2`, `3`, ...). |
| `isActive` | `boolean` | Yes | Toggle to show/hide a venture without deleting it. |
| `logo` | `image` | No | Optional venture-specific logo (editable/replaceable in CMS). |
| `category` | `string` | Yes | Short label (e.g., `"Florist & Custom Bouquet"`, `"Makeup Artist"`). |
| `shortDescription` | `text` | Yes | 1–2 sentence summary for Hub overview. |
| `fullDescription` | `text` | No | Expanded story/details for the showcase section or detail page. |
| `serviceArea` | `string` | No | Optional location badge (e.g., `"Samarinda, Kalimantan Timur"` for Afisa Bouquet; leave empty or set freely for MUA). |
| `whatsappNumberOverride` | `string` | No | Optional dedicated WA number; falls back to `siteSettings.defaultWhatsappNumber` when empty. |
| `whatsappMessageTemplate` | `string` | Yes | Pre-filled WA message when clicking CTA on this venture. |
| `instagramUrl` | `url` | No | Venture-specific Instagram profile link. |
| `coverImage` | `image` (hotspot) | No | Primary visual for venture card/hero (clean placeholder if empty). |
| `highlights` | `array<{ title, priceHint?, note? }>` | No | Optional list of key services/offerings or starting price hints. |
| `gallery` | `array<{ image (hotspot), caption?, tag? }>` | No | Showcase photos; clicking an item opens clean lightbox preview. |
| `externalActionLabel` / `externalActionUrl` | `string` / `url` | No | Optional future hook (e.g., external 3D Bouquet Builder link). Hidden when empty. |

---

## 7. Functional Requirements & Acceptance Criteria

- **FR-01 — Self-Editable Brand Identity:** Nadia can change `brandName`, upload/replace `brandLogo`, and upload/replace per-venture `logo` inside `/studio`, and the live site reflects changes without code edits.
- **FR-02 — Scalable Multi-Venture Rendering:** Creating a new active `venture` document in `/studio` automatically displays it in the navigation, Hub showcase, and (if Option 2) generates `/ventures/[slug]` with zero code changes.
- **FR-03 — Smart WhatsApp Redirect:** Every WhatsApp CTA builds a valid `https://wa.me/<digits>?text=<encoded>` link using `venture.whatsappNumberOverride || siteSettings.defaultWhatsappNumber` and URL-encoded message text.
- **FR-04 — Graceful Fallback & Placeholders:** If real photos are not uploaded yet or local Sanity env vars are unset during development, the app renders clean placeholder logos and editorial placeholders without runtime crashes.
- **FR-05 — Showcase Photo Viewing:** Visitors can tap/click any showcase gallery photo (mobile and desktop) to inspect it cleanly in an accessible modal/lightbox (keyboard `Esc` to close, focus management, responsive aspect ratio).
- **FR-06 — Fresh Content Updates:** Publishing edits in Sanity Studio updates the live website automatically via ISR / on-demand webhook revalidation (`/api/revalidate`) without manual redeployment.

---

## 8. Technical Architecture & Constraints

- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS) inside `nadia-collection/`.
- **CMS:** Sanity CMS (`sanity`, `next-sanity`, `@sanity/image-url`) with Embedded Studio at `nadia-collection/app/studio/[[...tool]]/page.tsx`.
- **Hosting:** Vercel Free Tier (Root Directory set to `nadia-collection`).
- **Environment Variables** *(documented in `nadia-collection/.env.example`, never committed)*:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` (default: `production`)
  - `SANITY_REVALIDATE_SECRET` (optional webhook secret for instant ISR revalidation)
- **Performance & Accessibility Targets:**
  - Mobile-first responsive design tested at `390px`, `768px`, and `1440px`.
  - Lighthouse Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.
  - Proper semantic HTML, alt text on all images, WCAG AA text contrast, and keyboard-accessible modals/navigation.
- **JSM HQ Compatibility Notes (Windows Local Mode + Antigravity `agy`):**
  - Because Local mode on Windows does not auto-inject HQ App Variables into `agy`, `nadia-collection/` must run cleanly out-of-the-box with built-in fallback data when `.env.local` is absent, and provide a clear `.env.example` for connecting to the live Sanity project.

---

## 9. Open Dependencies & Next Steps

1. *(Done)* **User provides 2-3 reference websites** (plus notes on preferred layout, colors, typography, and vibe) -> `nadia-collection/DESIGN.md` generated.
2. *(Done)* **Design Agent creates Option 1 & Option 2 in Figma** -> [Master Figma File](https://www.figma.com/design/VdcCP5fBMJ5r4ZkipZfPyo) + 3 placeholder SVG logos in `nadia-collection/public/logos/`.
3. *(Done)* **Client (Nadia) chooses Option 1 or Option 2** -> **APPROVED: Option 2 (Personal Hub `/` + `/ventures/[slug]` Detail Pages)**.
4. **User creates free Sanity project** (takes ~2 minutes at sanity.io/manage) and provides `NEXT_PUBLIC_SANITY_PROJECT_ID` when entering Phase 2/deploy.
5. **Web Dev Agents execute Phases 2-4 via JSM HQ** following Option 2 Figma frames (small PRs, human review & merge).
