-- Event registrations table
-- Run this in the Supabase SQL editor to enable the registration flow.
-- Requires the `events` table to already exist.

CREATE TABLE IF NOT EXISTS event_registrations (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id            UUID        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name                TEXT        NOT NULL,
    email               TEXT        NOT NULL,
    guest_count         INTEGER     NOT NULL DEFAULT 0,
    cancellation_token  UUID        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    waitlisted          BOOLEAN     NOT NULL DEFAULT false,
    cancelled           BOOLEAN     NOT NULL DEFAULT false,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast capacity/waitlist checks (queries filter by event_id + waitlisted/cancelled)
CREATE INDEX IF NOT EXISTS event_registrations_event_id_idx
    ON event_registrations(event_id);

-- Fast token lookups for cancellation links
CREATE INDEX IF NOT EXISTS event_registrations_token_idx
    ON event_registrations(cancellation_token);

-- Duplicate-registration guard (email + event_id)
CREATE INDEX IF NOT EXISTS event_registrations_email_event_idx
    ON event_registrations(email, event_id);
