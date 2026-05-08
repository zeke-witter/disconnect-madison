# public/ — Static Assets

All files here are served at the root URL path (e.g., `public/favicon.ico` → `/favicon.ico`).

## Directory Structure

```
public/
  badges/
    badge-reduce.png         → pledge badge: reduce screen time
    badge-step-away.png      → pledge badge: step away / take a break
    badge-quit.png           → pledge badge: quit for good
  flyers/
    flyer-*.pdf              → color flyers (one per venue type)
    flyer-*-bw.pdf           → black and white versions
  not-business-cards/
    card-leaf.pdf            → small two-sided hand-out card
  internship-showcase/
    disconnect to reconnect.png   → sticker design (filename has spaces)
    skip the scroll.png           → sticker design (filename has spaces)
  og-image.png               → Open Graph image (1200×630)
  paypal-qr.png              → PayPal donate QR code
  favicon.ico
  favicon-16x16.png
  favicon-32x32.png
```

## Flyer Naming Convention

Color flyers: `flyer-{type}.pdf`
B&W flyers: `flyer-{type}-bw.pdf`

Current types: `generic`, `neighbors`, `bartrivia`, `mindfulness`, `bookstore`, `coffee`, `mentalhealth`, `pets`, `epic`, `church`

When a new flyer pair is added:
1. Add both the color and `-bw` PDF to `public/flyers/`
2. Add entries to both `colorFlyers` and `bwFlyers` arrays in `app/grow/page.tsx`

## Badges

Referenced in `app/components/BadgeShare.tsx` via the `BADGE_MAP`. If badge images are updated, keep the same filenames or update the map.

## Sticker Images

Referenced in `app/internship-2026/StickerCarousel.tsx`. Filenames contain spaces — reference them as-is in `src` attributes (Next.js handles URL encoding automatically via `<Image>`). Do not rename them without updating the component.
