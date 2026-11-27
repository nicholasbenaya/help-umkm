# Project Rules — Monorepo `help-umkm` (JSM HQ)

> This file is automatically adopted by JSM HQ and injected into every agent's instructions (`.agents/rules/jsmhq-role.md`). Follow every rule strictly.

## 1. Active Scope & Folder Boundaries
- **Active project:** `nadia-collection/` (**Nadia Collection** — Personal Brand & Multi-Venture Showcase).
- **Read-only legacy archive:** `archive/nadia-studio-v1/` — **NEVER** edit, import from, or build on top of files inside `archive/`.
- **Single sources of truth:** Read these files before planning, designing, or writing any code:
  1. `nadia-collection/PRD.md` — Product scope, requirements, content model, and decision gate status.
  2. `nadia-collection/DESIGN.md` — Visual system, tokens, typography, and component rules *(must exist before UI design/build)*.
  3. `plan.md` — Phased roadmap and atomic task breakdown for JSM HQ.
- **Never edit `docs/plan.md` manually** — JSM HQ overwrites `docs/plan.md` automatically when plan export is enabled.

## 2. Hard Guardrails (Anti-Over-Engineering)
This website is for a real UMKM client. Simplicity, reliability, and visual polish beat unnecessary complexity every time.
- **NO custom admin dashboard, NO custom auth/PIN, NO Supabase/PostgreSQL/SQLite, NO `db.json`.** All content editing is handled exclusively by **Sanity CMS Embedded Studio** at `/studio`.
- **NO e-commerce cart, checkout, payment gateway, booking calendar, shipping calculator, or analytics dashboard.** Customer inquiries go directly to **WhatsApp**.
- **NO 3D Bouquet Builder in this repository.** That is intentionally a separate standalone product outside this repo's scope.
- **NO unrequested pages, API routes, or state management libraries.** Stick strictly to the approved `PRD.md` and your assigned task's `files` list.

## 3. Design & Decision Gate Enforcement
- **Before Phase 3 (Frontend UI) starts:**
  1. `nadia-collection/DESIGN.md` must exist (derived from user-provided reference websites).
  2. Both layout options (**Option 1: Single-Page Personal Hub** and **Option 2: Hub + Venture Detail Pages**) must be designed in Figma and reviewed by the client.
  3. The approved option (`Option 1` or `Option 2`) must be explicitly marked **APPROVED** in `nadia-collection/PRD.md`.
- If the Decision Gate is still `PENDING`, stop and ask the lead/user via `ask_user` instead of guessing which layout to build.

## 4. Language, Market & Content Rules
- **Copywriting tone:** Indonesian-first with refined English accents (*campuran Indonesia–Inggris yang elegan*), natural for modern Indonesian customers. Avoid generic marketing cliches.
- **Market specificity:**
  - **Afisa Bouquet:** Serves the local **Samarinda, Kalimantan Timur** market.
  - **Nadia Artistry (MUA):** Service area is **TBD / configurable via CMS** — never hardcode Samarinda-only restrictions for MUA.
- **Editable identity:** Brand name (default `"Nadia Collection"`), brand & venture logos, WhatsApp number (default `6282154309113` with per-venture override), and ventures list must all come from Sanity CMS with safe fallback defaults when CMS env vars are not yet configured locally.
- **Media:** Until Nadia provides real photos, use clean, dignified editorial placeholders and clean regenerated SVG placeholder logos that Nadia can replace directly in Sanity Studio.

## 5. Git, PR & Quality Standards
- **One task = one branch = one PR.** PR title format: `[TASK-ID] Short summary`.
- **Edit only the files listed in your assigned JSM HQ task.** If you genuinely need another file, message the lead first.
- **Scoped commit format:** `tipe(nadia-collection): ringkasan singkat` (e.g., `feat(nadia-collection): add sanity venture schema`).
- **Never commit secrets or runtime agent configs:** `.env.local`, `.agents/mcp_config.json`, `.agents/hooks.json`, `GEMINI.md`. Always document required env vars in `nadia-collection/.env.example`.
- **Pre-PR verification:** Inside `nadia-collection/`, run `npm run lint` and `npm run build` and ensure both pass with zero errors before calling `set_my_status` (`in-review`).
