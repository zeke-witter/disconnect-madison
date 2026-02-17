# CLAUDE.md

## Project Overview

Disconnect Society — a community advocacy site encouraging people to disconnect from social media. Users can pledge to delete or deactivate accounts; the homepage displays pledge statistics.

## Tech Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` for design tokens)
- Headless UI (`@headlessui/react`) for accessible form components
- npm as the package manager

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Project Structure

```
app/                    # Next.js App Router
  layout.tsx            # Root layout (fonts, nav, main wrapper)
  page.tsx              # Home (PledgeCounter + Hero)
  globals.css           # CSS variables, dark mode, Tailwind v4 theme
  not-found.tsx         # 404 page
  about/page.tsx        # About route
  pledge/page.tsx       # Pledge form (client component)
  components/           # Shared UI components
lib/                    # Shared utilities
  metadata.ts           # Site config and SEO metadata
  actions.ts            # Server actions (form submission, data fetching)
```

## Conventions

### Routing & Components
- File-based routing via App Router (`page.tsx` per route)
- Server Components by default; use `'use client'` only when client interactivity is required
- Server Actions use `'use server'` directive in `lib/actions.ts`
- Form state management via React 19's `useActionState`
- Default exports for all page and component files
- Components live in `app/components/`; shared logic in `lib/`

### Styling
- Inline Tailwind utility classes directly on elements (no extracted component classes)
- Design tokens defined as CSS custom properties in `globals.css` `:root` and referenced via `@theme inline`
- Dark mode via `@media (prefers-color-scheme: dark)` overriding `:root` variables
- Fonts loaded via `next/font/google` and applied as CSS variables (`--font-handjet`, `--font-space-grotesk`, etc.)

### Accessibility
- Semantic HTML elements (`nav`, `main`, `header`, `footer`)
- ARIA attributes: `aria-label`, `aria-labelledby` on interactive and landmark elements
- Accessible form controls via Headless UI (`Field`, `Label`, `RadioGroup`, etc.)

### Code Style
- TypeScript with strict mode enabled
- Path alias `@/*` maps to the project root
- No explicit return types on React components
- Functional components only (no classes)

### Current State
- Pledge data is in-memory (dummy array in `actions.ts`) — no database yet
- OpenGraph/Twitter metadata is partially written but commented out in `lib/metadata.ts`
- `not-found.tsx` and `about/page.tsx` are stubs
