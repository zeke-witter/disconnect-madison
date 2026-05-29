# Brand Identity Overhaul — Implementation Plan

> Standardizing disconnectsociety.org around the new brand identity produced with our
> design intern. This plan covers **colors, typography, logos, and brand-system
> architecture only**. It deliberately excludes content rewrites and site structure
> (pages, nav, sitemap remain as-is). ALL existing colors, fonts, and logos are replaced.

**Status:** Planning complete, ready for implementation.
**Last updated:** 2026-05-28

---

## 1. Decisions locked in (read first)

| Decision | Resolution | Consequence for this plan |
|---|---|---|
| **Display font licensing** | Built Titling is free for commercial use (dafont listing, confirmed by the author). **Self-host the OTF as a webfont** via `next/font/local`. No purchase needed. | We can use the exact brand display face as live HTML text. (The OTF in Drive ships with a Typodermic *desktop* EULA; we rely on the dafont free-for-commercial grant. Keep a copy of that listing/grant in `00_GUIDELINES` for the record.) |
| **Theming model** | **Light-only.** Cream/Forest is the single brand theme. | Remove dark mode entirely: the `data-theme` toggle, `DarkModeToggle`, the theme-init `<head>` script, all dual `:root` token sets, and every `dark:`-style override. Token surface shrinks to one set. |

---

## 2. The brand system (source of truth)

Assets live in Google Drive → Shared drives → *Zeke:Tanisha Drive* → **Brand Identity**, and the
WIP guidelines deck in Figma (`hpILTJdL9ZFxz0WHR3bFBE`). This section is the distilled spec we
implement against.

### 2.1 Color palette

Five brand colors (from `02_COLOR/Palette.png` and the Colors slides):

| Token name | HEX | RGB | Role (per guidelines) |
|---|---|---|---|
| **Forest** | `#386641` | 56, 102, 65 | Primary. Backgrounds, headings, key UI elements. Authority + grounding. |
| **Fern** | `#6A994E` | 106, 153, 78 | Secondary. Icons, borders, supporting elements. Vitality. |
| **Lime** | `#A7C957` | 167, 201, 87 | Accent. Highlights, CTAs, visual punctuation. Use sparingly. |
| **Cream** | `#FEF8E8` | 254, 248, 232 | Background. Dominant surface color. Warmth + readability. |
| **Blush** | `#E88FA5` | 232, 143, 165 | Accent. Human-touch moments: quotes, callouts, emotional accents. |

**Contrast / accessibility notes** (WCAG AA: 4.5:1 body text, 3:1 large text & UI):

- ✅ **Forest `#386641` on Cream `#FEF8E8`** — high contrast (~7:1). This is the primary text + heading pairing.
- ✅ **Cream / white text on Forest** — high contrast. Use for inverted sections, nav, footer.
- ⚠️ **Fern `#6A994E` on Cream** — ~3:1. Large text / icons / borders only, **not body copy**.
- ⚠️ **Lime `#A7C957` on Cream** — fails for text. Lime is a **fill/background**, not a text color. For CTAs: Lime background + **Forest text** (passes AA at large/bold).
- ⚠️ **Blush `#E88FA5` on Cream** — fails for text. Decorative fills, quote backgrounds, accents only; pair Blush backgrounds with Forest text.
- A small set of derived **tints/shades** (e.g. Forest-90/80/…/10) will be generated for hovers, borders, and disabled states (Phase 1).

### 2.2 Typography

Three faces (from the Type System slides and `03_TYPOGRAPHY/`):

| Role | Family | Source / license | Web delivery |
|---|---|---|---|
| **Display / Hero** | **Built Titling** | Typodermic; free for commercial use (dafont). Weights in Drive: el, lt, rg, sb, bd (+ italics). | `next/font/local` from the OTF files. |
| **Body / Copy / UI** | **Raleway** | SIL OFL. Variable font in Drive; also on Google Fonts. | `next/font/google` (self-hosted at build) or `next/font/local` from the variable TTF. |
| **Accent / Handwritten** | **Sue Ellen Francisco** | SIL OFL (Kimberly Geswein). On Google Fonts. | `next/font/google` or `next/font/local`. Used **sparingly** for quotes/emotional accents — mirrors Blush's role. |

**Type hierarchy** (from the Type Hierarchy slide — exact sizes to be confirmed against Figma in Phase 2; proposed responsive scale below):

