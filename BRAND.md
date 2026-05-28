# Disconnect Society — Brand Reference

> Condensed spec for contributors. Source of truth: Google Drive → Shared drives → *Zeke:Tanisha Drive* → Brand Identity, and the Figma brand guidelines deck (`hpILTJdL9ZFxz0WHR3bFBE`).

---

## Colors

Five brand colors, light-only theme (Cream dominant background, Forest dominant text).

| Token (CSS) | Name | HEX | RGB | CMYK | Role |
|---|---|---|---|---|---|
| `--brand-forest` | Forest | `#386641` | 56, 102, 65 | 45, 0, 36, 60 | Primary: backgrounds, headings, key UI. Authority + grounding. |
| `--brand-fern` | Fern | `#6A994E` | 106, 153, 78 | 31, 0, 49, 40 | Secondary: icons, borders, supporting elements. Vitality. |
| `--brand-lime` | Lime | `#A7C957` | 167, 201, 87 | 17, 0, 57, 21 | Accent: highlights, CTAs. Use sparingly. |
| `--brand-cream` | Cream | `#FEF8E8` | 254, 248, 232 | 0, 2, 9, 0 | Background: dominant surface. Warmth + readability. |
| `--brand-blush` | Blush | `#E88FA5` | 232, 143, 165 | 0, 38, 29, 9 | Accent: human-touch moments, quotes, callouts. |

### Contrast rules (WCAG AA — measured ratios)

| Pairing | Ratio | Use |
|---|---|---|
| Forest on Cream | 6.30 | ✅ All body text and headings |
| Cream on Forest | 6.30 | ✅ Text on inverted sections, nav, footer |
| Forest tint (`--muted` `#507855`) on Cream | 4.76 | ✅ Muted / supporting / caption body text |
| Forest on Surface (`#F1ECDC`) | 5.65 | ✅ Text on cards |
| Fern on Cream | 3.15 | ⚠️ Large text (≥24px), icons, borders only — **not body copy** |
| Forest on Lime (CTA) | 3.54 | ⚠️ Large/bold only — fine for CTA buttons |
| Lime on Forest | 3.54 | ⚠️ Large/bold only — nav Donate / link hover |
| Lime as text on Cream | fail | ❌ Lime is a fill, never a text color |
| Blush as text on Cream | 2.22 | ❌ Decorative fills only; pair with Forest text |

**Token rule:** use `--accent-muted` (Fern) only for large secondary headings (`text-2xl`+), borders, and icons. For muted/supporting/caption text use `--muted` (Forest tint), which passes AA at any size.

**Known exception:** the homepage "quit for good" pledge count renders in Blush (2.22, below AA) as a deliberate brand accent on a very large display number. It is the one intentional contrast exception; revisit if accessibility requirements tighten.

---

## Typography

Three typefaces, each with a distinct role.

| Role | Family | Weights available | Source | License |
|---|---|---|---|---|
| **Display / Hero** | Built Titling | El, Lt, Rg, Sb, Bd (+ italics) | `app/fonts/built-titling/` | Free for commercial use (dafont listing) |
| **Body / Copy / UI** | Raleway | Variable (100–900 + italic) | `app/fonts/raleway/` | SIL OFL |
| **Accent / Handwritten** | Sue Ellen Francisco | Regular | `app/fonts/sue-ellen-francisco/` | SIL OFL |

### Type hierarchy

| Level | Family | Scale (mobile → desktop) | Weight |
|---|---|---|---|
| Display / Hero | Built Titling | `text-5xl → text-7xl` | Rg / Bd |
| Section header | Built Titling | `text-3xl → text-5xl` | Rg / Sb |
| Subheading | Raleway | `text-xl → text-2xl` | 600 |
| Body | Raleway | `text-base → text-lg` | 400 |
| Caption / fine print | Raleway | `text-sm` | 400 |
| Accent / quote | Sue Ellen Francisco | `text-2xl → text-4xl` | Regular |

### CSS font variables

```css
--font-display: "Built Titling", sans-serif;
--font-body:    "Raleway", sans-serif;
--font-accent:  "Sue Ellen Francisco", cursive;
```

---

## Logos

Files live in `public/brand/logos/`. Every variant except `Inverted` is Forest
`#386641` on transparent; `Inverted` is white `#fff` on transparent.

| File | `variant` prop | Color | When to use |
|---|---|---|---|
| `Primary Logo.svg` | `primary` | Forest | Default on Cream backgrounds |
| `Secondary Logo.svg` | `secondary` | Forest | Stacked lockup, secondary placements |
| `Wordmark.svg` | `wordmark` | Forest | Type-only, tight horizontal spaces |
| `Icon.svg` | `icon` | Forest | Mark only, compact / app-icon contexts |
| `Favicon.svg` | — | Forest | Browser favicon (see below) |
| `Monochrome.svg` | `mono` | Black | Single-ink print, low-color contexts |
| `Inverted.svg` | `inverted` | White | On Forest / photographic backgrounds |

### The `<Logo>` component (`app/components/Logo.tsx`)

```tsx
<Logo variant="primary" height={44} />        // forest lockup on cream
<Logo variant="inverted" height={40} bare />  // cream lockup on forest (nav)
```

- **Pick the variant by background, not by preference.** Forest variants on
  Cream/light surfaces; `inverted` on Forest or photos. Never place a Forest
  variant on Forest (invisible).
- `height` sets the rendered height in px; width scales to preserve the
  viewBox aspect ratio. `alt` defaults to "Disconnect Madison"; pass `alt=""`
  when adjacent text already names the logo.
- **Clear-space** is enforced by a wrapper that pads ~25% of the mark height on
  all sides. Pass `bare` to opt out when the surrounding layout already
  provides spacing (e.g. the nav bar).
- Current placements: `inverted` in `Navigation`, `primary` in `Footer`.

### Favicon & social card

- Favicon is the brand mark via file conventions: `app/icon.svg` (modern SVG),
  `app/apple-icon.png` (180px), and `public/favicon.ico` (legacy 32px). The
  raster files are regenerated from `Favicon.svg` with `sharp`.
- The OG / Twitter card is generated at `app/opengraph-image.tsx` (Forest
  field, Lime accent, Cream wordmark). It uses **Raleway** rather than Built
  Titling: satori (the `next/og` renderer) can't parse Built Titling's OTF/CFF
  outlines or the Raleway *variable* font, so static Raleway instances live in
  `app/fonts/raleway-static/` (generated with `fonttools varLib.instancer`).

### Asset note

`Inverted.svg` as delivered carried a full-bleed black `<rect>` background
(an export artifact); it was removed so the variant is white-on-transparent and
sits correctly on Forest.

---

## Licensing notes

- **Built Titling**: Author confirmed free for commercial use on dafont.com. The Drive folder (`03_TYPOGRAPHY/Built Titling`) also includes a Typodermic desktop EULA — we rely on the dafont free-for-commercial grant. Keep evidence of that grant archived in `00_GUIDELINES` on Drive.
- **Raleway**: SIL Open Font License 1.1.
- **Sue Ellen Francisco**: SIL Open Font License 1.1.
