'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

// Full paths including locale prefix — usePathname from next/navigation returns these as-is
const LOCALIZED_PATHS = new Set(['/', '/pledge', '/es', '/es/pledge']);

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    if (!LOCALIZED_PATHS.has(pathname)) return null;

    function switchLocale() {
        const targetLocale = locale === 'en' ? 'es' : 'en';
        const targetPath = targetLocale === 'es'
            ? (pathname === '/' ? '/es' : `/es${pathname}`)
            : (pathname === '/es' ? '/' : pathname.replace(/^\/es/, ''));
        // Set cookie so middleware doesn't redirect back to the old locale
        document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
        // Hard navigate to force full server render (root layout re-renders with new messages)
        window.location.href = targetPath;
    }

    return (
        <button
            onClick={switchLocale}
            className="font-handjet text-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label={locale === 'en' ? 'Ver en español' : 'View in English'}
        >
            {locale === 'en' ? 'ES' : 'EN'}
        </button>
    );
}