| Level | Family | Proposed scale (mobile → desktop) | Weight |
|---|---|---|---|
| Display / Hero | Built Titling | `text-5xl → text-7xl` | rg/bd |
| Section header | Built Titling | `text-3xl → text-5xl` | rg/sb |
| Subheading | Raleway | `text-xl → text-2xl` | 600 |
| Body | Raleway | `text-base → text-lg` | 400 |
| Caption / fine print | Raleway | `text-sm` | 400 |
| Accent / quote | Sue Ellen Francisco | `text-2xl → text-4xl` | regular |

> Replaces today's Handjet (display), Space Grotesk (body wrapper), and Geist/Geist Mono.

### 2.3 Logos

`01_LOGOS/` contains SVG, PNG, and AI variants:

| File | Variant | Use |
|---|---|---|
| `Primary Logo.svg` | Full lockup, Forest `#386641` | Default on Cream backgrounds |
| `Secondary Logo.svg` | Alternate lockup | Secondary placements |
| `Wordmark.svg` | Type-only | Tight horizontal spaces, nav |
| `Icon.svg` | Mark only | App icon, compact contexts |
| `Favicon.svg` | Simplified mark | Browser favicon |
| `Monochrome.svg` | Single-color | Single-ink print, low-color contexts |
| `Inverted.svg` | Light-on-dark | On Forest / photographic backgrounds |

The deck also specifies **icon construction, clearance/clear-space, and misuse** rules
(Logo section) — encode these as a `<Logo>` component API + brand doc (Phase 3).

---

## 3. Target architecture

A two-tier token system, light-only, expressed in `app/globals.css` and surfaced to Tailwind v4
via `@theme inline`.

### 3.1 Tier 1 — Primitive (brand) tokens
Raw palette + generated tints/shades. Never referenced directly in components.
```css
:root {
  --brand-forest: #386641;
  --brand-fern:   #6A994E;
  --brand-lime:   #A7C957;
  --brand-cream:  #FEF8E8;
  --brand-blush:  #E88FA5;
  /* generated steps, e.g. --brand-forest-90 … --brand-forest-10 for hovers/borders */
}
```

### 3.2 Tier 2 — Semantic tokens
What components actually consume. Maps intent → primitive.
```css
:root {
  --background:      var(--brand-cream);
  --surface:         /* cream tint for cards */;
  --text:            var(--brand-forest);
  --heading:         var(--brand-forest);
  --muted:           /* forest tint */;
  --border:          var(--brand-fern);
  --link:            var(--brand-fern);   /* or forest; confirm contrast */
  --cta-bg:          var(--brand-lime);
  --cta-text:        var(--brand-forest);
  --accent-emotional:var(--brand-blush);  /* quotes/callouts */
  --on-forest:       var(--brand-cream);  /* text on dark/inverted sections */
}
```

### 3.3 Tailwind exposure (`@theme inline`)
Expose both layers so we can write `bg-cream`, `text-forest`, `bg-cta`, `text-heading`, etc.
Plus font tokens: `--font-display`, `--font-body`, `--font-accent`.

### 3.4 Logo as a component
`app/components/Logo.tsx` — props `variant` (`primary | secondary | wordmark | icon | mono | inverted`)
and `size`. SVGs imported from `public/brand/logos/` (or inlined as React SVG for `currentColor`
control). Enforces clear-space via wrapper padding.

---

## 4. Migration surface (current → new)

Audited 2026-05-28:

- **~60 files** reference the old CSS color tokens (`--primary-accent`, `--primary-color`, `--secondary-accent`, `--nav-background`, `--on-accent`, `--pill-selected-text`).
- **Ad-hoc Tailwind palette colors** scattered across components: `emerald-400/500/600`, `amber-300/400`, `sky-500/600/700`, `stone-800`, `gray-300/500`, `white`, `black`, `green-400/600`, `red`.
- **Hard-coded hexes** in TSX: `#EDEBE6`, `#5C6F73`, `#8C3A2B`, `#2B5250`, `#1A1A1A`, `#F6F4EF`, `#1A7268`, `#1F3D3A`.
- **Fonts:** `font-handjet` in ~43 spots; `space-grotesk` wrapper in ~36; Geist/Geist Mono in root layout.
- **Dark-mode machinery to remove:** dual `:root` blocks + `@media (prefers-color-scheme)` overrides + `:root[data-theme=…]` blocks in `globals.css`; `DarkModeToggle.tsx`; theme-init script in `app/layout.tsx`; `#paypal-donate-button` / `#portfolio-link` amber light-mode overrides.
- **Charts** (`learn/kids/*Chart.tsx`, `learn/dependency` BrainDrainChart): Recharts colors are hard-coded and must move to brand tokens.
- 73 `.tsx` files total in `app/`.

---

## 5. Phased rollout

Each phase is independently shippable and leaves the site working.

