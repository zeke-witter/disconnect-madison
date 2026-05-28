import Link from 'next/link';
import { getPublishedEventsAction } from '@/lib/actions';
import { buildEventAnnouncementEmail } from '@/lib/email-templates';
import LogoutButton from '@/app/components/LogoutButton';
import SendTestEmailForm from './SendTestEmailForm';
import type { EventRow } from '@/lib/types';

export default async function EmailPreviewPage({
    searchParams,
}: {
    searchParams: Promise<{ event?: string }>;
}) {
    const { event: eventId } = await searchParams;
    const events = await getPublishedEventsAction();
    const selected: EventRow | null = events.find(e => e.id === eventId) ?? events[0] ?? null;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const preview = selected ? buildEventAnnouncementEmail(selected, baseUrl) : null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-10 font-body">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-(--accent-muted)/20">
                <div className="flex items-center gap-4">
                    <Link
                        href="/events/email"
                        className="text-sm text-(--muted) hover:text-(--foreground) transition-colors"
                    >
                        ← Email drafts
                    </Link>
                </div>
                <LogoutButton />
            </div>

            <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                    <h1 className="font-display text-4xl lg:text-5xl mb-1">Email preview</h1>
                    {preview && (
                        <p className="text-sm text-(--muted)">Subject: <span className="text-(--foreground)">{preview.subject}</span></p>
                    )}
                </div>
                {selected && <SendTestEmailForm eventId={selected.id} eventTitle={selected.title} />}
            </div>

            {events.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {events.map(e => (
                        <Link
                            key={e.id}
                            href={`/events/email/preview?event=${e.id}`}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                e.id === selected?.id
                                    ? 'border-(--accent-muted) text-(--muted)'
                                    : 'border-(--accent-muted)/40 text-(--muted) hover:border-(--accent-muted)'
                            }`}
                        >
                            {e.title}
                        </Link>
                    ))}
                </div>
            )}

            {events.length === 0 ? (
                <div className="rounded-lg border border-(--accent-muted)/30 p-10 text-center">
                    <p className="text-(--muted)">No published events. Publish an event to preview its announcement email.</p>
                </div>
            ) : (
                <div className="rounded-lg border border-(--accent-muted)/30 overflow-hidden">
                    <iframe
                        srcDoc={preview?.html ?? ''}
                        title="Email template preview"
                        className="w-full bg-white"
                        style={{ height: '700px' }}
                        sandbox="allow-same-origin"
                    />
                </div>
            )}

            <p className="text-xs text-(--muted) mt-3">
                Refresh after editing <code className="font-mono">lib/email-templates.ts</code> to see changes. The <code className="font-mono">{'{{{unsubscribe}}}'}</code> placeholder is replaced by Resend when broadcasting.
            </p>
        </div>
    );
}
