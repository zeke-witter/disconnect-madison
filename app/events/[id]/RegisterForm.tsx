'use client';

import { useActionState } from 'react';
import { registerForEventAction } from '@/lib/actions';

export default function RegisterForm({ eventId }: { eventId: string }) {
    const [state, formAction, isPending] = useActionState(registerForEventAction, null);

    if (state?.success) {
        return (
            <div id="register" className="mt-12 p-6 rounded-lg border border-(--accent-muted)/40 bg-(--accent-muted)/5">
                <h2 className="font-display text-3xl mb-3">
                    {state.waitlisted ? "You're on the waitlist" : "You're registered!"}
                </h2>
                <p className="text-(--muted) text-sm">
                    {state.waitlisted
                        ? "We'll email you right away if a spot opens up. Check your inbox for a confirmation (and your spam folder, just in case)."
                        : "Check your inbox for a confirmation email with a link to cancel if your plans change. If you don't see it, check your spam folder."}
                </p>
            </div>
        );
    }

    return (
        <div id="register" className="mt-12 p-6 rounded-lg border border-(--accent-muted)/40 bg-(--accent-muted)/5">
            <h2 className="font-display text-3xl mb-1">Register</h2>
            <p className="text-sm text-(--muted) mb-6">You'll receive a confirmation email with a cancellation link.</p>
            <form action={formAction} className="space-y-4">
                <input type="hidden" name="event_id" value={eventId} />
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reg-name" className="block text-sm font-medium mb-1">
                            Name <span className="text-(--accent)">*</span>
                        </label>
                        <input
                            id="reg-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-(--accent)"
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium mb-1">
                            Email <span className="text-(--accent)">*</span>
                        </label>
                        <input
                            id="reg-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-(--accent)"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="reg-guests" className="block text-sm font-medium mb-1">
                        Additional guests
                    </label>
                    <select
                        id="reg-guests"
                        name="guest_count"
                        defaultValue="0"
                        className="block w-full sm:w-48 rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-(--accent)"
                    >
                        <option value="0">Just me (1 total)</option>
                        <option value="1">+1 guest (2 total)</option>
                        <option value="2">+2 guests (3 total)</option>
                        <option value="3">+3 guests (4 total)</option>
                    </select>
                </div>

                {state?.message && (
                    <p className="text-sm text-(--accent)">{state.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-cta px-6 py-2.5 font-display text-xl font-bold text-on-cta hover:bg-cta-hover transition-colors disabled:opacity-50"
                >
                    {isPending ? 'Registering…' : 'Register'}
                </button>
            </form>
        </div>
    );
}
