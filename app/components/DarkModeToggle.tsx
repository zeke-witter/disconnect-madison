'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const existing = document.documentElement.getAttribute('data-theme');
        if (existing === 'dark') {
            setIsDark(true);
        } else if (existing === 'light') {
            setIsDark(false);
        } else {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    function toggle() {
        const next = !isDark;
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        setIsDark(next);
    }

    return (
        <button
            onClick={toggle}
            className="rounded-md border border-(--secondary-accent) px-3 py-1.5 text-sm text-(--secondary-accent) hover:border-(--primary-color) hover:text-(--primary-color) transition-colors cursor-pointer"
        >
            {isDark ? 'Switch to light' : 'Switch to dark'}
        </button>
    );
}
