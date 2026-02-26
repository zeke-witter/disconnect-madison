# Disconnect Society — Project Brief

## What It Is
Disconnect Society is a grassroots community project based in Madison, WI that encourages people to intentionally reduce or eliminate their use of algorithm-driven social media. It is not a business, nonprofit (yet), political organization, or product. It is a voluntary, self-directed civic experiment operated by one person with no budget, no staff, and no investors.

## The Website (disconnectsociety.org)
The site is a Next.js application built and maintained by the founder. It does not use cookies or track visitors. Key pages:

- **/** — Landing page with pledge counter, mission summary, and curated news links about social media harms, the ongoing addiction trial, data center environmental impacts, etc.
- **/learn** — Summary of research findings on how algorithm-driven social media affects mental health: depression/anxiety, sleep disruption, attention/focus, loneliness, body image, polarization/outrage, and environmental costs of data centers. Ends with a section on what improves when people step away.
- **/learn/kids** — Research specifically on how social media and screen time affect children and adolescents. A key concern of the project.
- **/learn/dependency** — Deep dive on device dependency: cognitive offloading, the Google Effect, GPS and spatial memory, phone presence effects, and AI.
- **/help-yourself** — Practical guide with strategies for reducing screen time, changing habits, and making the change stick.
- **/pledge** — The core action. Visitors pledge to do one of three things in the next 10 days: (1) reduce screen time, (2) step away (deactivate accounts), or (3) quit for good (permanently delete accounts). Emails are collected only for pledge integrity; they are never shared or used for marketing. As of late February 2026, the site has ~63 pledges.
- **/sources** — Citations for all research claims made on the site.
- **/about** — The founder's personal story: noticed negative changes in themselves (isolation, anxiety, anger, lost time, difficulty focusing), started deleting accounts one by one, and found life improved. Started the project to help others do the same.
- **/grow** — Asks visitors to spread the word, print/post flyers (PDF available), and get in touch if they want to help. Notes a specific need for graphic designers and community organizers.
- **/contact** — Contact form.

## Tone & Values
- Research-driven but accessible — cites clinical studies and longitudinal research without being academic
- Non-judgmental — "not a moral purity test," voluntary, self-directed
- Personal and authentic — founded from lived experience, not ideology
- Anti-attention-economy, not anti-technology — the problem is algorithm-driven social media specifically, not the internet or technology broadly
- Community-oriented — emphasizes reconnecting with the real world and local community
- Nonpartisan — not affiliated with any political party, company, or competitor

## Constraints
- One person operating the project
- Little to no budget
- Founder's background is in software/web development
- Limited design expertise (acknowledged on the /grow page)
- No prior experience in community organizing or growing a social movement
- Based in Madison, WI with hopes to eventually expand beyond Dane County
- Hopes to eventually partner with local businesses and organizations

## Current State (as of Feb 2026)
- ~63 pledges (40 reduce, 17 step away, 6 quit for good)
- One flyer design available (general purpose PDF)
- No formal nonprofit status
- No partnerships yet
- The social media addiction trial (Meta et al.) is actively in the news, creating a favorable environment for the project's message

## Tech Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` for design tokens)
- Headless UI (`@headlessui/react`) for accessible form components
- Supabase — PostgreSQL database + auth (`pledges` and `news_articles` tables)
- Resend — transactional email (pledge verification, contact form)
- Cloudflare Turnstile — bot protection on pledge and contact forms
- Recharts — data visualisation on `/learn/kids`
- npm as the package manager

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Project Structure

```
app/
  layout.tsx                        # Root layout (fonts, nav, Footer, Turnstile script)
  page.tsx                          # Home (PledgeCounter, Hero, KidsCallout, NewsCarousel)
  globals.css                       # CSS variables, dark/light theme, Tailwind v4, external link icon
  not-found.tsx                     # 404 page
  robots.ts                         # robots.txt config
  sitemap.ts                        # XML sitemap
  about/page.tsx                    # Founder story and mission
  contact/page.tsx                  # Contact form (client)
  contact/layout.tsx                # Contact page metadata layout
  grow/page.tsx                     # Community growth / flyer downloads
  help-yourself/page.tsx            # Practical guide with accordion
  learn/page.tsx                    # "The cost of social media" overview
  learn/kids/page.tsx               # Research on social media and children
  learn/kids/ChartsWrapper.tsx      # Dynamic imports for Recharts (client-only)
  learn/kids/PlatformUsageChart.tsx # Horizontal bar chart — platform usage by teens
  learn/kids/TeenDepressionChart.tsx # Area chart — CDC depression trends 2009–2023
  learn/dependency/page.tsx         # Device dependency and cognitive effects
  pledge/page.tsx                   # Pledge form (client)
  pledge/layout.tsx                 # Pledge page metadata layout
  sources/page.tsx                  # Academic citations
  verify/page.tsx                   # Email verification and pledge badge sharing
  add-news/page.tsx                 # Admin: add news articles by URL (auth required)
  login/page.tsx                    # Admin login (client)
  dev/page.tsx                      # Dev/staging: pledge and news article manager
  components/
    Navigation.tsx                  # Header nav with mobile hamburger menu (client)
    NavigationWrapper.tsx           # Fetches pledge counts for nav display (server)
    Footer.tsx                      # Footer with Pages / Resources / Contact columns
    Hero.tsx                        # Homepage hero section with CTA
    PledgeCounter.tsx               # Live pledge stats (server)
    NewsCarousel.tsx                # Horizontal news article carousel (server)
    KidsCallout.tsx                 # 3-card callout linking to research sub-pages
    BadgeShare.tsx                  # Social sharing for pledge badges (client)
    Accordion.tsx                   # Reusable Headless UI disclosure component
    HelpYourselfAccordion.tsx       # Accordion content for /help-yourself
    DarkModeToggle.tsx              # Light/dark override toggle (client, dev page only)
lib/
  actions.ts                        # All server actions ('use server')
  metadata.ts                       # Site config and full SEO metadata (OG, Twitter)
  supabase.ts                       # Server-side Supabase client (secret key)
  supabase-auth.ts                  # Supabase SSR auth client for Server Components
  supabase-browser.ts               # Supabase browser client (public key)
middleware.ts                       # Redirects unauthenticated /add-news to /login
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
- Dark mode via `@media (prefers-color-scheme: dark)` overriding `:root` variables; dev-only `data-theme` attribute on `<html>` overrides system preference (`data-theme="dark"` or `"light"`)
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
- Database: Supabase PostgreSQL with two tables — `pledges` (email, pledge_action, confirmed, verification_token, newsletter_opt_in) and `news_articles` (url, title, image_url)
- Auth: Supabase Auth (password-based) protects `/add-news` via `middleware.ts`; `createServerAuthClient()` in `lib/supabase-auth.ts` handles SSR cookie-based sessions
- Email: Resend sends pledge verification emails and contact form messages, all from `noreply@disconnectsociety.org`
- Bot protection: Cloudflare Turnstile on pledge and contact forms; honeypot field on pledge form
- OG/Twitter metadata is complete in `lib/metadata.ts`
- All pages are fully implemented