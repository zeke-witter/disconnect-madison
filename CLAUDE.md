# Disconnect Madison — Project Brief

## What It Is
Disconnect Madison is a grassroots community project based in Madison, WI that encourages people to intentionally reduce or eliminate their use of algorithm-driven social media. It is not a business, nonprofit (yet), political organization, or product. It is a voluntary, self-directed civic experiment operated by one person with no budget, no staff, and no investors.

## The Website (disconnectmadison.org)
The site is a Next.js application built and maintained by the founder. It uses one cookie (`NEXT_LOCALE`) to remember language preference — no tracking, no analytics. Key pages:

- **/** — Landing page with pledge counter, mission summary, and curated news links about social media harms, the ongoing addiction trial, data center environmental impacts, etc.
- **/learn** — Summary of research findings on how algorithm-driven social media affects mental health: depression/anxiety, sleep disruption, attention/focus, loneliness, body image, polarization/outrage, and environmental costs of data centers. Ends with a section on what improves when people step away. Cards link to dedicated subpages.
- **/learn/kids** — Research specifically on how social media and screen time affect children and adolescents. A key concern of the project.
- **/learn/dependency** — Deep dive on device dependency: cognitive offloading, the Google Effect, GPS and spatial memory, phone presence effects, and AI.
- **/learn/sleep** — Research on how social media and screen time disrupt sleep: blue light, content arousal, adolescent biology, and the bidirectional feedback loop.
- **/learn/attention** — The attention economy, interruption costs (Gloria Mark), the Ward phone-on-desk study, media multitasking research, and adolescent prefrontal development.
- **/learn/depression** — Correlation vs. causation, Twenge's 2012 inflection point, passive vs. active use, demographic vulnerability, and what improves with reduced use.
- **/learn/body-image** — Facebook internal research (WSJ 2021), algorithmic amplification, social comparison theory, the Nature Communications developmental window finding, and filter effects.
- **/learn/ecological-impact** — Data center electricity and water consumption, AI's compounding footprint, Wisconsin-specific jobs/subsidies analysis (Meta Beaver Dam, Microsoft), and social media's role in driving demand.
- **/help-yourself** — Practical guide with strategies for reducing screen time, changing habits, and making the change stick.
- **/faq** — Frequently asked questions covering who the project is for, what counts as social media, why pledge, how email is used, the name's meaning, the hypocrisy question, and how to get involved. Uses the shared Accordion component.
- **/quiz** — A 10-question self-reflection quiz ("Is social media affecting you?"). No account needed, nothing recorded. Scores produce one of three result levels (low/medium/high) with tailored messaging and links to relevant pages. Displayed as a prominent secondary CTA on the homepage alongside the pledge button.
- **/pledge** — The core action. Visitors pledge to do one of three things in the next 10 days: (1) reduce screen time, (2) step away (deactivate accounts), or (3) quit for good (permanently delete accounts). Emails are collected only for pledge integrity; they are never shared or used for marketing.
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

## Current State (as of March 2026)
- ~63 pledges (40 reduce, 17 step away, 6 quit for good)
- One flyer design available (general purpose PDF)
- No formal nonprofit status
- No partnerships yet
- The social media addiction trial (Meta et al.) is actively in the news, creating a favorable environment for the project's message
- Spanish localization in progress (see Localization section below)

## Tech Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` for design tokens)
- Headless UI (`@headlessui/react`) for accessible form components
- Supabase — PostgreSQL database + auth (`pledges` and `news_articles` tables)
- Resend — transactional email (pledge verification, contact form)
- Cloudflare Turnstile — bot protection on pledge and contact forms
- Recharts — data visualisation on `/learn/kids`
- next-intl — internationalization (i18n) for Spanish localization
- npm as the package manager

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Project Structure

