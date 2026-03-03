'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const flyers = [
    {
        file: "/flyer-neighbors.pdf",
        name: "Neighbors flyer",
        description: "Designed to prompt reflection and lead people to the quiz. Good for neighborhood boards, laundromats, community centers, and public spaces.",
    },
    {
        file: "/flyer-bookstore.pdf",
        name: "Bookstore flyer",
        description: "Tailored for independent bookstores and the community-minded people who frequent them.",
    },
    {
        file: "/flyer-coffee.pdf",
        name: "Coffee shop flyer",
        description: "Tailored for independent coffee shops and cafes.",
    },
    {
        file: "/flyer-mentalhealth.pdf",
        name: "Mental health flyer",
        description: "Focused on the mental health impacts of algorithm-driven social media.",
    },
    {
        file: "/disconnect-flyer-generic.pdf",
        name: "General flyer",
        description: "For schools, gyms, coffee shops, libraries — anywhere people gather.",
    },
];

const SCROLL_AMOUNT = 408; // card width (384) + gap (24)

export default function FlyerCarousel() {
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
                className={`hidden md:flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-full border border-(--secondary-accent) text-(--secondary-accent) hover:border-(--primary-accent) hover:text-(--primary-color) transition-colors cursor-pointer ${!canScrollLeft ? 'invisible' : ''}`}
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
                        className="link-card group flex-shrink-0 w-96 block border border-(--secondary-accent) rounded-md overflow-hidden hover:border-(--primary-accent) transition-colors"
                    >
                        <div className="w-full overflow-hidden bg-(--secondary-accent)/10" style={{ aspectRatio: '8.5 / 11' }}>
                            <iframe
                                src={file}
                                className="w-full h-full pointer-events-none"
                                title={`${name} preview`}
                            />
                        </div>
                        <div className="p-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-medium text-(--primary-color)">{name}</p>
                                <p className="text-sm text-(--secondary-accent) mt-0.5">{description}</p>
                            </div>
                            <span className="text-xs text-(--secondary-accent) shrink-0 mt-0.5">PDF</span>
                        </div>
                    </a>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className={`hidden md:flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-full border border-(--secondary-accent) text-(--secondary-accent) hover:border-(--primary-accent) hover:text-(--primary-color) transition-colors cursor-pointer ${!canScrollRight ? 'invisible' : ''}`}
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
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === activeIndex ? 'bg-(--primary-accent)' : 'bg-(--secondary-accent)/40 hover:bg-(--secondary-accent)'}`}
                />
            ))}
        </div>
        </div>
    );
}
