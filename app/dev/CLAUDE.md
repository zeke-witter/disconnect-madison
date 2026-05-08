# app/dev/ — Dev/Staging Management Page

## Purpose

Internal management dashboard for local dev and staging environments. **Never shown in production** — delete buttons and destructive actions no-op when `process.env.VERCEL_ENV` is set.

Route is auth-gated by `middleware.ts`. Requires an active Supabase session.

## What It Does

- Lists all pledges with email, type, confirmation status, created date
- Delete individual pledges or wipe all pledges
- Lists all news articles
- Delete individual articles or wipe all articles
- `DarkModeToggle` component (only place it appears in the app)

## Server Actions Used

All called from `lib/actions.ts`. Each checks `if (process.env.VERCEL_ENV) return;` to no-op in production:
- `getAllPledgesAction()`
- `deletePledgeAction(formData)`
- `deleteAllPledgesAction()`
- `getNewsArticlesAction()` / `getAllNewsArticlesAction()`
- `deleteNewsArticleAction(formData)`
- `deleteAllNewsArticlesAction()`

## Notes

- Delete buttons are hidden in production via a conditional in the page component (belt-and-suspenders on top of the server-side no-op)
- `LogoutButton` is shown here for admins to sign out
- The `DarkModeToggle` here is the only way to override the theme from the UI (dev convenience)
