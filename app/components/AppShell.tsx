'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

// ── Navigation model ─────────────────────────────────────────────────────────
type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
type NavGroup = { key: string; label: string; href: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
    {
        key: 'learn', label: 'Learn', href: '/learn', items: [
            { label: 'Effects on Kids', href: '/learn/kids' },
            { label: 'Device Dependency', href: '/learn/dependency' },
            { label: 'Depression & Anxiety', href: '/learn/depression' },
            { label: 'Attention & Focus', href: '/learn/attention' },
            { label: 'Sleep', href: '/learn/sleep' },
            { label: 'Body Image', href: '/learn/body-image' },
            { label: 'Environmental Impact', href: '/learn/ecological-impact' },
            { label: 'In the News', href: '/news' },
            { label: 'Sources', href: '/sources' },
        ],
    },
    {
        key: 'act', label: 'Take Action', href: '/pledge', items: [
            { label: 'Take the Pledge', href: '/pledge' },
            { label: 'Take the Quiz', href: '/quiz' },
            { label: 'How to Reduce', href: '/help-yourself' },
            { label: 'How to Quit', href: '/before-you-go' },
            { label: 'Parents Guide', href: '/parents' },
            { label: 'Breathe', href: '/breathe' },
        ],
    },
    { key: 'events', label: 'Events', href: '/events', items: [] },
    {
        key: 'about', label: 'About', href: '/about', items: [
            { label: 'Help Us Grow', href: '/grow' },
            { label: 'Internship 2026', href: '/internship-2026' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
        ],
    },
];

// ── Icons (lucide-style, currentColor) ───────────────────────────────────────
const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

function GroupIcon({ k, className }: { k: string; className?: string }) {
    switch (k) {
        case 'learn': return <svg {...iconProps} className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
        case 'act': return <svg {...iconProps} className={className}><path d="M4 22V4a1 1 0 0 1 1-1h12l-2 4 2 4H5" /></svg>;
        case 'events': return <svg {...iconProps} className={className}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
        case 'about': return <svg {...iconProps} className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>;
        default: return null;
    }
}

function Chevron({ open }: { open: boolean }) {
    return <svg {...iconProps} width={16} height={16} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>;
}

export default function AppShell({ totalPledges, children }: { totalPledges?: number; children: React.ReactNode }) {
    const pathname = usePathname();
    const [rail, setRail] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState<Record<string, boolean>>(
        () => Object.fromEntries(GROUPS.map((g) => [g.key, true]))
    );

    const isActive = (href: string) => pathname === href;
    const inGroup = (g: NavGroup) => pathname === g.href || g.items.some((i) => pathname === i.href || pathname.startsWith(i.href + '/') || i.children?.some((c) => pathname === c.href));

    // Render functions (not components) so closures over state work without
    // violating the "no components created during render" lint rule.
    function renderFullNav(onNavigate?: () => void) {
        return (
            <nav aria-label="Site sections" className="flex flex-col gap-1 p-3">
                {GROUPS.map((g) => {
                    const groupActive = inGroup(g);
                    return (
                        <div key={g.key}>
                            <div className={`flex items-center rounded-md ${groupActive ? 'text-(--accent)' : 'text-(--foreground)'}`}>
                                <Link
                                    href={g.href}
                                    onClick={onNavigate}
                                    aria-current={isActive(g.href) ? 'page' : undefined}
                                    className="flex flex-1 items-center gap-2.5 px-3 py-2 font-display text-xl hover:text-(--accent) transition-colors"
                                >
                                    <GroupIcon k={g.key} className="shrink-0 text-(--accent-muted)" />
                                    {g.label}
                                </Link>
                                {g.items.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setOpen((s) => ({ ...s, [g.key]: !s[g.key] }))}
                                        aria-expanded={open[g.key]}
                                        aria-label={`${open[g.key] ? 'Collapse' : 'Expand'} ${g.label}`}
                                        className="px-2 py-2 text-(--muted) hover:text-(--accent) cursor-pointer"
                                    >
                                        <Chevron open={open[g.key]} />
                                    </button>
                                )}
                            </div>
                            {g.items.length > 0 && open[g.key] && (
                                <ul className="ml-4 border-l border-(--border-subtle) pl-2 py-1 flex flex-col gap-0.5">
                                    {g.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onNavigate}
                                                aria-current={isActive(item.href) ? 'page' : undefined}
                                                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${isActive(item.href) ? 'bg-(--accent)/10 text-(--accent) font-semibold' : 'text-(--muted) hover:bg-(--accent)/5 hover:text-(--accent)'}`}
                                            >
                                                {item.label}
                                            </Link>
                                            {item.children && (
                                                <ul className="ml-3 border-l border-(--border-subtle) pl-2 flex flex-col gap-0.5">
                                                    {item.children.map((c) => (
                                                        <li key={c.href}>
                                                            <Link
                                                                href={c.href}
                                                                onClick={onNavigate}
                                                                aria-current={isActive(c.href) ? 'page' : undefined}
                                                                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${isActive(c.href) ? 'bg-(--accent)/10 text-(--accent) font-semibold' : 'text-(--muted) hover:bg-(--accent)/5 hover:text-(--accent)'}`}
                                                            >
                                                                {c.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </nav>
        );
    }

    function renderRailNav() {
        return (
            <nav aria-label="Site sections" className="flex flex-col items-center gap-2 p-2">
                {GROUPS.map((g) => (
                    <Link
                        key={g.key}
                        href={g.href}
                        title={g.label}
                        aria-label={g.label}
                        aria-current={isActive(g.href) ? 'page' : undefined}
                        className={`flex items-center justify-center size-11 rounded-md transition-colors ${inGroup(g) ? 'bg-(--accent)/10 text-(--accent)' : 'text-(--foreground) hover:bg-(--accent)/5 hover:text-(--accent)'}`}
                    >
                        <GroupIcon k={g.key} />
                    </Link>
                ))}
            </nav>
        );
    }

    return (
        <>
            {/* ── Top bar ───────────────────────────────────────────────── */}
            <header>
                <nav id="top-nav" aria-label="Primary" className="relative flex w-full justify-between items-center py-3 lg:py-4 px-4 lg:px-8 bg-(--nav-background) text-(--on-accent) border-b-5 border-(--accent-muted)">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 -ml-2 cursor-pointer"
                            aria-label="Open navigation menu"
                            aria-expanded={mobileOpen}
                        >
                            <svg {...iconProps} width={26} height={26}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <Link href="/" aria-label="Disconnect Madison home" className="inline-flex items-center">
                            <Logo variant="inverted" height={36} alt="Disconnect Madison" bare priority />
                        </Link>
                        {totalPledges != null && (
                            <span className="hidden lg:inline text-base font-display text-(--on-accent)/60">
                                {totalPledges.toLocaleString()} {totalPledges === 1 ? 'pledge' : 'pledges'}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 font-display text-lg sm:text-xl">
                        <Link href="/donate" className="border border-lime/70 text-lime px-3 sm:px-4 py-1.5 rounded-sm hover:border-lime hover:bg-lime/10 transition-colors">Donate</Link>
                        <Link href="/pledge" className="bg-cta text-on-cta hover:bg-cta-hover px-3 sm:px-4 py-1.5 rounded-sm transition-colors">Pledge<span className="hidden sm:inline"> Today</span></Link>
                    </div>
                </nav>
            </header>

            {/* ── Body: sidebar + main ──────────────────────────────────── */}
            <div className="flex w-full">
                {/* Desktop sidebar */}
                <aside className={`hidden lg:flex flex-col shrink-0 bg-surface border-r border-(--border-subtle) sticky top-0 h-screen overflow-y-auto transition-[width] duration-200 ${rail ? 'w-16' : 'w-64'}`}>
                    <div className={`flex ${rail ? 'justify-center' : 'justify-end'} p-2 border-b border-(--border-subtle)`}>
                        <button
                            type="button"
                            onClick={() => setRail((v) => !v)}
                            className="p-2 rounded-md text-(--muted) hover:text-(--accent) hover:bg-(--accent)/5 cursor-pointer"
                            aria-label={rail ? 'Expand sidebar' : 'Collapse sidebar'}
                            title={rail ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <svg {...iconProps} className={rail ? 'rotate-180' : ''}><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                    </div>
                    {rail ? renderRailNav() : renderFullNav()}
                </aside>

                {/* Mobile drawer */}
                {mobileOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div className="fixed inset-0 bg-forest/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
                        <div className="relative z-10 w-72 max-w-[80%] h-full bg-surface overflow-y-auto shadow-xl">
                            <div className="flex justify-between items-center p-3 border-b border-(--border-subtle)">
                                <span className="font-display text-xl text-(--accent) px-2">Menu</span>
                                <button type="button" onClick={() => setMobileOpen(false)} className="p-2 text-(--muted) hover:text-(--accent) cursor-pointer" aria-label="Close navigation menu">
                                    <svg {...iconProps} width={24} height={24}><path d="M18 6 6 18M6 6l12 12" /></svg>
                                </button>
                            </div>
                            {renderFullNav(() => setMobileOpen(false))}
                        </div>
                    </div>
                )}

                {/* Main content */}
                <main id="main-content" className="flex-1 min-w-0 min-h-screen flex flex-col items-center py-10 px-4 sm:px-8 lg:px-16 bg-background sm:items-start">
                    {children}
                </main>
            </div>
        </>
    );
}
