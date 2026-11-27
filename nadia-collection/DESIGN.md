# Design System & Visual Direction: Nadia Collection

| Field | Value |
| :--- | :--- |
| **Brand (Default, CMS-Editable)** | Nadia Collection |
| **Product Type** | Personal Brand & Multi-Venture Editorial Showcase (Direct WhatsApp Conversion, NOT E-Commerce) |
| **Visual Language** | Blush Editorial Gallery (light warm porcelain ground, soft petal-blush studio plates, sharp photography, high-contrast serif + italic rose accent) |
| **Dial** | `ENERGY 2 / RHYTHM 3 / MOTION 1` |
| **Theme** | Fixed Light Editorial (justified: floristry petals and MUA skin tones require accurate, bright neutral-blush viewing; dark surfaces distort color perception) |
| **Figma URLs** | `PENDING (to be populated during Phase 1 task P1-T02)` |

---

## 1. Design Read & Reference Translation

> Reading this as: personal brand and multi-venture editorial showcase for Indonesian customers (local Samarinda florist and flexible MUA audience), in a blush-editorial gallery style inspired by Tashola, MOTIVE, and Trail, dial `ENERGY 2 / RHYTHM 3 / MOTION 1`.

### How the 3 References Combine (Strictly Translated for Showcase)

| Reference | What We Keep (Structure & Craft) | What We Strip (E-Commerce Clutter) |
| :--- | :--- | :--- |
| **1. Tashola (Primary Inspiration)** | Centered serif wordmark header; full-bleed soft-blush editorial hero with sharp dark CTA; alternating rhythm between 4-column studio-plate showcase strips, edge-to-edge 2-column full-bleed portrait tiles with Roman + Italic serif titles, horizontal mood band, and asymmetric 50% tall image + 2x2 showcase split. | Remove search icon, user account icon, shopping bag counter, "Shop Now" buttons, payment method badges in footer, and 4-column template footer bloat. |
| **2. MOTIVE (Editorial Accent & Story Blocks)** | Signature headline motif pairing upright dark serif with one selective italic word in deep rose accent; asymmetric story blocks (wide showcase visual beside concise heading + short body copy); multi-crop detail collage blocks with short annotations; generous gallery whitespace and sharp `0px` photo frames. | Replace automotive dark red with Nadia's Deep Editorial Rose (`#9E3B5A`) and warm porcelain-blush surfaces; keep copy short and human, never magazine fluff. |
| **3. Trail (Venture Detail & Founder Statement)** | Clean 2-column detail inspection layout (left: clear title, concise summary, hairline `+`/`-` expandable detail rows, primary WhatsApp CTA; right: large studio-plate visual); oversized editorial founder statement paired with staggered-scale photography. | Remove price-only checkout framing, color swatch dots, "Payments Options / Shipping" e-commerce accordions; replace with real CMS-backed showcase info (*Tentang Layanan*, *Area Layanan*, *Cara Pemesanan via WhatsApp*). |

### Liveliness Levers
1. **One focal point per screen:** Each viewport holds a single clear visual anchor (Hero portrait, active Venture editorial tile, or selected Showcase frame). Secondary details defer in size and tonal contrast.
2. **Hierarchical contrast:** Large high-contrast editorial serif headings (`Cormorant Garamond`) paired with compact, crisp sans-serif metadata and captions (`Plus Jakarta Sans`).
3. **Whitespace as structure:** Generous vertical margins and open asymmetric columns separate ideas instead of boxes, borders, or heavy shadows.
4. **One deliberate accent:** Deep Editorial Rose (`#9E3B5A`) appears only at key moments (selective italic headline words, focus rings, active link underlines, subtle category text, hover accent on CTAs).
5. **Identity motif:** Upright Espresso-Plum serif paired with a single **Deep Rose Italic** keyword (for example: `Afisa *Bouquet*`, `Nadia *Artistry*`, `Karya *Pilihan*`), framed alongside crisp `0px` blush-tinted studio plates (`#F7EEF0`).

---

## 2. Color System (WCAG AA Verified)

Active palette strictly follows a 2-core + 1-accent discipline: one tonal Porcelain-Blush surface family, one Espresso-Plum ink family, and one Deep Editorial Rose accent.

### Core Tokens

