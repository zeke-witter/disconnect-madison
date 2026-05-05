# app/pledge/ — Pledge Flow

## User Flow

```
/pledge (form) → submit → email sent → /verify?token=UUID → confirmed
                                                          → badge share
                                                          → referral question
```

## Page Structure

`page.tsx` is a Client Component (`'use client'`) because it manages form state, radio group selection, and the email input.

`layout.tsx` exists only to export metadata (title, description, canonical).

## Form Fields

| Field | Type | Implementation |
|---|---|---|
| `pledgeAction[id]` | RadioGroup | Headless UI `RadioGroup` + `Radio`, 3 options |
| `email` | text | Headless UI `Input`, controlled via `useState` |
| `newsletter_opt_in` | checkbox | Headless UI `Checkbox`, controlled via `useState`, value `"true"` |
| `website` | text (honeypot) | Hidden via absolute positioning and `tabIndex={-1}`, filled only by bots |

The `pledgeAction` radio group uses Headless UI's `RadioGroup` which passes the full option object as value. The server action reads `formData.get('pledgeAction[id]')` to get the string id.

## Pledge Types

```typescript
const pledgeActions = [
    { label: 'Reduce screen time', subtitle: '...', id: 'reduce_screen_time' },
    { label: 'Step away',          subtitle: '...', id: 'take_a_break' },
    { label: 'Quit for good',      subtitle: '...', id: 'quit_for_good' },
];
```

## State Machine

The page has two states:
1. **Form state** (default): shows the pledge form + aside with resource links
2. **Success state**: shows "Check your inbox" message + resend button. Triggered when `state.success === true`.

The resend form is a separate `useActionState` using `resendVerificationAction`. It's hidden in form state and shown only in success state.

## Bot Protection

Two layers:
1. **Honeypot**: `<input name="website">` is hidden from real users via CSS. If the server receives a non-empty value, it returns a fake success response without inserting to DB.
2. **Cloudflare Turnstile**: script loaded in root layout (`app/layout.tsx`). The Turnstile token is validated in the server action before any DB operation.

## Server Action

`submitPledgeAction` in `lib/actions.ts`:
1. Check honeypot
2. Validate Turnstile token
3. Validate email format and pledge type
4. Delete any existing unconfirmed row for same email + action (allows re-submission)
5. Insert unconfirmed row with `verification_token = crypto.randomUUID()`
6. Send verification email via Resend
7. Return `{ success: true, email }`

## Newsletter Opt-In

`newsletter_opt_in` is stored in the `pledges` DB row at submission time. It is not yet wired to Resend Audiences — that connection is part of the email list feature plan. When implemented, the opt-in subscription should happen at verification time (after the pledge is confirmed), not at form submission.

## Verification Page (`/verify`)

`app/verify/page.tsx` is a Server Component. It:
1. Reads `?token=` from `searchParams`
2. Calls `verifyPledgeAction(token)` — updates DB
3. Shows success or failure UI
4. On success: renders `BadgeShare` and `ReferralQuestion` client components

Dev bypass tokens (non-production only): `dev-reduce`, `dev-break`, `dev-quit`, `dev-fail`.

## Aside Panel

The pledge page has a sidebar (`<aside>`) with resource links for each pledge type:
- Preparing to step away: link to `/before-you-go`
- Not sure what to do: link to `/help-yourself`
- Reduce screen time: iPhone Screen Time, Android Digital Wellbeing links
- Deactivate accounts: platform-specific links
- Delete accounts: platform-specific links
