# e2e/ — End-to-End Tests (Playwright)

## Framework

Playwright. Config at `playwright.config.ts` in project root.

Run: `npx playwright test`
Install browsers: `npx playwright install`

## Test Files

| File | Covers |
|---|---|
| `navigation.spec.ts` | Nav links, mobile hamburger menu, footer links |
| `forms.spec.ts` | Pledge form submission, contact form, validation |
| `auth.spec.ts` | Login flow, protected route redirects |
| `quiz.spec.ts` | Quiz progression, scoring, result display |

## Running E2E Tests

E2E tests run against a live dev server. Start the dev server first (`npm run dev`) or configure Playwright's `webServer` option in `playwright.config.ts` to auto-start it.

## Notes

- These tests exercise the full stack: UI, server actions, DB, email (Resend in test mode or stubbed)
- Turnstile is typically in test mode or bypassed in CI (check `playwright.config.ts` for env setup)
- Dev bypass tokens (`dev-reduce`, `dev-break`, etc.) can be used in tests to simulate pledge verification without going through email