### Phase 0 — Foundations & asset import
**Goal:** Get assets into the repo and document the system; no visual change yet.
- [ ] Download fonts from Drive `03_TYPOGRAPHY/` (Built Titling OTFs, Raleway variable TTF, Sue Ellen Francisco TTF) into `app/fonts/` (or use `next/font/google` for the two OFL faces).
- [ ] Download logo SVGs from `01_LOGOS/SVG/` into `public/brand/logos/`. Add favicon + OG assets.
- [ ] Add `BRAND.md` (condensed spec from §2) to repo root for contributor reference.
- [ ] Save the dafont "free for commercial use" evidence into `00_GUIDELINES`.
**Done when:** assets are versioned and `BRAND.md` exists. No UI change.

### Phase 1 — Color token architecture (light-only)
**Goal:** Replace the color foundation; remove dark mode.
- [ ] Rewrite `app/globals.css` with Tier-1 primitives + Tier-2 semantic tokens + tint/shade ramp.
- [ ] Wire `@theme inline` so `bg-cream` / `text-forest` / `bg-cta` / `text-heading` resolve.
- [ ] Delete all dark-mode CSS (dual `:root`, media query, `data-theme` blocks, amber overrides).
- [ ] Remove `DarkModeToggle.tsx`, its usages, and the theme-init `<head>` script in `app/layout.tsx`.
- [ ] Set `<main>`/`<body>` to Cream background, Forest text.
**Done when:** site renders in brand colors with no dark-mode code remaining; legacy tokens still aliased temporarily so nothing breaks.

### Phase 2 — Typography system
**Goal:** Replace all fonts and establish the type scale.
- [ ] Load Built Titling (`next/font/local`), Raleway, Sue Ellen Francisco; expose `--font-display`, `--font-body`, `--font-accent` in root layout.
- [ ] Remove Handjet, Space Grotesk, Geist, Geist Mono.
- [ ] Confirm exact hierarchy sizes against the Figma Type Hierarchy slide; define reusable heading/body utilities or a small typography component set.
- [ ] Sweep: `font-handjet` → display; `space-grotesk` wrappers → body; introduce accent face for quotes/callouts.
**Done when:** every page uses the three brand faces at the agreed scale; no old font references remain.

### Phase 3 — Logo & iconography system
**Goal:** Brand marks everywhere old logo/text marks appeared.
- [ ] Build `app/components/Logo.tsx` with variant + size props and enforced clear-space.
- [ ] Place primary/wordmark in `Navigation`; appropriate variant in `Footer`.
- [ ] Replace favicon (`Favicon.svg` → `app/icon`/`favicon`), and OG/Twitter images in `lib/metadata.ts`.
- [ ] Apply icon-construction / misuse rules from the deck to the component + `BRAND.md`.
**Done when:** all logo touchpoints use the new marks; favicon + social cards updated.

### Phase 4 — Component & page migration sweep
**Goal:** Eliminate every ad-hoc color/font; everything flows through semantic tokens.
- [ ] Replace ad-hoc Tailwind colors (emerald/amber/sky/stone/gray/green/red) with brand tokens.
- [ ] Replace hard-coded hexes (§4) with tokens.
- [ ] Re-style buttons/CTAs to Lime-bg + Forest-text; secondary/ghost variants from Fern/Forest.
- [ ] Re-color Recharts charts (`learn/kids`, `learn/dependency`) to the brand palette.
- [ ] Re-style forms (`pledge`, `contact`, quiz pills) and Accordion to tokens.
- [ ] Remove the temporary legacy-token aliases from Phase 1.
**Done when:** `grep` finds no ad-hoc palette colors or stray hexes; only semantic tokens remain.

### Phase 5 — Codify guidelines + QA
**Goal:** Make the system durable and verified.
- [ ] Add an internal **living style guide** route (e.g. `/style-guide`, `noindex`) rendering swatches, type scale, logo variants, and button/states — a visual contract.
- [ ] Update `CLAUDE.md` styling section + the per-page token table to the new system.
- [ ] WCAG pass: verify contrast pairings (§2.1) with WAVE; fix any failures.
- [ ] Visual QA across all 73 pages (light-only); confirm no dark-mode regressions or unstyled elements.
- [ ] `npm run build` + `npm run lint` clean.
**Done when:** style guide is live internally, docs updated, contrast verified, build green.

---

## 6. Open items to confirm during implementation
- Exact type-scale point sizes from the Figma Type Hierarchy slide (Phase 2).
- Whether `--link` should be Fern or Forest (contrast + visual weight) — decide in Phase 1.
- Logo clear-space and minimum-size values from the Logo section of the deck (Phase 3).
- Final tint/shade ramp values for hovers/borders/disabled (Phase 1).
