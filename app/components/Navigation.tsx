'use client'

import { useState } from 'react';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation({ totalPledges }: { totalPledges?: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('nav');

    return (
        <nav aria-label="main site navigation" className="relative flex w-full justify-between items-center py-4 lg:py-6 px-6 lg:px-8 font-handjet text-2xl border-b-5">
            <div className="flex items-center gap-6">
                <Link href="/" aria-label="Home">Disconnect Madison</Link>
                {totalPledges != null && (
                    <span className="hidden lg:inline text-lg text-[#EDEBE6]/60">
                        {t('pledgeCount', { count: totalPledges })}
                    </span>
                )}
            </div>

            {/* Mobile right side: language switcher + hamburger */}
            <div className="flex items-center gap-4 lg:hidden">
                <LanguageSwitcher />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2"
                    aria-expanded={isOpen}
                    aria-label={t('toggleMenu')}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop nav */}
            <ul className="hidden lg:flex flex-row items-center gap-10">
                <li><LanguageSwitcher /></li>
                <li><a href="/learn" className="hover:text-gray-300">{t('learn')}</a></li>
                <li><a href="/breathe" className="hover:text-gray-300">{t('breathe')}</a></li>
                <li><a href="/help-yourself" className="hover:text-gray-300">{t('nowWhat')}</a></li>
                <li><a href="/about" className="hover:text-gray-300">{t('about')}</a></li>
                <li><a href="/grow" className="hover:text-gray-300">{t('helpUsGrow')}</a></li>
                <li><a href="/quiz" className="border border-white/80 px-4 py-2 rounded-sm hover:border-white hover:bg-white/10 transition-colors">{t('takeQuiz')}</a></li>
                <li><a href="/pledge" className="hover:bg-emerald-400 text-stone-800 bg-emerald-500 px-4 py-2 rounded-sm">{t('pledgeToday')}</a></li>
            </ul>

            {/* Mobile dropdown panel */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-(--nav-background) border-b-5">
                    <ul className="flex flex-col px-6 py-2">
                        <li><a href="/learn" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">{t('learn')}</a></li>
                        <li><a href="/breathe" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">{t('breathe')}</a></li>
                        <li><a href="/help-yourself" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">{t('nowWhat')}</a></li>
                        <li><a href="/about" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">{t('about')}</a></li>
                        <li><a href="/grow" onClick={() => setIsOpen(false)} className="block py-4 border-b border-[#EDEBE6]/15 hover:opacity-70 transition-opacity">{t('helpUsGrow')}</a></li>
                        <li className="flex flex-col gap-3 py-5">
                            <a href="/quiz" onClick={() => setIsOpen(false)} className="text-center border border-[#EDEBE6]/60 px-4 py-3 rounded-sm hover:bg-[#EDEBE6]/10 transition-colors">{t('takeQuiz')}</a>
                            <a href="/pledge" onClick={() => setIsOpen(false)} className="text-center text-stone-800 bg-emerald-500 hover:bg-emerald-400 px-4 py-3 rounded-sm transition-colors">{t('pledgeToday')}</a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}