```
app/
  layout.tsx                        # Root layout (fonts, nav, Footer, NextIntlClientProvider)
  globals.css                       # CSS variables, dark/light theme, Tailwind v4, external link icon
  not-found.tsx                     # 404 page
  robots.ts                         # robots.txt config
  sitemap.ts                        # XML sitemap
  [locale]/                         # Localized routes (en + es)
    page.tsx                        # Home (PledgeCounter, Hero, KidsCallout, NewsCarousel)
    pledge/
      page.tsx                      # Pledge form (client) — fully translated
      layout.tsx                    # Pledge page metadata with hreflang alternates
  about/page.tsx                    # Founder story and mission
  contact/page.tsx                  # Contact form (client)
  contact/layout.tsx                # Contact page metadata layout
  grow/page.tsx                     # Community growth / flyer downloads
  grow/flyer-locations/page.tsx     # Flyer location map/list
  help-yourself/page.tsx            # Practical guide with accordion
  learn/page.tsx                    # "The cost of social media" overview with LearnGrid
  learn/kids/page.tsx               # Research on social media and children
  learn/kids/ChartsWrapper.tsx      # Dynamic imports for Recharts (client-only)
  learn/kids/PlatformUsageChart.tsx # Horizontal bar chart — platform usage by teens
  learn/kids/TeenDepressionChart.tsx # Area chart — CDC depression trends 2009-2023
  learn/dependency/page.tsx         # Device dependency and cognitive effects
  learn/sleep/page.tsx              # Sleep disruption research
  learn/attention/page.tsx          # Attention economy and focus research
  learn/depression/page.tsx         # Depression and anxiety research
  learn/body-image/page.tsx         # Body image and social comparison research
  learn/ecological-impact/page.tsx  # Data center environmental impact, Wisconsin jobs/subsidies
  faq/page.tsx                      # Frequently asked questions (accordion, server component)
  quiz/page.tsx                     # Self-reflection quiz — 10 questions, scored results (client)
  quiz/layout.tsx                   # Quiz page metadata layout
  sources/page.tsx                  # Academic citations
  verify/page.tsx                   # Email verification and pledge badge sharing
  add-news/page.tsx                 # Admin: add news articles by URL (auth required)
  login/page.tsx                    # Admin login (client)
  dev/page.tsx                      # Dev/staging: pledge and news article manager
  breathe/page.tsx                  # Breathing exercises page
  components/
    Navigation.tsx                  # Header nav with mobile hamburger menu (client, translated)
    NavigationWrapper.tsx           # Fetches pledge counts for nav display (server)
    Footer.tsx                      # Footer with Pages / Resources / Contact columns (translated)
    Hero.tsx                        # Homepage hero section with CTA (translated)
    PledgeCounter.tsx               # Live pledge stats (server, translated)
    NewsCarousel.tsx                # Horizontal news article carousel (server, translated heading)
    KidsCallout.tsx                 # 3-card callout linking to research sub-pages (translated)
    LearnGrid.tsx                   # Interactive card grid for /learn with TiltCard and modals (client)
    BadgeShare.tsx                  # Social sharing for pledge badges (client)
    Accordion.tsx                   # Reusable Headless UI disclosure component
    HelpYourselfAccordion.tsx       # Accordion content for /help-yourself
    LanguageSwitcher.tsx            # EN/ES toggle — only renders on localized pages (client)
    DarkModeToggle.tsx              # Light/dark override toggle (client, dev page only)
lib/
  actions.ts                        # All server actions ('use server')
  metadata.ts                       # Site config and full SEO metadata (OG, Twitter)
  supabase.ts                       # Server-side Supabase client (secret key)
  supabase-auth.ts                  # Supabase SSR auth client for Server Components
  supabase-browser.ts               # Supabase browser client (public key)
i18n/
  routing.ts                        # next-intl locale config (locales: en, es)
  request.ts                        # Per-request config — loads messages/[locale].json
  navigation.ts                     # createNavigation export for locale-aware hooks
messages/
  en.json                           # English strings (hero, pledgeCounter, kidsCallout, pledge, nav, footer, newsCarousel)
  es.json                           # Spanish translations — same structure as en.json
middleware.ts                       # next-intl locale routing + Supabase auth for /add-news
public/
  flyers/                           # Flyer PDFs (color and -bw black-and-white variants)
  not-business-cards/               # Small hand-out card PDFs
  badges/                           # Pledge badge images (badge-reduce.png, badge-step-away.png, badge-quit.png)
```

## Localization (Spanish — in progress)

The site uses next-intl for i18n. Spanish (`es`) is supported on the homepage and pledge flow only; all other pages remain English.

**URL structure:**
- English: `/` and `/pledge` (unchanged)
- Spanish: `/es` and `/es/pledge`

**How it works:**
- `localeDetection: true` — Spanish-speaking browsers (via `Accept-Language` header) are automatically redirected to `/es`
- `localePrefix: 'as-needed'` — English URLs have no prefix; Spanish gets `/es/`
- One `NEXT_LOCALE` cookie remembers the user's language preference after first detection
- The `LanguageSwitcher` component appears in the nav on localized pages only; switching does a hard navigation and updates the cookie
- The middleware intercepts any `/es/[path]` redirect where no Spanish version exists and serves the English page instead, preventing 404s

**To add Spanish support for a new page:**
1. Create `app/[locale]/[page]/page.tsx` (move or duplicate from `app/[page]/page.tsx`)
2. Add translation keys to `messages/en.json` and `messages/es.json`
3. Add the path to `SPANISH_PATHS` in `middleware.ts`

**Translation files:** `messages/en.json` and `messages/es.json` contain all translatable strings organized by namespace (`hero`, `pledgeCounter`, `kidsCallout`, `pledge`, `nav`, `footer`, `newsCarousel`). The Spanish file was machine-translated as a starting point and should be reviewed by a native speaker before launch.

## Conventions

### Routing & Components
- File-based routing via App Router (`page.tsx` per route)
- Localized pages live under `app/[locale]/`; English-only pages remain at `app/[page]/`
- Server Components by default; use `'use client'` only when client interactivity is required
- Server Actions use `'use server'` directive in `lib/actions.ts`
- Form state management via React 19's `useActionState`
- Default exports for all page and component files
- Components live in `app/components/`; shared logic in `lib/`
- Translations: server components use `getTranslations()` from `next-intl/server`; client components use `useTranslations()` from `next-intl`

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

### Copy & Tone
- Avoid em dashes (—) in copy. They have become a recognizable marker of AI-generated text and the site's voice should feel human and personal. Use commas, colons, semicolons, parentheses, or restructured sentences instead.

### Current Technical State
- Database: Supabase PostgreSQL with two tables — `pledges` (email, pledge_action, confirmed, verification_token, newsletter_opt_in) and `news_articles` (url, title, image_url)
- Auth: Supabase Auth (password-based) protects `/add-news` via `middleware.ts`; `createServerAuthClient()` in `lib/supabase-auth.ts` handles SSR cookie-based sessions
- Email: Resend sends pledge verification emails and contact form messages, all from `hello@disconnectmadison.org`
- Bot protection: Cloudflare Turnstile on pledge and contact forms; honeypot field on pledge form
- OG/Twitter metadata is complete in `lib/metadata.ts`
- Cookie policy: one `NEXT_LOCALE` cookie for language preference — no tracking, no analytics
- All pages are fully implemented; Spanish localization covers homepage and pledge flow
