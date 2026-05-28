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

### Contrast rules (WCAG AA)

- **Forest on Cream** (~7:1): Use for all body text and headings.
- **Cream on Forest** (high): Use for text on dark/inverted sections, nav, footer.
- **Fern on Cream** (~3:1): Large text, icons, borders only — not body copy.
- **Lime as text**: Fails. Lime is a fill/background, never a text color.
- **Lime background + Forest text**: Passes for CTAs.
- **Blush as text**: Fails. Decorative fills only; pair with Forest text.

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

Files live in `public/brand/logos/`. All variants are Forest `#386641` on transparent.

| File | Variant | When to use |
|---|---|---|
| `Primary Logo.svg` | Full lockup | Default on Cream backgrounds |
| `Secondary Logo.svg` | Alternate lockup | Secondary placements |
| `Wordmark.svg` | Type-only | Tight horizontal spaces |
| `Icon.svg` | Mark only | Compact / app icon contexts |
| `Favicon.svg` | Simplified mark | Browser favicon |
| `Monochrome.svg` | Single-color | Single-ink print, low-color contexts |
| `Inverted.svg` | Light-on-dark | On Forest / photographic backgrounds |

Use the `<Logo>` component (Phase 3) — it enforces clear-space and the correct variant.

---

## Licensing notes

- **Built Titling**: Author confirmed free for commercial use on dafont.com. The Drive folder (`03_TYPOGRAPHY/Built Titling`) also includes a Typodermic desktop EULA — we rely on the dafont free-for-commercial grant. Keep evidence of that grant archived in `00_GUIDELINES` on Drive.
- **Raleway**: SIL Open Font License 1.1.
- **Sue Ellen Francisco**: SIL Open Font License 1.1.
