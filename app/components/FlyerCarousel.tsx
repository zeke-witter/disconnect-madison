'use client';

import { useRef, useState, useEffect } from 'react';

export type Flyer = {
    file: string;
    name: string;
    description: string;
};

const SCROLL_AMOUNT = 408; // card width (384) + gap (24)

export default function FlyerCarousel({ flyers, aspectRatio = '8.5 / 11' }: { flyers: Flyer[]; aspectRatio?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        setActiveIndex(Math.round(el.scrollLeft / SCROLL_AMOUNT));
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        el?.addEventListener('scroll', updateScrollState, { passive: true });
        return () => el?.removeEventListener('scroll', updateScrollState);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        scrollRef.current?.scrollBy({
            left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    return (
        <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
            <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className={`hidden md:flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-full border border-(--accent-muted) text-(--accent-muted) hover:border-(--accent) hover:text-(--accent-muted) transition-colors cursor-pointer ${!canScrollLeft ? 'invisible' : ''}`}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div
                ref={scrollRef}
                className="flex-1 min-w-0 flex gap-6 overflow-x-auto pb-4"
            >
                {flyers.map(({ file, name, description }) => (
                    <a
                        key={file}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-card group flex-shrink-0 w-96 block border border-(--accent-muted) rounded-md overflow-hidden hover:border-(--accent) transition-colors"
                    >
                        <div className="w-full overflow-hidden bg-(--accent-muted)/10" style={{ aspectRatio }}>
                            <iframe
                                src={file}
                                className="w-full h-full pointer-events-none"
                                title={`${name} preview`}
                            />
                        </div>
                        <div className="p-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-medium text-(--accent-muted)">{name}</p>
                                <p className="text-sm text-(--accent-muted) mt-0.5">{description}</p>
                            </div>
                            <span className="text-xs text-(--accent-muted) shrink-0 mt-0.5">PDF</span>
                        </div>
                    </a>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className={`hidden md:flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-full border border-(--accent-muted) text-(--accent-muted) hover:border-(--accent) hover:text-(--accent-muted) transition-colors cursor-pointer ${!canScrollRight ? 'invisible' : ''}`}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 8 8)" />
                </svg>
            </button>
        </div>

        <div className="flex justify-center gap-2">
            {flyers.map((_, i) => (
                <button
                    key={i}
                    onClick={() => scrollRef.current?.scrollTo({ left: i * SCROLL_AMOUNT, behavior: 'smooth' })}
                    aria-label={`Go to flyer ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === activeIndex ? 'bg-(--accent)' : 'bg-(--accent-muted)/40 hover:bg-(--accent-muted)'}`}
                />
            ))}
        </div>
        </div>
    );
}