| Token | Hex | Role | Usage Rule |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#FDFBFA` | Primary page background | Main porcelain-white canvas with a subtle warm rose undertone. |
| `--bg-surface` | `#F7EEF0` | Soft Petal Blush studio plate | Background behind showcase thumbnails, image placeholders, and subtle section plates. |
| `--bg-surface-strong` | `#EFE0E4` | Dusty Rose Mist | Hover states on surface cards, subtle active nav highlights, loading skeletons. |
| `--bg-blush-hero` | `#F2D8E0` | Blush Editorial Backdrop | Used sparingly on hero or founder accent bands to give unmistakable pinkish character. |
| `--ink-primary` | `#1F171A` | Deep Espresso Plum | Headings, primary body text, brand wordmark, and solid primary CTA button fills. |
| `--ink-secondary` | `#5C4950` | Muted Plum-Taupe | Captions, secondary descriptions, price hints, footer metadata. |
| `--ink-on-dark` | `#FDFBFA` | Light text on dark fills | Text on primary dark buttons (`#1F171A`), rose buttons (`#9E3B5A`), and photo scrims. |
| `--accent-rose` | `#9E3B5A` | Deep Editorial Rose (1 Accent) | Selective italic headline words, active underlines, subtle category tags, focus rings. |
| `--accent-rose-hover` | `#832D48` | Deep Rose Hover | Hover/active fill for rose-accented interactive buttons and links. |
| `--border-hairline` | `#E5D2D8` | Decorative hairline divider | `1px` dividers in header, footer, and Trail-style accordion rows. |
| `--border-strong` | `#8E6F79` | Interactive control border | Outlined secondary buttons and interactive boundaries (meets WCAG 3:1 non-text contrast). |
| `--scrim-photo` | `linear-gradient(to top, rgba(31,23,26,0.74) 0%, rgba(31,23,26,0.24) 48%, rgba(31,23,26,0) 100%)` | Bottom image overlay scrim | Functional only: guarantees >= 4.5:1 readability for white titles on Tashola-style full-bleed photo tiles. |

### Verified Contrast Matrix (Computed with WCAG 2.x Checker)

| Foreground | Background | Ratio | Normal Text (4.5:1) | Large Text / UI (3.0:1) |
| :--- | :--- | :--- | :--- | :--- |
| `#1F171A` (`ink-primary`) | `#FDFBFA` (`bg-canvas`) | **17.02:1** | PASS | PASS |
| `#1F171A` (`ink-primary`) | `#F7EEF0` (`bg-surface`) | **15.42:1** | PASS | PASS |
| `#1F171A` (`ink-primary`) | `#EFE0E4` (`bg-surface-strong`) | **13.76:1** | PASS | PASS |
| `#1F171A` (`ink-primary`) | `#F2D8E0` (`bg-blush-hero`) | **13.11:1** | PASS | PASS |
| `#5C4950` (`ink-secondary`) | `#FDFBFA` (`bg-canvas`) | **8.07:1** | PASS | PASS |
| `#5C4950` (`ink-secondary`) | `#F7EEF0` (`bg-surface`) | **7.31:1** | PASS | PASS |
| `#5C4950` (`ink-secondary`) | `#EFE0E4` (`bg-surface-strong`) | **6.52:1** | PASS | PASS |
| `#5C4950` (`ink-secondary`) | `#F2D8E0` (`bg-blush-hero`) | **6.21:1** | PASS | PASS |
| `#9E3B5A` (`accent-rose`) | `#FDFBFA` (`bg-canvas`) | **6.31:1** | PASS | PASS |
| `#9E3B5A` (`accent-rose`) | `#F7EEF0` (`bg-surface`) | **5.72:1** | PASS | PASS |
| `#9E3B5A` (`accent-rose`) | `#F2D8E0` (`bg-blush-hero`) | **4.86:1** | PASS | PASS |
| `#FDFBFA` (`ink-on-dark`) | `#9E3B5A` (`accent-rose`) | **6.31:1** | PASS | PASS |
| `#FDFBFA` (`ink-on-dark`) | `#832D48` (`accent-rose-hover`) | **8.36:1** | PASS | PASS |
| `#FDFBFA` (`ink-on-dark`) | `#1F171A` (`ink-primary`) | **17.02:1** | PASS | PASS |
| `#8E6F79` (`border-strong`) | `#FDFBFA` (`bg-canvas`) | **4.33:1** | UI Border Only | PASS (WCAG 1.4.11) |
| `#8E6F79` (`border-strong`) | `#F7EEF0` (`bg-surface`) | **3.92:1** | UI Border Only | PASS (WCAG 1.4.11) |
| `#9E3B5A` (`focus-ring`) | `#EFE0E4` (`bg-surface-strong`) | **5.10:1** | UI Focus Ring | PASS (WCAG 1.4.11) |

