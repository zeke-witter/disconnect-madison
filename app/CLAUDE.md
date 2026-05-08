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
- Fonts: Geist Sans, Geist Mono, Handjet, Space Grotesk loaded via `next/font/google`
- Theme initialization: inline script in `<head>` reads `localStorage.getItem('theme')` and sets `data-theme` attribute on `<html>` before paint (avoids flash)
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

### Design Tokens (CSS Custom Properties)

Defined in `:root`. Referenced in Tailwind via `text-(--var-name)`, `bg-(--var-name)`, `border-(--var-name)`.

| Token | Dark (default) | Light |
|---|---|---|
| `--background` | `#141C1B` | `#E8D9BC` |
| `--foreground` | `#EDEBE6` | `#1A1A1A` |
| `--primary-accent` | `#e06858` | `#8C3A2B` |
| `--primary-accent-hover` | `#ea7a6c` | `#a84331` |
| `--primary-color` | `#4a948d` | `#1A7268` |
| `--secondary-accent` | `#91b0b6` | `#445D61` |
| `--nav-background` | `#1F3D3A` | `#2B5250` |
| `--on-accent` | `#141C1B` | `white` |

### Dark Mode

**Important:** Tailwind's `dark:` variants only respond to `prefers-color-scheme: dark` (OS preference). They do NOT respond to the `data-theme` dev toggle. Never use `dark:` utilities in this codebase.

Instead, all dark/light variations are handled via CSS custom properties. The `data-theme` attribute (set via `DarkModeToggle` in dev) overrides the media query via `:root[data-theme="dark"]` and `:root[data-theme="light"]` selectors.

### Light Mode Override Pattern

When an element needs a hard-coded color override in light mode that can't be expressed as a CSS variable (e.g., the PayPal button's amber color), use this double-rule pattern:

```css
/* Responds to OS preference (covers production users) */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) #element-id { ... }
}

/* Responds to dev toggle */
:root[data-theme="light"] #element-id { ... }
```

Currently applies to: `#paypal-donate-button`, `#portfolio-link`.

### Global Link Styling

`main a:not(...)` applies `color: var(--primary-accent)` and `text-decoration: underline` to all links inside `<main>`.

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
| `/verify` | Server | Email verification + badge share |
