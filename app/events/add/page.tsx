import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEventsAction } from '@/lib/actions';
import EventsManager from './EventsManager';
import LogoutButton from '@/app/components/LogoutButton';

export const metadata: Metadata = {
    title: 'Manage Events',
    robots: { index: false, follow: false },
};

export default async function EventsAddPage() {
    const events = await getAllEventsAction();

    return (
        <div className="w-full max-w-5xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-(--secondary-accent)/30">
                <Link
                    href="/events"
                    className="text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                >
                    &larr; Back to events
                </Link>
                <LogoutButton />
            </div>
            <EventsManager initialEvents={events} />
        </div>
    );
}
