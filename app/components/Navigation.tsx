'use client'

import { useState } from 'react';
import Link from "next/link";

export default function Navigation({ totalPledges }: { totalPledges?: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav aria-label="main site navigation" className="flex flex-wrap lg:flex-nowrap w-full justify-between items-center py-4 lg:py-6 px-6 lg:px-8 font-handjet text-2xl border-b-5">
            <div className="flex items-center gap-6">
                <Link href="/" aria-label="Home">Disconnect Society</Link>
                {totalPledges != null && (
                    <span className="hidden lg:inline text-lg text-(--secondary-accent)">
                        {totalPledges.toLocaleString()} {totalPledges === 1 ? 'pledge' : 'pledges'}
                    </span>
                )}
            </div>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            <ul className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto items-center gap-4 lg:gap-10 pt-4 lg:pt-0`}>
                <li>
                    <a href="/learn" className="hover:text-gray-300">Learn</a>
                </li>
                <li>
                    <a href="/about" className="hover:text-gray-300">About</a>
                </li>
                <li>
                    <a href="/pledge" className="hover:bg-emerald-400 text-stone-800 bg-emerald-500 px-4 py-2 rounded-sm">Take the Pledge</a>
                </li>
            </ul>
        </nav>
    )
}
