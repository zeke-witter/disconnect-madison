import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getPublishedEventAction } from '@/lib/actions';

marked.use({ breaks: true, gfm: true });

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const event = await getPublishedEventAction(id);
    if (!event) return { title: 'Event Not Found' };
    return {
        title: event.title,
        description: event.description.replace(/[#*_`[\]]/g, '').substring(0, 160),
        alternates: { canonical: `/events/${id}` },
        openGraph: event.cover_image_url ? { images: [{ url: event.cover_image_url }] } : undefined,
    };
}

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

export default async function EventDetailPage({ params }: Props) {
    const { id } = await params;
    const event = await getPublishedEventAction(id);
    if (!event) notFound();

    const descriptionHtml = await marked.parse(event.description || '');

    const mapsUrl = event.location_address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location_address)}`
        : null;

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto font-body">

            {event.cover_image_url && (
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
                    <Image
                        src={event.cover_image_url}
                        alt={event.title}
                        width={768}
                        height={432}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
            )}

            <div className="mb-2">
                <Link href="/events" className="text-sm text-(--muted) hover:text-(--muted) no-underline">
                    &larr; All events
                </Link>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl mb-4">{event.title}</h1>

            <div className="flex flex-col gap-2 mb-8 text-(--muted)">
                <div className="flex items-start gap-2">
                    <span aria-hidden="true">📅</span>
                    <span>{formatEventDate(event.date)}{event.end_date ? ` – ${formatEventDate(event.end_date)}` : ''}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span aria-hidden="true">📍</span>
                    <span>
                        {event.location_name}
                        {event.location_address && (
                            <>, {mapsUrl
                                ? <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{event.location_address}</a>
                                : event.location_address
                            }</>
                        )}
                    </span>
                </div>
                {event.registration_required && (
                    <div className="flex items-start gap-2">
                        <span aria-hidden="true">✏️</span>
                        <span className="font-semibold text-(--accent)">Registration required</span>
                    </div>
                )}
                {event.capacity != null && (
                    <div className="flex items-start gap-2">
                        <span aria-hidden="true">👥</span>
                        <span>Capacity: {event.capacity}</span>
                    </div>
                )}
            </div>

            {event.description && (
                <div
                    className="prose prose-invert max-w-none text-base leading-relaxed [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_a]:text-(--accent) [&_a:hover]:text-(--accent-hover)"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
            )}

            {event.registration_required && (
                <div id="register" className="mt-12 p-6 rounded-lg border border-(--accent-muted)/40 bg-(--accent-muted)/5">
                    <h2 className="font-display text-3xl mb-2">Register</h2>
                    <p className="text-(--muted) text-sm">Registration is coming soon. In the meantime, <Link href="/contact">send us a message</Link> to reserve your spot.</p>
                </div>
            )}

            <div className="mt-12 pt-8 border-t border-(--accent-muted)/20">
                <Link href="/events" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
                    &larr; Back to all events
                </Link>
            </div>

        </div>
    );
}
