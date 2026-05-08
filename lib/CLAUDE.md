# lib/ — Shared Library Code

## Files

### `actions.ts` — Server Actions

All server actions. Top of file has `'use server'`. Direct imports from this file are safe from any component (server or client).

**Pledge flow:**
- `submitPledgeAction(initialState, formData)` — validates honeypot + Turnstile token + email + pledge type, inserts unconfirmed pledge row, sends verification email via Resend. Returns `{ success, message, email? }`.
- `resendVerificationAction(prevState, formData)` — resends verification email for an unconfirmed pledge. Always returns success (avoids leaking whether an email is in the DB).
- `verifyPledgeAction(token: string)` — marks pledge as confirmed. Dev tokens (`dev-reduce`, `dev-break`, `dev-quit`, `dev-fail`) bypass Supabase when not in production. Returns `{ success, message, pledgeAction? }`.
- `submitReferralAction(token, source, otherText?)` — updates `referral_source` on confirmed pledge. Silent no-op on bad input.

**Pledge reads:**
- `getPledgesAction()` — returns `{ reduce_screen_time, take_a_break, quit_for_good }` counts of confirmed pledges. Uses `noStore()` for live data.
- `getAllPledgesAction()` — all pledge rows (dev/staging management page).

**News articles:**
- `addNewsArticleAction(initialState, formData)` — admin only, fetches og:title + og:image from URL, inserts into `news_articles`, submits to Wayback Machine (non-blocking). Returns `{ success, message, needsManual?, url?, title? }`.
- `getNewsArticlesAction()` — returns 10 most recent articles.
- `getAllNewsArticlesAction()` — returns all articles with `archived_url`.

**Dev-only (no-op in production via `process.env.VERCEL_ENV` check):**
- `deletePledgeAction(formData)` — delete single pledge by id
- `deleteAllPledgesAction()` — delete all pledges
- `deleteNewsArticleAction(formData)` — delete single article
- `deleteAllNewsArticlesAction()` — delete all articles

**Contact:**
- `submitContactAction(initialState, formData)` — validates fields, sends email to `CONTACT_EMAIL` env var via Resend with sender as reply-to.

**Planned (not yet implemented):**
- `createEvent`, `updateEvent`, `deleteEvent` — event CRUD (admin auth required)
- `registerForEvent` — public registration, handles capacity + waitlist
- `cancelRegistration` — token-based cancellation, promotes waitlisted registrant
- `sendNewsletterBroadcast` — sends approved email draft via Resend Broadcasts API

---

### `supabase.ts` — Server-Side DB Client

```typescript
import { supabase } from '@/lib/supabase';
```

Uses `SUPABASE_URL` + `SUPABASE_SECRET_KEY` (service role key). **Server-only.** Never import in Client Components or expose to the browser. Used in all server actions for DB reads/writes.

Query pattern:
```typescript
const { data, error } = await supabase
    .from('table_name')
    .select('col1, col2')
    .eq('column', value)
    .order('created_at', { ascending: false })
    .limit(10);
```

---

### `supabase-auth.ts` — SSR Auth Client

```typescript
import { createServerAuthClient } from '@/lib/supabase-auth';
const authClient = await createServerAuthClient();
const { data: { user } } = await authClient.auth.getUser();
```

Uses `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `cookies()` for SSR. Used in Server Components and server actions that need to verify auth (e.g., `addNewsArticleAction`). The `setAll` cookie setter silently ignores errors (expected in Server Components).

---

### `supabase-browser.ts` — Browser Client

```typescript
import { createBrowserClient } from '@/lib/supabase-browser';
const supabase = createBrowserClient();
```

Uses anon key. Used only in Client Components (currently just `LogoutButton.tsx`).

---

### `metadata.ts` — SEO Config

```typescript
import { siteConfig, baseMetadata } from '@/lib/metadata';
```

- `siteConfig`: `{ name, description, url, ogImage, links }` — canonical site identity
- `baseMetadata`: Full `Metadata` object used in root `app/layout.tsx`. Includes OG, Twitter cards, robots, favicon icons.
- Individual pages override with their own `export const metadata` — the title template `%s | Disconnect Madison` is applied automatically.

---

### `quiz.ts` — Quiz Logic

```typescript
import { questions, getLevel, results } from '@/lib/quiz';
```

- `questions`: Array of 10 question objects `{ id, question, options: [{ label, value }] }`. Values are 0–3.
- `getLevel(score: number): ResultLevel` — `0–7` = `'low'`, `8–17` = `'medium'`, `18+` = `'high'`
- `results`: Record mapping `ResultLevel` to `{ title, body, links[] }` for the result display

---

## Environment Variables

| Variable | Client/Server | Used In | Notes |
|---|---|---|---|
| `SUPABASE_URL` | Server | `lib/supabase.ts` | Service role — never expose |
| `SUPABASE_SECRET_KEY` | Server | `lib/supabase.ts` | Service role — never expose |
| `NEXT_PUBLIC_SUPABASE_URL` | Both | `lib/supabase-auth.ts`, `middleware.ts`, `lib/supabase-browser.ts` | Safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Both | `lib/supabase-auth.ts`, `middleware.ts`, `lib/supabase-browser.ts` | Safe to expose |
| `RESEND_API_KEY` | Server | `lib/actions.ts` | Never expose |
| `RESEND_AUDIENCE_ID` | Server | `lib/actions.ts` (planned) | Newsletter audience |
| `CONTACT_EMAIL` | Server | `lib/actions.ts` | Where contact form goes |
| `NEXT_PUBLIC_BASE_URL` | Both | `lib/actions.ts` | Used to build verify URLs. `http://localhost:3000` locally |
| `VERCEL_URL` | Server | `lib/actions.ts` | Auto-set by Vercel; fallback for base URL |
| `VERCEL_ENV` | Server | `lib/actions.ts` | `'production'` in prod; used to gate dev-only actions |

All env vars must be set in `.env.local` (local dev) and in Vercel project settings (staging/production).

---

## Email Pattern

Resend is initialized once at module level:
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
```

All emails sent as raw HTML strings (not React Email). From address: `Disconnect Madison <hello@disconnectmadison.org>`.

Template builder functions return `string`. Example:
```typescript
function buildVerificationEmail(pledgeAction: string, verifyUrl: string): string {
    return `<!DOCTYPE html>...${verifyUrl}...`;
}
```

For the newsletter broadcast (planned), use `lib/email-templates.ts` (to be created) with `buildNewsletterEmail({ subject, previewText, bodyHtml })`. Include Resend's `{{{unsubscribe}}}` placeholder in the footer.
