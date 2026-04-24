'use client';

import { useState } from 'react';
import Image from 'next/image';

const stickers = [
    { src: '/internship-showcase/disconnect to reconnect.png', alt: 'Disconnect to Reconnect sticker design by Tanisha Pathan' },
    { src: '/internship-showcase/skip the scroll.png', alt: 'Skip the Scroll sticker design by Tanisha Pathan' },
];

export default function StickerCarousel() {
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((c) => (c - 1 + stickers.length) % stickers.length);
    const next = () => setCurrent((c) => (c + 1) % stickers.length);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 w-full justify-center">
                <button
                    onClick={prev}
                    aria-label="Previous sticker"
                    className="text-2xl text-(--secondary-accent) hover:text-(--foreground) transition-colors px-2"
                >
                    ←
                </button>

                <div className="relative w-72 h-72 flex items-center justify-center">
                    <Image
                        src={stickers[current].src}
                        alt={stickers[current].alt}
                        fill
                        className="object-contain"
                    />
                </div>

                <button
                    onClick={next}
                    aria-label="Next sticker"
                    className="text-2xl text-(--secondary-accent) hover:text-(--foreground) transition-colors px-2"
                >
                    →
                </button>
            </div>

            <div className="flex gap-3">
                {stickers.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`View sticker ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-opacity ${i === current ? 'bg-(--foreground) opacity-100' : 'bg-(--secondary-accent) opacity-50'}`}
                    />
                ))}
            </div>

            <p className="text-sm text-(--secondary-accent)">{current + 1} of {stickers.length}</p>
        </div>
    );
}