### Color Rules
- **Forbidden:** Neon pink, magenta glow, purple-to-pink gradients, full-page radial color blobs, or arbitrary extra brand colors per venture.
- **Scrim discipline:** Never place white text directly over a raw photo. Always layer `--scrim-photo` behind overlaid tile titles and check contrast on the brightest region of the text box.

---

## 3. Typography System

Both fonts are natively available in **Figma** and **`next/font/google`** so Figma handoff and Next.js output match 1:1.

### Font Families
- **Display & Editorial Headings (`--font-serif`):** `Cormorant Garamond` (weights `400`, `500`, `600`, plus italic `400`, `500`).
  - *Why:* High-contrast editorial strokes and graceful italic curves deliver the exact Tashola and MOTIVE magazine authority while pairing softly with pinkish floristry and beauty photography.
- **Body, UI & Metadata (`--font-sans`):** `Plus Jakarta Sans` (weights `400`, `500`, `600`).
  - *Why:* Clean neo-grotesque readability (like Trail's uncluttered product specs) crafted by an Indonesian foundry so Bahasa Indonesia and mixed English labels read naturally without falling into AI-default Inter/Geist.

### Fluid Type Scale (`clamp()` for Responsive Reflow)

| Role | Font | Fluid Size | Weight | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `Cormorant Garamond` | `clamp(2.5rem, 5.2vw, 4.5rem)` | `400` / `500` | `1.04` | `-0.02em` | Main brand statement on `/` (pair upright + 1 rose italic word). |
| **Editorial Statement** | `Cormorant Garamond` | `clamp(2rem, 3.8vw, 3.25rem)` | `400` | `1.10` | `-0.015em` | Section titles and Trail-style founder statement. |
| **Venture Title (H2)** | `Cormorant Garamond` | `clamp(1.75rem, 2.8vw, 2.5rem)` | `500` | `1.12` | `-0.01em` | Venture showcase headers and tile titles (`Afisa *Bouquet*`). |
| **Subheading (H3)** | `Cormorant Garamond` | `clamp(1.25rem, 1.8vw, 1.625rem)` | `500` | `1.22` | `0` | Story sub-blocks, detail callouts, modal captions. |
| **Body Lead** | `Plus Jakarta Sans` | `clamp(1rem, 1.2vw, 1.125rem)` | `400` | `1.65` | `0` | Hero subtitle, founder intro, venture overview paragraphs. |
| **Body Standard** | `Plus Jakarta Sans` | `0.9375rem` (`15px`) | `400` | `1.65` | `0` | Descriptions, accordion content, mobile body copy. |
| **Caption / Meta** | `Plus Jakarta Sans` | `0.8125rem` (`13px`) | `500` | `1.45` | `0.01em` | Showcase item titles, price hints, location text, nav links. |
| **Micro Label / Button** | `Plus Jakarta Sans` | `0.75rem` (`12px`) | `600` | `1.2` | `0.06em` | Primary CTA button labels and calm category labels (never wider than `0.08em`). |

### Typography Guardrails
- No decorative monospace headings and no wide-tracked uppercase template labels (`HOW IT WORKS`, `FEATURES`).
- Text must scale cleanly to `200%` browser zoom without clipping containers (`overflow: hidden` forbidden on text containers).
- Never use em dashes (`—`) in UI copy or headlines; use commas, colons, periods, or parentheses.

---

## 4. Layout, Spacing, Geometry & Responsive Breakpoints

### Three Deliberate Responsive States (Never a Squeezed Desktop)
1. **Mobile (`< 640px`, Figma artboard `390px`):**
   - Outer horizontal padding: `20px`.
   - Section vertical rhythm: `56px` to `72px` (never desktop `120px` gaps).
   - Multi-column grids reflow cleanly: Venture tiles stack to `1 column`; showcase thumbnail strips use `2 columns` (with `12px` gap) so items stay scannable without excessive scrolling; founder and detail splits stack vertically with media prioritized cleanly.
   - Header height: compact `56px` sticky bar with brand wordmark, visible labeled `"Menu"` button (not a bare icon-only hamburger), and compact WhatsApp action.
   - Zero `100vh` slabs on mobile: Hero uses `min-height: auto` with balanced vertical padding so the first venture content peeks naturally below the fold.
2. **Tablet & Small Laptop (`640px` to `1023px`, Figma artboard `768px`):**
   - Outer horizontal padding: `32px`.
   - Section vertical rhythm: `80px`.
   - Showcase strips use `2` or `3` balanced columns (`minmax(220px, 1fr)`), never stretched single-column phone stacks or crammed 4-column desktop rows.
   - Full-bleed venture tiles sit `2 columns` side-by-side (`1fr 1fr`).
3. **Desktop (`>= 1024px`, Figma artboard `1440px`):**
   - Max content container: `1320px` centered with `48px` outer horizontal padding (full-bleed editorial bands span `100%` viewport width).
   - Section vertical rhythm alternates deliberately between `96px` and `136px` to match `RHYTHM 3`.
   - Showcase strips span `4 columns` (`repeat(4, minmax(0, 1fr))`, `16px` gap) like Tashola and Trail.
   - Asymmetric split sections use `50% / 50%` or `58% / 42%` editorial ratios (never repetitive identical 3-column card grids).

### Border Radius & Elevation Discipline
- **Photography, editorial tiles, studio plates, accordion rows:** `0px` (crisp gallery edges matching Tashola, MOTIVE, and Trail).
- **Primary & secondary buttons, modal dialog container:** `2px` (sharp editorial polish; never pill-shaped everything).
- **Drop shadows:** `none` on navbar, cards, plates, and buttons. Separation comes from `--bg-canvas` vs `--bg-surface` tonal contrast and `1px solid --border-hairline`. Elevation shadow is allowed **only** on the Lightbox modal (`0 24px 60px rgba(31, 23, 26, 0.22)`).
- **Glassmorphism & Glow:** Zero glow anywhere. Optional subtle backdrop blur allowed **only** on the Lightbox backdrop (`rgba(31, 23, 26, 0.72)` with `backdrop-filter: blur(4px)`), capped at 1 element max.

---

## 5. Components, Interactive Patterns & Iconography

### Header / Navigation
- **Desktop (`68px` height, `--bg-canvas` with `1px solid --border-hairline` bottom border):**
  - Left: Minimal navigation links reflecting ONLY real destinations (Option 1: anchor links to active ventures + `Tentang Nadia`; Option 2: `Beranda` + active venture links).
  - Center: `BrandLogo` (renders CMS-uploaded logo with max height `32px`, or falls back cleanly to `Cormorant Garamond` `600` wordmark for `siteSettings.brandName`).
  - Right: Single crisp WhatsApp CTA (`Hubungi via WhatsApp`, solid `#1F171A` or outlined `#8E6F79` button, min height `44px`).
- **Mobile (`56px` height):**
  - Left: `BrandLogo` (max height `26px`).
  - Right: Labeled `"Menu"` toggle button (`min 44x44px`, opens full-height blush-white drawer listing active ventures + direct WhatsApp CTA; closes via `Esc` or close button).

### Buttons & WhatsApp Conversion CTAs
- **Minimum tap target:** `44px` height, `20px–28px` horizontal padding, at least `10px` gap between adjacent controls.
- **Primary CTA (Direct WhatsApp Conversion):** Solid `#1F171A` fill with `#FDFBFA` text, `2px` radius. On hover/active, transitions cleanly to `#9E3B5A` (Deep Editorial Rose) so the brand's pinkish identity rewards interaction.
- **Secondary CTA (View Venture / Showcase):** Transparent fill, `1px solid #8E6F79` border, `#1F171A` text. On hover, `#F7EEF0` fill with `#9E3B5A` text.
- **Specific CTA copy (never generic "Learn More" / "Explore" / "Shop Now"):**
  - General: `"Hubungi Nadia via WhatsApp"`
  - Afisa Bouquet: `"Pesan Buket via WhatsApp"` / `"Lihat Karya Afisa Bouquet"`
  - Nadia Artistry: `"Tanya Jadwal MUA via WhatsApp"` / `"Lihat Portofolio Nadia Artistry"`
- **Arrows:** Omit arrows on standard primary buttons. Use a subtle proportional `14px` diagonal arrow (`↗`) ONLY on text-link venture cards to indicate navigating into a dedicated showcase or external WhatsApp/Instagram destination.

### Showcase Cards & Editorial Tiles
- **Studio-Plate Thumbnail Card (Tashola / Trail strip style):**
  - Square `1:1` or portrait `4:5` container on `--bg-surface` (`#F7EEF0`), `0px` radius, `overflow: hidden`.
  - Image zooms gently (`scale(1.03)`, `400ms ease-out`) on hover; tapping/clicking opens the Lightbox modal.
  - Below image (`10px` top gap): concise caption (`13px` `#1F171A` `500`) + optional price hint or category tag (`13px` `#5C4950` `400`).
- **Editorial Venture Tile (Tashola 2-column full-bleed style):**
  - Portrait `4:5` on desktop (`3:4` on mobile), edge-to-edge 2-column grid (`2px` hairline white gutter or `16px` crisp gutter).
  - Bottom `--scrim-photo` overlay with `Cormorant Garamond` title pairing upright + italic (`Afisa *Bouquet*`, `Nadia *Artistry*`), short 1-line category/location note (for example: `Florist & Custom Bouquet · Samarinda`; omit location if blank in CMS), and clear action cue.
- **Trail-Style Collapsible Info Rows (Option 2 Detail Page):**
  - `1px solid #E5D2D8` top/bottom hairlines, `48px` minimum row height, clean `+` / `−` hairline glyph on right, keyboard accessible (`button` with `aria-expanded`).
  - Only displays real CMS-backed venture info (for example: `Detail Layanan`, `Area Layanan`, `Cara Pemesanan via WhatsApp`). Never displays empty rows.

### Lightbox Modal (Gallery Photo Inspection)
- Opens on clicking/tapping any showcase image.
- Full keyboard support: `Escape` closes, `ArrowLeft` / `ArrowRight` navigates photos, focus trapped inside modal and returned to trigger button on close.
- Visible `44x44px` close button (`Tutup ×`), caption display below photo, and a direct `"Tanyakan Karya Ini via WhatsApp"` CTA button pre-filling the photo's caption into the WhatsApp message!

### Iconography Rules
- Do NOT use Lucide as a blanket decorative icon kit, and do NOT use emojis, sparkles, or stars anywhere in the UI.
- Use minimal custom `1.25px`-stroke SVG icons ONLY where functionally needed: WhatsApp glyph (paired with text label), `+`/`−` accordion toggle, `×` modal close, `‹`/`›` lightbox arrows, and Instagram link icon in footer.

### Placeholder Art Direction (Until Nadia Uploads Real Photos)
- **Brand & Venture Placeholder Logos (`nadia-collection/public/logos/`):** Regenerated minimal typographic/monogram SVGs in `#1F171A` and `#9E3B5A` (`nadia-collection-logo.svg`, `afisa-bouquet-logo.svg`, `nadia-artistry-logo.svg`), clean enough to present to the client while explicitly overridable by uploading any logo image in Sanity `/studio`.
- **Showcase & Portrait Photo Placeholders:** Dignified blush-tinted studio plates (`#F7EEF0` with subtle inner `1px` `#E5D2D8` architectural frame and minimal quiet label like `Afisa Bouquet · Foto Segera Hadir` or `Nadia Artistry · Portofolio`). Never use grey wireframe skeleton bars, fake stock portraits of random people, or unrelated generic imagery.

### Required UI States (R-27)
- **Empty State:** If a venture has 0 gallery photos uploaded in Sanity yet, display a clean `--bg-surface` panel explaining the status and giving the real next action: `"Galeri foto untuk [Nama Usaha] sedang disiapkan. Hubungi Nadia lewat WhatsApp untuk melihat katalog terbaru."` + direct WhatsApp button.
- **Loading State:** Subtle tonal pulse transitioning between `#F7EEF0` and `#EFE0E4` matching exact container aspect ratios, paired with screen-reader text (`Memuat showcase...`).
- **Error / Fallback State:** If Sanity CMS cannot be reached or env vars are not yet configured locally, gracefully render typed fallback content without crashing; if a specific image fails to load, fall back cleanly to `PlaceholderMedia`.

---

## 6. Motion & Accessibility Specification

### Motion (`MOTION 1`: Calm, Purposeful, Zero Loops)
- Image hover zoom inside cropped frames: `transform: scale(1.03)` over `400ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Button fill & link underline transitions: `180ms ease`.
- Accordion expand & Lightbox fade: `200ms ease-out`.
- **Forbidden:** Infinite pulse/float/bounce loops, scroll-jacking parallax, or staggered fade-up walls on every element.
- **Reduced motion:** Wrap transitions in `@media (prefers-reduced-motion: reduce)` to disable transforms immediately.

### Accessibility & Keyboard Standards
- Every interactive control (`a`, `button`, accordion, mobile drawer, lightbox) must be reachable via `Tab` / `Shift+Tab` in visual DOM order and activatable via `Enter` / `Space`.
- Focus indicator: `2px solid #9E3B5A` with `3px` offset (`:focus-visible`). Never remove `outline` without this replacement.
- Include a visually hidden `"Lewati ke konten utama"` skip link as the first focusable element on every page.
- Never communicate state by color alone; always include visible text or accessible labels.

---

## 7. Blueprint for Phase 1 Figma Exploration (2 Options to Compare)

Design Agent must create **two clearly labeled pages** inside the Figma file (`Option 1: Single-Page Hub` and `Option 2: Hub + Venture Pages`), each with **Desktop (`1440px`)** and **Mobile (`390px`)** frames (plus Tablet `768px` grid note/frame for showcase reflow), so Nadia can review and select **one** final direction before Phase 3 coding.

### Option 1: Single-Page Personal Hub (`/`)
Compositional flow designed for `RHYTHM 3` (no two consecutive sections share the same layout):
1. **Minimal Header:** Left venture anchor links (`Afisa Bouquet`, `Nadia Artistry`, `Tentang`), centered `Nadia Collection` wordmark, right `Hubungi via WhatsApp` button.
2. **Hero (Tashola-inspired Blush Editorial Split):** Left column on `#FDFBFA` with editorial H1 (`Karya Personal, *Tumbuh* Bersama Nadia`), short Indonesian-English subtitle, and sharp `#1F171A` WhatsApp CTA + quiet jump link to ventures; right column full-height portrait visual framed against `#F2D8E0` blush studio backdrop.
3. **Edge-to-Edge Venture Entry Tiles (Tashola 2-col Full-Bleed):** `Afisa *Bouquet*` (Florist & Custom Bouquet, Samarinda) and `Nadia *Artistry*` (Makeup Artist) side-by-side (`50/50` desktop, stacked on mobile), clicking scrolls smoothly to each showcase section below.
4. **Venture #1 Showcase: Afisa Bouquet (Asymmetric Split + 4-Col Strip):** Top asymmetric intro (MOTIVE style: tall feature visual on left + story, Samarinda workshop note, key bouquet highlights, and `"Pesan Buket via WhatsApp"` CTA on right) followed by a clean 4-column studio-plate showcase strip (`#F7EEF0`) opening Lightbox on click.
5. **Founder Editorial Statement (Trail-inspired):** Generous whitespace on `#F7EEF0` blush band, oversized right-aligned `Cormorant Garamond` founder statement from Nadia paired with concise bio and staggered portrait crop.
6. **Venture #2 Showcase: Nadia Artistry (Tashola Bottom Asymmetric 50% + 2x2 Split):** Left 50% tall full-height beauty portrait visual; right 50% concise intro (no hardcoded location unless set in CMS), `"Tanya Jadwal MUA via WhatsApp"` CTA, and 2x2 curated look showcase grid opening Lightbox on click.
7. **Minimal Editorial Footer:** Wordmark on left, active venture links + Instagram links in center, direct WhatsApp contact on right. Zero fake payment icons or 4-column template filler.

### Option 2: Personal Hub (`/`) + Dedicated Venture Pages (`/ventures/[slug]`)
1. **Page A: Personal Hub (`/`):**
   - **Minimal Header:** `Beranda`, active ventures links, centered `Nadia Collection` wordmark, right `Hubungi via WhatsApp` CTA.
   - **Hero (Tashola Editorial Split):** Focused purely on Nadia's personal brand identity (`Nadia Collection`) with crisp blush studio framing and primary CTA (`Lihat Lini Usaha` + direct WhatsApp link).
   - **Ventures Directory (Tashola 2-col Full-Bleed Editorial Grid):** Scales cleanly from 2 to 6+ ventures. Each full-bleed tile shows cover visual + scrim, `Cormorant Garamond` Roman+Italic title (`Afisa *Bouquet*`, `Nadia *Artistry*`), short hook, and `"Lihat Showcase ↗"` linking to `/ventures/[slug]`.
   - **Founder Story & Philosophy (MOTIVE/Trail Asymmetric Block):** Oversized editorial statement + founder bio + staggered visual detail.
   - **Curated Cross-Venture Strip (4-Col Studio Plates):** 4 selected highlights across Nadia's ventures so first-time visitors immediately see craft quality before clicking deeper.
   - **Minimal Editorial Footer.**
2. **Page B: Venture Detail Template (`/ventures/[slug]`, exemplified for Afisa Bouquet & Nadia Artistry):**
   - **Breadcrumb (`← Kembali ke Nadia Collection`)** + **Trail-Inspired 2-Column Top Section:**
     - Left column: Venture logo/title (`Afisa *Bouquet*`), category & optional service area (`Samarinda, Kalimantan Timur` for Afisa; hidden when empty for MUA), concise editorial description, **Trail-style hairline `+`/`−` expandable rows** (`Layanan & Kisaran Harga`, `Area Layanan`, `Cara Pemesanan via WhatsApp`), and sharp solid primary CTA (`Pesan Buket via WhatsApp` / `Tanya Jadwal MUA via WhatsApp`).
     - Right column: Large crisp `4:5` studio-plate hero visual on `#F7EEF0`.
   - **Full Showcase Gallery (4-Col Studio-Plate Grid on Desktop, 2-Col on Mobile):** Clicking any item opens the Lightbox modal with `"Tanyakan Karya Ini via WhatsApp"`.
   - **Optional Future External Tool Band (Hidden Unless Configured in CMS):** Clean hairline callout strip reserved for linking a future standalone tool (such as an external 3D Bouquet Builder) when `externalActionUrl` is populated.
   - **Other Ventures Switcher + Minimal Footer:** Compact 2-column preview to jump cleanly to Nadia's other businesses.

---

## 8. Decision Rationale (R-31 Accountability)

| Decision | One-Line Reason |
| :--- | :--- |
| **Porcelain-Blush + Deep Rose Palette** | Honors the user's "pinkish" direction while staying editorial and passing WCAG AA (4.86:1 to 17.02:1 across every surface). |
| **Fixed Light Theme** | Floristry petals and makeup skin tones need accurate bright-neutral color viewing; dark mode would distort product colors. |
| **`Cormorant Garamond` + `Plus Jakarta Sans`** | Captures Tashola/MOTIVE editorial serif+italic authority with Indonesian-tuned neo-grotesque readability, matching natively in Figma and Next.js. |
| **`0px` Photo Radius & Flat Studio Plates** | Preserves the crisp gallery look of all three references and avoids rounded-card + drop-shadow AI template softness. |
| **`ENERGY 2 / RHYTHM 3 / MOTION 1`** | Balances refined personal-brand presence with rich editorial section variety while keeping motion calm and respectful. |
| **Sharp Dark CTA Turning Rose on Hover** | Mirrors Tashola's grounded dark focal button for maximum contrast (`17.02:1`) while rewarding interaction with the brand's signature rose accent. |
| **Zero E-Commerce Chrome** | Keeps every visual cue aligned to the true conversion goal: inspiring trust through showcase photography and moving visitors straight to WhatsApp. |
| **Two Figma Options Before Code** | Lets Nadia compare single-page simplicity vs multi-page scalability visually before any frontend engineering effort is spent. |
