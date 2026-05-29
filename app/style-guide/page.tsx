import type { Metadata } from "next";
import Logo from "../components/Logo";

export const metadata: Metadata = {
    title: "Style Guide",
    description: "Internal brand reference: colors, type scale, logos, and components.",
    robots: { index: false, follow: false },
};

// ── Color reference (see BRAND.md / globals.css) ─────────────────────────────
const primitives: { token: string; hex: string }[] = [
    { token: "--brand-forest", hex: "#386641" },
    { token: "--brand-forest-dark", hex: "#315A39" },
    { token: "--brand-forest-hover", hex: "#507855" },
    { token: "--brand-fern", hex: "#6A994E" },
    { token: "--brand-lime", hex: "#A7C957" },
    { token: "--brand-lime-hover", hex: "#96B54E" },
    { token: "--brand-cream", hex: "#FEF8E8" },
    { token: "--brand-blush", hex: "#E88FA5" },
    { token: "--brand-blush-light", hex: "#ECA4B2" },
];

const semantics: { token: string; note: string }[] = [
    { token: "--background", note: "Page background (cream)" },
    { token: "--foreground", note: "Body text (forest)" },
    { token: "--surface", note: "Card / panel surface" },
    { token: "--heading", note: "Headings (forest)" },
    { token: "--accent", note: "Links, primary forest buttons" },
    { token: "--accent-hover", note: "Accent hover" },
    { token: "--accent-muted", note: "Secondary headings, supporting text, borders (fern)" },
    { token: "--border", note: "Borders (fern)" },
    { token: "--border-subtle", note: "Dividers (fern tint)" },
    { token: "--muted", note: "Muted text (forest tint)" },
    { token: "--cta-bg", note: "Primary CTA fill (lime)" },
    { token: "--cta-text", note: "Text on CTA (forest)" },
    { token: "--accent-emotional", note: "Quotes / human-touch accents (blush)" },
    { token: "--nav-background", note: "Nav / inverted sections (forest)" },
    { token: "--on-forest", note: "Text on forest surfaces (cream)" },
];

