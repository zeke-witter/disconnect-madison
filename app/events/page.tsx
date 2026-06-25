import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedEventsAction, getPublishedEventRegistrationCountsAction } from '@/lib/actions';
import { createServerAuthClient } from '@/lib/supabase-auth';
import type { EventRow } from '@/lib/types';

export const metadata: Metadata = {
    title: 'Events',
    description: 'In-person events hosted by Disconnect Madison. Join us for workshops, discussions, and community gatherings in Madison, WI.',
    alternates: { canonical: '/events' },
};

function formatEventDate(dateStr: string): string {
    const [datePart, timePart = ''] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour = 0, minute = 0] = timePart.split(':').map(Number);
    const MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const weekday = DAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const mm = String(minute).padStart(2, '0');
    return `${weekday}, ${MONTHS[month - 1]} ${day}, ${year} at ${h}:${mm} ${ampm} CT`;
}

function EventCard({ event, registeredCount = 0, past = false }: { event: EventRow; registeredCount?: number; past?: boolean }) {
    return (
        <Link
            href={`/events/${event.id}`}
            className={`link-card group flex flex-col sm:flex-row gap-0 rounded-lg border border-(--accent-muted) overflow-hidden hover:border-(--accent) transition-colors ${past ? 'opacity-60' : ''}`}
        >
            {event.cover_image_url && (
                <div className="sm:w-48 sm:shrink-0 h-40 sm:h-auto overflow-hidden">
                    <Image
                        src={event.cover_image_url}
                        alt={event.title}
                        width={192}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="flex flex-col justify-center p-5 gap-1.5">
                <h2 className="font-display text-2xl group-hover:text-(--accent) transition-colors">{event.title}</h2>
                <p className="text-sm text-(--muted)">{formatEventDate(event.date)}</p>
                <p className="text-sm text-(--muted)">{event.location_name}{event.location_address ? ` — ${event.location_address}` : ''}</p>
                {event.description && (
                    <p className="text-sm mt-1 line-clamp-2 text-(--foreground)/80">
                        {event.description.replace(/[#*_`[\]]/g, '').substring(0, 160)}
                    </p>
                )}
                <div className="flex items-center gap-3 mt-1">
                    {event.registration_required && (
                        <span className="text-xs font-semibold text-(--accent)">Registration required</span>
                    )}
                    {event.capacity != null && (
                        <span className="text-xs text-(--muted)">
                            {Math.max(0, event.capacity - registeredCount)}/{event.capacity} spots remaining
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default async function EventsPage() {
    const authClient = await createServerAuthClient();
    const [events, registrationCounts, { data: { user } }] = await Promise.all([
        getPublishedEventsAction(),
        getPublishedEventRegistrationCountsAction(),
        authClient.auth.getUser(),
    ]);
    const isAdmin = !!user;
    const now = new Date();

    const upcoming = events.filter(e => {
        const [datePart] = e.date.split('T');
        return new Date(datePart + 'T23:59:59') >= now;
    });
    const past = events.filter(e => {
        const [datePart] = e.date.split('T');
        return new Date(datePart + 'T23:59:59') < now;
    }).reverse();

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto font-body">
            <section aria-labelledby="events-heading" className="w-full mb-10">
                <div className="flex items-start justify-between gap-4">
                    <h1 id="events-heading" className="font-display text-5xl lg:text-7xl mb-4">Events</h1>
                    {isAdmin && (
                        <Link
                            href="/events/add"
                            className="shrink-0 mt-2 rounded-md border border-(--accent-muted) px-3 py-1.5 text-sm text-(--muted) hover:border-(--accent-muted) hover:text-(--muted) transition-colors"
                        >
                            Manage
                        </Link>
                    )}
                </div>
                <p className="text-lg text-(--muted)">
                    In-person gatherings in Madison, WI. Come meet the community.
                </p>
            </section>

            <section aria-label="Upcoming events" className="w-full">
                {upcoming.length === 0 ? (
                    <div className="rounded-lg border border-(--accent-muted)/30 p-8 text-center">
                        <p className="text-(--muted)">No upcoming events right now.</p>
                        <p className="text-sm text-(--muted) mt-2">Check back soon, or <Link href="/contact">reach out</Link> if you want to get involved.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {upcoming.map(event => (
                            <EventCard key={event.id} event={event} registeredCount={registrationCounts[event.id] ?? 0} />
                        ))}
                    </div>
                )}
                <p className="text-sm text-(--muted) mt-6">
                    Want to hear about future events? <Link href="/pledge">Take the pledge</Link> and opt in to our mailing list on the form.
                </p>
            </section>

            {past.length > 0 && (
                <section aria-labelledby="past-events-heading" className="w-full mt-16">
                    <h2 id="past-events-heading" className="font-display text-3xl mb-6 text-(--accent-muted)">Past events</h2>
                    <div className="flex flex-col gap-4">
                        {past.map(event => (
                            <EventCard key={event.id} event={event} registeredCount={registrationCounts[event.id] ?? 0} past />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
