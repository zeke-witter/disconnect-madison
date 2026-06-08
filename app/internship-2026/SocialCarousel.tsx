'use client';

import { useState } from 'react';
import Image from 'next/image';

const slides = [
    { src: '/internship-showcase/soc-template-1.png', alt: 'Social media template 1 by Tanisha Pathan' },
    { src: '/internship-showcase/soc-template-2.png', alt: 'Social media template 2 by Tanisha Pathan' },
    { src: '/internship-showcase/soc-template-3.png', alt: 'Social media template 3 by Tanisha Pathan' },
    { src: '/internship-showcase/soc-template-4.png', alt: 'Social media template 4 by Tanisha Pathan' },
];

export default function SocialCarousel() {
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 w-full justify-center">
                <button
                    onClick={prev}
                    aria-label="Previous template"
                    className="text-2xl text-(--accent-muted) hover:text-(--foreground) transition-colors px-2"
                >
                    ←
                </button>

                <div className="relative w-72 h-72 flex items-center justify-center">
                    <Image
                        src={slides[current].src}
                        alt={slides[current].alt}
                        fill
                        className="object-contain"
                    />
                </div>

                <button
                    onClick={next}
                    aria-label="Next template"
                    className="text-2xl text-(--accent-muted) hover:text-(--foreground) transition-colors px-2"
                >
                    →
                </button>
            </div>

            <div className="flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`View template ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-opacity ${i === current ? 'bg-(--foreground) opacity-100' : 'bg-(--accent-muted) opacity-50'}`}
                    />
                ))}
            </div>

            <p className="text-sm text-(--muted)">{current + 1} of {slides.length}</p>
        </div>
    );
}
