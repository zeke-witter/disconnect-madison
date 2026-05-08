# app/internship-2026/ — Design Intern Showcase

## Purpose

Showcase page for Tanisha Pathan, Disconnect Madison's design intern. Linked from `/about` and the Footer.

## Files

```
internship-2026/
  page.tsx            → server-rendered page shell
  layout.tsx          → metadata: "Internship 2026 — Tanisha Pathan"
  StickerCarousel.tsx → sticker image carousel (client)
```

## Page Structure

1. **Profile section** — placeholder photo div, 3-paragraph bio, "View her portfolio" link (`id="portfolio-link"`, amber styling)
2. **Sticker carousel** — `StickerCarousel` client component
3. **Brand design coming soon** — dashed border box indicating work in progress

## StickerCarousel.tsx

Client Component. State-managed carousel with prev/next arrows and dot indicators.

Sticker images in `public/internship-showcase/`:
- `disconnect to reconnect.png`
- `skip the scroll.png`

Note: filenames have spaces. Reference them exactly as-is in `src` attributes.

## Styling Notes

The `#portfolio-link` element uses amber styling matching the PayPal donate button. It is excluded from the global `main a:not(...)` underline rule in `globals.css`. Light-mode color override for this element is also in `globals.css` using the double-rule pattern (both `@media (prefers-color-scheme: light) :root:not([data-theme="dark"])` and `:root[data-theme="light"]`).

## When to Update

- If Tanisha's bio or portfolio URL changes, edit `page.tsx`
- If new sticker images are added, update the array in `StickerCarousel.tsx` and add the files to `public/internship-showcase/`
- If brand design assets are delivered, replace the "coming soon" placeholder section
