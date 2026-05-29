# app/ — Next.js App Router

## Routing Conventions

File-based routing via App Router. Every route is a folder with a `page.tsx`. Nested routes are nested folders.

```
app/
  page.tsx              → /
  learn/
    page.tsx            → /learn
    kids/
      page.tsx          → /learn/kids
```

**`layout.tsx`** wraps child routes. The root `app/layout.tsx` provides the global shell: fonts, `<NavigationWrapper>`, `<main>`, and `<Footer>`.

**`layout.tsx` in sub-routes** is used only for metadata (title, description, canonical). It does not add visual structure. Example: `app/pledge/layout.tsx`.

## Server vs Client Components

Default is **Server Component**. Add `'use client'` only when the component needs:
- React state (`useState`, `useReducer`)
- Browser APIs or event handlers
- `useActionState` / `useFormStatus`

Server Actions live in `lib/actions.ts` with `'use server'`. They are called from both server and client components via `form action={...}` or direct invocation.

## Root Layout Details (`app/layout.tsx`)

- `export const dynamic = 'force-dynamic'` disables static caching globally (required for live pledge counts in nav)
- Fonts: the three brand faces via `next/font/local` (see BRAND.md) — Built Titling → `--font-display`, Raleway (variable) → `--font-body`, Sue Ellen Francisco → `--font-accent`. Body defaults to `--font-body`.
- Light-only theme: no dark mode, no theme-init script, no `data-theme` toggle (all removed in the brand overhaul).
- Main content area: `<main id="main-content">` with horizontal padding at `px-4 sm:px-8 lg:px-16`

## Route Protection

`middleware.ts` guards specific routes by checking Supabase session. Unauthenticated requests redirect to `/login`.

Currently protected: `/add-news`, `/dev`
Planned: `/admin/*` (when admin section is built)

**Pattern for adding a protected route:** add its path to the `matcher` array in `middleware.ts`.

## Metadata Pattern

Every page exports a `metadata` object (or a `generateMetadata` function for dynamic routes):

```typescript
export const metadata: Metadata = {
    title: "Page Title",           // becomes "Page Title | Disconnect Madison"
    description: "...",
    alternates: { canonical: "/route" },
};
```

The title template (`%s | Disconnect Madison`) is set in `lib/metadata.ts` via `baseMetadata`. The root layout uses `baseMetadata` directly.

## Form State Pattern (React 19)

All form-heavy pages use `useActionState` from React 19:

```typescript
const [state, formAction, isPending] = useActionState(serverAction, initialState);
```

`useFormStatus` is used inside submit button components to access `pending` state without prop drilling.

## Styling System (`globals.css`)

**Light-only brand theme.** Full reference: `BRAND.md` and the live `/style-guide` route (noindex). The token system is two tiers, both in `:root` and surfaced to Tailwind v4 via `@theme inline`.

### Tier 1 — brand primitives

Raw palette; never reference directly in components. `--brand-forest` `#386641`, `--brand-fern` `#6A994E`, `--brand-lime` `#A7C957`, `--brand-cream` `#FEF8E8`, `--brand-blush` `#E88FA5`, plus tints/shades (`--brand-forest-hover`, `--brand-lime-hover`, `--brand-blush-light`, etc.).

### Tier 2 — semantic tokens (use these)

Referenced via arbitrary syntax `text-(--token)` / `bg-(--token)` / `border-(--token)`, or the named utilities exposed in `@theme inline` (`bg-forest`, `text-cream`, `bg-cta`, `text-on-cta`, etc.).

| Token | Maps to | Role |
|---|---|---|
| `--background` | cream | Page background |
| `--foreground` | forest | Body text |
| `--surface` | cream −5% | Cards / panels |
| `--heading` | forest | Headings |
| `--accent` / `--accent-hover` | forest | Links, primary forest buttons |
| `--accent-muted` | fern | Secondary headings, supporting text, borders |
| `--border` / `--border-subtle` | fern / fern tint | Borders, dividers |
| `--muted` | forest tint | Muted text |
| `--cta-bg` / `--cta-bg-hover` / `--cta-text` | lime / forest | Primary CTAs (lime fill, forest text) |
| `--accent-emotional` | blush | Quotes / human-touch accents |
| `--nav-background` | forest | Nav + inverted sections |
| `--on-accent` / `--on-forest` / `--on-cta` | cream / forest | Text on colored surfaces |

No dark mode: no `dark:` utilities, no `prefers-color-scheme` blocks, no `data-theme`. The PayPal/portfolio links (`#paypal-donate-button`, `#portfolio-link`) use a static Fern-outline rule.

### Global Link Styling

`main a:not(...)` applies `color: var(--accent)` and `text-decoration: underline` to all links inside `<main>` (hover → `var(--accent-hover)`).

To opt out of this styling:
- Add the element's `id` to the `:not()` list
- Or use the `.link-news` class (foreground color, no underline)
- Or use the `.link-card` class (inherits color, no underline)

### External Link Icon

Links with `target="_blank"` and `href` starting with `http` (not `disconnectmadison`) automatically get a small external link icon via CSS mask-image. To suppress it, add `.link-news` or `.link-card` class.

---

## Page Inventory

| Route | Type | Notes |
|---|---|---|
| `/` | Server | PledgeCounter, Hero, KidsCallout, NewsCarousel |
| `/about` | Server | Founder story |
| `/add-news` | Client | Admin-only, auth-gated |
| `/before-you-go` | Server | Guide for deactivating/deleting |
| `/breathe` | Server (mixed) | Breathing + grounding exercises, client subcomponents |
| `/contact` | Client | Contact form, Turnstile |
| `/dev` | Client | Dev/staging pledge + article manager, auth-gated |
| `/donate` | Client | Give Lively widget + PayPal |
| `/faq` | Server | Accordion Q&A |
| `/faq` | Server | Headless UI Accordion |
| `/grow` | Server | Flyer downloads, donation link |
| `/grow/flyer-locations` | Server | Map of flyer placement spots |
| `/help-yourself` | Server | Practical guide with accordion |
| `/internship-2026` | Server (mixed) | Tanisha Pathan profile + sticker carousel |
| `/learn` | Server | Research overview hub |
| `/learn/attention` | Server | Attention & focus research |
| `/learn/body-image` | Server | Body image research |
| `/learn/dependency` | Server (mixed) | Device dependency, BrainDrainChart |
| `/learn/depression` | Server | Depression/anxiety research |
| `/learn/ecological-impact` | Server | Data center environmental costs |
| `/learn/kids` | Server (mixed) | Kids/teens research, Recharts |
| `/learn/sleep` | Server | Sleep disruption research |
| `/login` | Client | Admin login |
| `/news` | Server | News article archive |
| `/pledge` | Client | Pledge form |
| `/quiz` | Client | Self-reflection quiz |
| `/sources` | Server | Academic citations |
| `/style-guide` | Server | Internal brand reference (noindex): colors, type, logos, buttons |
| `/verify` | Server | Email verification + badge share |
