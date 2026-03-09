'use client'

import { useState } from 'react';
import Link from "next/link";

export default function Navigation({ totalPledges }: { totalPledges?: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav aria-label="main site navigation" className="relative flex w-full justify-between items-center py-4 lg:py-6 px-6 lg:px-8 font-handjet text-2xl border-b-5">
            <div className="flex items-center gap-6">
                <Link href="/" aria-label="Home">Disconnect Madison</Link>
                {totalPledges != null && (
                    <span className="hidden lg:inline text-lg text-[#EDEBE6]/60">
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

            {/* Desktop nav */}
            <ul className="hidden lg:flex flex-row items-center gap-10">
                <li><a href="/learn" className="hover:text-gray-300">Learn</a></li>
                <li><a href="/breathe" className="hover:text-gray-300">Breathe</a></li>
                <li><a href="/help-yourself" className="hover:text-gray-300">Now what?</a></li>
                <li><a href="/about" className="hover:text-gray-300">About</a></li>
                <li><a href="/grow" className="hover:text-gray-300">Help us grow</a></li>
                <li><a href="/quiz" className="border border-white/80 px-4 py-2 rounded-sm hover:border-white hover:bg-white/10 transition-colors">Take the quiz</a></li>
                <li><a href="/pledge" className="hover:bg-emerald-400 text-stone-800 bg-emerald-500 px-4 py-2 rounded-sm">Pledge Today</a></li>
            </ul>

            {/* Mobile dropdown panel */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-(--nav-background) border-b-5">
                    <ul className="flex flex-col px-6 py-2">
                        <li><a href="/learn" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">Learn</a></li>
                        <li><a href="/breathe" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">Breathe</a></li>
                        <li><a href="/help-yourself" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">Now what?</a></li>
                        <li><a href="/about" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">About</a></li>
                        <li><a href="/grow" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">Help us grow</a></li>
                        <li className="flex flex-col gap-3 py-5">
                            <a href="/quiz" onClick={() => setIsOpen(false)} className="text-center border border-[#EDEBE6]/60 px-4 py-3 rounded-sm hover:bg-[#EDEBE6]/10 transition-colors">Take the quiz</a>
                            <a href="/pledge" onClick={() => setIsOpen(false)} className="text-center text-stone-800 bg-emerald-500 hover:bg-emerald-400 px-4 py-3 rounded-sm transition-colors">Pledge Today</a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}
