# app/components/ — Shared Components

All components here are shared across multiple pages. Page-specific components (charts, carousels for a single route) live in their route folder instead.

## Component Catalog

### Navigation & Layout

**`NavigationWrapper.tsx`** — Server Component
- Fetches total pledge count via `getPledgesAction()`, passes it to `Navigation`
- Used in root layout. This is why the root layout sets `force-dynamic`.

**`Navigation.tsx`** — Client Component (`'use client'`)
- Props: `totalPledges?: number`
- Hamburger menu for mobile, horizontal link list for desktop (`lg:` breakpoint)
- Pledge count shown inline on desktop only
- Nav links: Learn, Now what?, About, Help us grow, Donate (amber button), Pledge Today (emerald button)
- **When adding a route to the nav**, edit both the desktop `<ul>` and the mobile dropdown `<ul>`.

**`Footer.tsx`** — Server Component
- 4-column grid: Brand description, Pages, Resources, Get in touch
- **When adding a public route**, add a `<li>` to the Pages column.
- Bottom bar shows "no cookies / no tracking" note.

### Homepage Sections

**`Hero.tsx`** — Server Component
- Homepage hero: headline, 2 body paragraphs, PLEDGE TODAY + TAKE THE QUIZ CTA buttons, nonprofit disclaimer
- The `#pledge-button` id is used in `globals.css` to exclude it from the default link styling.

**`PledgeCounter.tsx`** — Server Component
- Calls `getPledgesAction()` directly (no props)
- Displays 3 counts: reduce / step away / quit for good
- Uses `font-display` for numbers, `text-(--primary-color)` for reduce count, `text-(--primary-accent)` for quit count

**`NewsCarousel.tsx`** — Server Component
- Calls `getNewsArticlesAction()` (returns up to 10 articles)
- Horizontal scroll, card per article with image + title
- Returns `null` if no articles
- Uses `link-news` CSS class to override default link styling (no underline, foreground color)

**`KidsCallout.tsx`** — Server Component
- 3-card callout linking to `/learn/kids`, `/learn/dependency`, and one other research page
- Used on the homepage below the hero

### Interactive / Client Components

**`Accordion.tsx`** — Client Component (`'use client'`)
- Exports two named exports: `Accordion` and `AccordionItem`
- Built on Headless UI `Disclosure`
- `AccordionItem` props: `title: string`, `children: React.ReactNode`, `defaultOpen?: boolean`
- Usage: wrap `<AccordionItem>` elements inside `<Accordion>`
- Used on `/faq` and `/help-yourself`

**`HelpYourselfAccordion.tsx`** — Client Component (`'use client'`)
- The accordion content sections for `/help-yourself`
- Separated into its own client component so the page shell stays a Server Component

**`BadgeShare.tsx`** — Client Component (`'use client'`)
- Props: `pledgeAction: string` (`reduce_screen_time` | `take_a_break` | `quit_for_good`)
- Displays the matching badge image (`/badges/badge-*.png`)
- "Share your badge" button: uses Web Share API with file if supported, falls back to download
- "Copy text" button: copies a pre-written share message to clipboard
- Returns `null` for unknown pledge actions
- Shown on `/verify` after successful pledge confirmation

**`ReferralQuestion.tsx`** — Client Component (`'use client'`)
- Props: `token: string` (the verification token, used to associate the answer with the pledge row)
- Shows 5 referral source options as pill buttons
- On select (non-other): immediately calls `submitReferralAction` server action
- "Other" option shows a text input; submits on Enter or button click
- Shows a thank-you message after submission
- Shown on `/verify` after successful pledge confirmation

**`FlyerCarousel.tsx`** — Client Component (`'use client'`)
- Exports type `Flyer = { file: string; name: string; description: string }`
- Props: `flyers: Flyer[]`, `aspectRatio?: string` (default `'8.5 / 11'` for letter-size PDFs, `'3.5 / 2'` for cards)
- Renders PDFs as `<iframe>` previews inside scrollable card carousel
- Left/right arrow buttons (desktop only), dot pagination indicators
- Scroll amount: 408px (384px card + 24px gap)
- Used on `/grow` for color flyers, B&W flyers, and hand-out cards

**`Logo.tsx`** — Server Component
- Props: `variant` (`primary | secondary | wordmark | icon | mono | inverted`), `height`, `alt`, `bare`, `priority`
- Renders the matching pre-colored SVG from `public/brand/logos/` via `next/image`; enforces clear-space via a padding wrapper (`bare` opts out)
- Pick the variant by background: forest variants on cream, `inverted` (cream) on forest. Used: `inverted` in `Navigation`, `primary` in `Footer`. See BRAND.md.

**`TiltWrapper.tsx`** — Client Component (`'use client'`)
- Props: `children: React.ReactNode`, `className?: string`
- Wraps any element with a CSS 3D tilt effect on hover/touch using `requestAnimationFrame`
- Uses `perspective(900px) rotateX/Y` up to ±10deg, dynamic box-shadow
- Resets smoothly on mouse leave

**`LogoutButton.tsx`** — Client Component (`'use client'`)
- No props
- Signs out via `supabase.auth.signOut()` using the browser Supabase client
- Redirects to `/login` on success
- Used on admin pages

**`DistractedDrivingChart.tsx`**
- Chart component used on a learn page
- Check the file for import details if working in `/learn`

## Styling Notes

- All components use Tailwind utility classes inline (no extracted CSS classes)
- Light-only brand theme. Use the semantic tokens (`text-(--accent)`, `text-(--accent-muted)`, `bg-(--surface)`, `border-(--border-subtle)`, etc.) or the named utilities (`bg-cta`, `text-on-cta`, `bg-forest`, `text-cream`). Never use raw Tailwind palette colors (`emerald-*`, `amber-*`, `gray-*`, `white`, `black`) or `dark:` variants. Full reference: `BRAND.md` and `/style-guide`.
- Primary CTAs are lime fill + forest text (`bg-cta text-on-cta`); secondary/ghost actions use forest/fern. Emotional accents (quotes) use `--accent-emotional` (blush) or `font-accent`.
- The PayPal/portfolio links (`#paypal-donate-button`, `#portfolio-link`) use a static Fern-outline rule in `globals.css`.
- The `globals.css` `main a:not(...)` rule applies underline + accent color to all links in `<main>`. To opt out, add the element's id to the `:not()` list, or use the `.link-news` or `.link-card` CSS classes.
