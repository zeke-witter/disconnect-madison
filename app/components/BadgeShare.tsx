'use client';

import Image from 'next/image';
import { useState } from 'react';

const BADGE_MAP: Record<string, { src: string; alt: string }> = {
    reduce_screen_time: { src: '/badges/badge-reduce.png', alt: 'Reduce Screen Time badge' },
    take_a_break: { src: '/badges/badge-step-away.png', alt: 'Take a Break badge' },
    quit_for_good: { src: '/badges/badge-quit.png', alt: 'Quit for Good badge' },
};

const SHARE_TEXT = "I just pledged to disconnect from social media. If you've been thinking about it too, you're not alone. disconnectsociety.org";

export default function BadgeShare({ pledgeAction }: { pledgeAction: string }) {
    const [copied, setCopied] = useState(false);

    const badge = BADGE_MAP[pledgeAction];

    async function shareBadge() {
        if (!badge) return;
        try {
            const response = await fetch(badge.src);
            const blob = await response.blob();
            const file = new File([blob], 'disconnect-badge.png', { type: 'image/png' });
            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file] });
            } else {
                const a = document.createElement('a');
                a.href = badge.src;
                a.download = 'disconnect-badge.png';
                a.click();
            }
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('Share failed:', err);
            }
        }
    }

    async function copyText() {
        await navigator.clipboard.writeText(SHARE_TEXT);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (!badge) return null;

    return (
        <div className="flex flex-col items-center gap-8 w-full mt-8">

            {/* Badge + share options */}
            <div className="flex flex-col items-center gap-6 w-full">
                <Image src={badge.src} alt={badge.alt} width={280} height={280} className="rounded-lg" />

                {/* Option 1: share */}
                <button
                    onClick={shareBadge}
                    className="w-full rounded-md bg-(--primary-color) px-6 py-3 font-handjet text-2xl font-bold text-white transition-colors hover:opacity-90 cursor-pointer"
                >
                    Share your badge
                </button>

                {/* Option 2: copy text */}
                <div className="w-full rounded-md border border-(--secondary-accent) p-4 text-left">
                    <p className="text-sm text-(--secondary-accent) italic mb-3">&ldquo;{SHARE_TEXT}&rdquo;</p>
                    <button
                        onClick={copyText}
                        className="rounded-md bg-(--secondary-accent) px-4 py-2 font-handjet text-xl font-bold text-white transition-colors hover:opacity-90 cursor-pointer"
                    >
                        {copied ? 'Copied!' : 'Copy text'}
                    </button>
                </div>
            </div>

            {/* Irony note */}
            <div className="w-full border-l-4 border-(--primary-color) pl-4 text-left">
                <p className="font-handjet text-lg font-bold text-(--primary-color) mb-2">A NOTE ON THE IRONY</p>
                <p className="text-sm text-(--secondary-accent) leading-relaxed">
                    We understand posting about disconnecting from social media on social media feels a little
                    contradictory, but we also live in reality. This isn&apos;t about purity. It&apos;s about direction.
                    If posting this badge is one of the last things you do before quitting or taking a break, that
                    sounds like a pretty good use of the platform to us. Sharing what you&apos;re doing also helps
                    normalize the fact we have a choice, and you might give someone else the courage to make a
                    change too.
                </p>
            </div>

        </div>
    );
}