function Swatch({ token, sub, dark }: { token: string; sub: string; dark?: boolean }) {
    return (
        <div className="rounded-md border border-(--border-subtle) overflow-hidden">
            <div className="h-16 w-full" style={{ backgroundColor: `var(${token})` }} />
            <div className={`px-3 py-2 ${dark ? "bg-forest text-(--on-forest)" : "bg-surface"}`}>
                <code className="block text-xs font-mono">{token}</code>
                <span className="block text-xs mt-0.5 opacity-80">{sub}</span>
            </div>
        </div>
    );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section aria-labelledby={id} className="w-full mb-16">
            <h2 id={id} className="font-display text-3xl lg:text-4xl mb-6 border-b border-(--border-subtle) pb-2">
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function StyleGuidePage() {
    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto font-body">
            <header className="w-full mb-12">
                <h1 className="font-display text-5xl lg:text-7xl mb-3">Style Guide</h1>
                <p className="text-(--muted)">
                    Internal visual contract for the Disconnect Madison brand system. Not indexed.
                    Source of truth: <code className="font-mono text-sm">BRAND.md</code> and{" "}
                    <code className="font-mono text-sm">app/globals.css</code>.
                </p>
            </header>

            <Section id="colors-primitive" title="Color — brand primitives">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {primitives.map((c) => (
                        <Swatch key={c.token} token={c.token} sub={c.hex} />
                    ))}
                </div>
            </Section>

            <Section id="colors-semantic" title="Color — semantic tokens">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {semantics.map((c) => (
                        <Swatch key={c.token} token={c.token} sub={c.note} dark={c.token === "--on-forest"} />
                    ))}
                </div>
            </Section>

            <Section id="type" title="Typography">
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="text-xs text-(--muted)">Display / Hero · Built Titling · text-5xl→7xl</span>
                        <p className="font-display text-5xl lg:text-7xl">What is it getting from you?</p>
                    </div>
                    <div>
                        <span className="text-xs text-(--muted)">Section header · Built Titling · text-3xl→5xl</span>
                        <p className="font-display text-3xl lg:text-5xl">The cost of social media</p>
                    </div>
                    <div>
                        <span className="text-xs text-(--muted)">Subheading · Raleway 600 · text-xl→2xl</span>
                        <p className="font-body font-semibold text-xl lg:text-2xl">Reconnect with the real world</p>
                    </div>
                    <div>
                        <span className="text-xs text-(--muted)">Body · Raleway 400 · text-base→lg</span>
                        <p className="font-body text-base lg:text-lg max-w-2xl">
                            Most of us use it out of habit or social pressure more than intention. The platforms
                            are designed around your attention, and they are very good at keeping it.
                        </p>
                    </div>
                    <div>
                        <span className="text-xs text-(--muted)">Caption / fine print · Raleway 400 · text-sm</span>
                        <p className="font-body text-sm text-(--muted)">A registered 501(c)(3) nonprofit. No tracking, no spam.</p>
                    </div>
                    <div>
                        <span className="text-xs text-(--muted)">Accent / quote · Sue Ellen Francisco · text-2xl→4xl</span>
                        <p className="font-accent text-2xl lg:text-4xl text-forest">We&apos;re all in this boat together.</p>
                    </div>
                </div>
            </Section>

            <Section id="logos" title="Logos">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="rounded-md border border-(--border-subtle) bg-surface p-6 flex flex-col items-center gap-2">
                        <Logo variant="primary" height={56} />
                        <code className="text-xs font-mono">primary</code>
                    </div>
                    <div className="rounded-md border border-(--border-subtle) bg-surface p-6 flex flex-col items-center gap-2">
                        <Logo variant="wordmark" height={56} />
                        <code className="text-xs font-mono">wordmark</code>
                    </div>
                    <div className="rounded-md border border-(--border-subtle) bg-surface p-6 flex flex-col items-center gap-2">
                        <Logo variant="icon" height={72} />
                        <code className="text-xs font-mono">icon</code>
                    </div>
                    <div className="rounded-md border border-(--border-subtle) bg-forest p-6 flex flex-col items-center gap-2">
                        <Logo variant="inverted" height={56} />
                        <code className="text-xs font-mono text-(--on-forest)">inverted (on forest)</code>
                    </div>
                </div>
            </Section>

            <Section id="buttons" title="Buttons & states">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-cta text-on-cta hover:bg-cta-hover px-5 py-2.5 rounded-md font-display text-xl font-bold transition-colors cursor-pointer">Primary CTA (lime)</span>
                    <span className="bg-(--accent) text-(--on-accent) hover:bg-(--accent-hover) px-5 py-2.5 rounded-md font-display text-xl font-bold transition-colors cursor-pointer">Secondary (forest)</span>
                    <span className="border-2 border-(--accent) text-(--accent) hover:bg-(--accent)/10 px-5 py-2.5 rounded-md font-display text-xl font-bold transition-colors cursor-pointer">Ghost (forest outline)</span>
                    <span className="bg-cta text-on-cta px-5 py-2.5 rounded-md font-display text-xl font-bold opacity-50 cursor-not-allowed">Disabled</span>
                </div>
                <div className="bg-forest rounded-md p-6 flex flex-wrap items-center gap-4">
                    <span className="bg-cta text-on-cta hover:bg-cta-hover px-5 py-2.5 rounded-sm font-display text-xl font-bold transition-colors cursor-pointer">Pledge (on forest)</span>
                    <span className="border border-lime/70 text-lime hover:bg-lime/10 px-5 py-2.5 rounded-sm font-display text-xl font-bold transition-colors cursor-pointer">Donate ghost (on forest)</span>
                </div>
            </Section>
        </div>
    );
}
