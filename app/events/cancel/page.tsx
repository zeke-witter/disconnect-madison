import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getRegistrationByTokenAction, cancelRegistrationAction } from '@/lib/actions';

export const metadata: Metadata = {
    title: 'Cancel Registration',
    robots: { index: false },
};

type Props = { searchParams: Promise<{ token?: string; done?: string }> };

export default async function CancelRegistrationPage({ searchParams }: Props) {
    const { token, done } = await searchParams;

    if (!token) {
        return <Message title="Invalid link" body="This cancellation link is not valid." />;
    }

    if (done === '1') {
        return (
            <Message
                title="Registration cancelled"
                body="Your spot has been freed up. We hope to see you at a future event."
            />
        );
    }

    const reg = await getRegistrationByTokenAction(token);

    if (!reg) {
        return <Message title="Not found" body="This cancellation link is invalid or has already been used." />;
    }

    if (reg.cancelled) {
        return <Message title="Already cancelled" body="This registration has already been cancelled." />;
    }

    const guestLine = reg.guest_count > 0
        ? ` + ${reg.guest_count} guest${reg.guest_count > 1 ? 's' : ''}`
        : '';

    async function handleCancel() {
        'use server';
        await cancelRegistrationAction(token!);
        redirect(`/events/cancel?token=${token}&done=1`);
    }

    return (
        <div className="max-w-md mx-auto py-20 font-body">
            <h1 className="font-display text-4xl mb-4">Cancel registration</h1>
            <p className="text-(--muted) mb-2 text-sm">You're about to cancel:</p>

            {reg.event_title && (
                <p className="font-semibold text-lg mb-1">{reg.event_title}</p>
            )}
            <p className="text-sm text-(--muted) mb-8">
                {reg.name}{guestLine}
            </p>

            <form action={handleCancel} className="flex flex-col gap-3">
                <button
                    type="submit"
                    className="rounded-md bg-(--accent) px-5 py-2.5 font-semibold text-(--on-accent) hover:bg-(--accent-hover) transition-colors text-center"
                >
                    Yes, cancel my registration
                </button>
                <Link
                    href="/events"
                    className="text-sm text-(--muted) text-center hover:text-(--foreground) transition-colors"
                >
                    Keep my registration
                </Link>
            </form>
        </div>
    );
}

function Message({ title, body }: { title: string; body: string }) {
    return (
        <div className="max-w-md mx-auto py-20 text-center font-body">
            <h1 className="font-display text-4xl mb-4">{title}</h1>
            <p className="text-(--muted) mb-8">{body}</p>
            <Link href="/events" className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors">
                View upcoming events &rarr;
            </Link>
        </div>
    );
}
