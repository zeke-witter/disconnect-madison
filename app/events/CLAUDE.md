# app/events/ — Public Events Pages

## Routes

```
events/
  page.tsx          → /events            (public event list)
  [id]/
    page.tsx        → /events/:id        (public event detail)
```

## Data Source

All data comes from the `events` Supabase table via server actions in `lib/actions.ts`:
- `getPublishedEventsAction()` — used on the list page
- `getPublishedEventAction(id)` — used on the detail page

Only events with `published = true` are shown. Drafts are invisible to the public.

## Date Display

Times are stored as PostgreSQL `timestamp` (no timezone) and entered by the admin in Central Time. The `formatEventDate()` helper in each page file formats them for display, appending "CT". It parses the date string manually (without `new Date()`) to avoid timezone issues during server-side rendering.

```
"2026-05-10T19:00:00" → "Sunday, May 10, 2026 at 7:00 PM CT"
```

Do not use `new Date(dateStr)` directly on these strings — it will be interpreted as UTC by Node.js.

## Description Rendering

Event descriptions are stored as Markdown. On the detail page, `marked.parse()` converts them to HTML, which is rendered via `dangerouslySetInnerHTML`. This is safe because only the authenticated admin can write event descriptions.

`marked` is configured with `{ breaks: true, gfm: true }` (GitHub-flavored Markdown, newlines become `<br>`).

## Upcoming vs Past Logic

The list page splits events into "Upcoming" and "Past" sections by comparing each event's date (end of day) to the current time. Past events are shown in reverse chronological order, dimmed.

## Event Cards

The `EventCard` component (defined inline in `page.tsx`) strips markdown from the description for the preview snippet using a simple regex. Do not parse the full description for card display — just strip symbols and truncate.

## Phase 2 (Not Yet Built)

The event detail page has a placeholder registration section (`#register`) that appears when `event.registration_required` is true. Phase 2 will replace this with the real registration form from `app/events/cancel/` and `event_registrations` DB table.

## Admin Editor

Admin-side editing lives at `/admin/events` (see `app/admin/events/`).
