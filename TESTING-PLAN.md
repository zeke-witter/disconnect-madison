# Plan: Add Vitest + Playwright Testing

## Context
The project has zero test infrastructure. We need automated tests covering server actions (business logic), middleware (auth redirects), and critical user flows (pledge, contact, verification). The project uses Next.js 16, React 19, Supabase, Resend, and Cloudflare Turnstile.

---

## 1. Install dependencies

```bash
# Vitest
npm i -D vitest @vitejs/plugin-react

# Playwright
npm i -D @playwright/test
npx playwright install chromium
```

---

## 2. Vitest config

**New file:** `vitest.config.ts`

- Plugin: `@vitejs/plugin-react`
- `resolve.alias`: `@/` → project root (matches tsconfig paths)
- `test.environment`: `node` (server actions are server-side)
- `test.globals`: true
- `test.setupFiles`: `./tests/setup.ts`

**New file:** `tests/setup.ts`

- Set required env vars to dummy values (`SUPABASE_URL`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, etc.)

---

## 3. Vitest unit tests

### `tests/actions.test.ts` — Server action logic

Mock `@/lib/supabase` (the `supabase` singleton), `resend` (via mocking the `Resend` constructor from the `resend` package), and `global.fetch` (for Turnstile verification).

**Tests for `submitPledgeAction`:**
- Returns fake success when honeypot field is filled
- Returns error when Turnstile token is missing
- Returns error when Turnstile verification fails
- Returns error when email is missing
- Returns error when email is invalid
- Returns error on Supabase unique constraint (`23505`)
- Returns success and sends verification email on happy path

**Tests for `submitContactAction`:**
- Returns error when Turnstile token is missing
- Returns error when required fields are missing
- Returns error when email is invalid
- Returns error when Resend fails
- Returns success on happy path

**Tests for `verifyPledgeAction`:**
- Returns error when token is empty
- Returns error when no rows updated (bad/used token)
- Returns success when pledge is confirmed

**Tests for `getPledgesAction`:**
- Returns correct counts from Supabase data
- Returns zeros on error

**Tests for `addNewsArticleAction`:**
- Returns unauthorized when no user
- Returns error when URL is missing
- Inserts article on success

**Tests for `getNewsArticlesAction`:**
- Returns articles on success
- Returns empty array on error

### `tests/middleware.test.ts` — Auth middleware

Mock `@supabase/ssr`'s `createServerClient`.

**Tests:**
- Redirects to `/login` when no user
- Passes through when user is authenticated
- Exported config matches only `/add-news`

---

## 4. Playwright config and E2E tests

**New file:** `playwright.config.ts`

- Base URL: `http://localhost:3000`
- `webServer`: runs `npm run dev` automatically
- Single project: Chromium only
- Test dir: `e2e/`

**New file:** `e2e/forms.spec.ts` — Form rendering

- `/pledge` renders Turnstile widget, radio group, email input, submit button
- `/contact` renders Turnstile widget, name/email/message fields, submit button

**New file:** `e2e/navigation.spec.ts` — Pages load

- Homepage, `/about`, `/learn`, `/sources`, `/pledge`, `/contact` all load without errors
- Nav links work

**New file:** `e2e/auth.spec.ts` — Auth redirects

- `/add-news` redirects to `/login` when unauthenticated
- `/login` renders email and password fields

---

## 5. Package.json scripts

```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test",
"test:all": "vitest run && playwright test"
```

---

## Files to create/modify

| File | Action |
|---|---|
| `vitest.config.ts` | Create |
| `tests/setup.ts` | Create |
| `tests/actions.test.ts` | Create |
| `tests/middleware.test.ts` | Create |
| `playwright.config.ts` | Create |
| `e2e/forms.spec.ts` | Create |
| `e2e/navigation.spec.ts` | Create |
| `e2e/auth.spec.ts` | Create |
| `package.json` | Add test scripts |

---

## Key mocking notes

- **`@/lib/supabase`**: Module exports a singleton `supabase` client. Mock with `vi.mock()` returning chainable `.from().select()/.insert()/.update()/.delete()` methods.
- **`resend`**: The `Resend` constructor is called at module level in `lib/actions.ts`. Mock the `resend` package so `new Resend()` returns an object with `emails.send` as a mock function.
- **`global.fetch`**: Used by `verifyTurnstile()` to POST to Cloudflare. Mock to return `{ success: true/false }`.
- **`@/lib/supabase-auth`**: Used by `addNewsArticleAction`. Mock `createServerAuthClient()` to return a fake client with `auth.getUser()`.
- **`next/cache`**: Mock `revalidatePath` as a no-op.
- **`@supabase/ssr`**: Used in `middleware.ts`. Mock `createServerClient` to return a fake client.

---

## Verification

1. `npm test` — all Vitest unit tests pass
2. `npm run test:e2e` — all Playwright E2E tests pass (requires dev server + real env vars)
3. `npm run build` — build still succeeds
