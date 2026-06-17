import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export const metadata: Metadata = {
    title: "Links",
    description: "Disconnect Madison — take the pledge, join an event, take the quiz, and more.",
    alternates: { canonical: "/links" },
    robots: { index: false },
};

const LINKS = [
    {
        href: "/pledge",
        label: "Take the Pledge",
        sub: "10 days. Your terms. You've got this.",
        aClass: "bg-cta hover:bg-cta-hover",
        spanClass: "",
    },
    {
        href: "/events",
        label: "Upcoming Events",
        sub: "Join us in person in Madison, WI",
        aClass: "border-2 border-(--accent-emotional) hover:bg-(--accent-emotional)/10",
        spanClass: "",
    },
    {
        href: "/quiz",
        label: "Take the Quiz",
        sub: "See how social media is affecting you",
        aClass: "bg-forest hover:bg-forest-hover",
        spanClass: "text-cream",
    },
    {
        href: "/donate",
        label: "Donate",
        sub: "Help us reach more people across Madison",
        aClass: "bg-blush hover:bg-blush-light",
        spanClass: "text-cream",
    },
    {
        href: "/learn",
        label: "Read the Research",
        sub: "What the science actually says",
        aClass: "border-2 border-(--accent-muted) hover:bg-(--accent-muted)/10",
        spanClass: "",
    },
    {
        href: "/grow",
        label: "Help Us Grow",
        sub: "Print a flyer, tell a friend, get involved",
        aClass: "border-2 border-(--accent-muted) hover:bg-(--accent-muted)/10",
        spanClass: "",
    },
];

export default function LinksPage() {
    return (
        <div className="relative pb-20 overflow-x-hidden">

            {/* Doodles — mobile only, peeking from the edges */}
            <div
                className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <Image
                    src="/brand/elements/sun_03.png"
                    alt=""
                    width={200}
                    height={200}
                    className="absolute top-0 right-0 w-16 h-auto translate-x-5 rotate-[15deg] opacity-55"
                />
                <Image
                    src="/brand/elements/leaf_02.png"
                    alt=""
                    width={200}
                    height={200}
                    className="absolute top-52 left-0 w-16 h-auto -translate-x-5 rotate-[-10deg] opacity-55"
                />
                <Image
                    src="/brand/elements/rainbow_02.png"
                    alt=""
                    width={200}
                    height={200}
                    className="absolute bottom-24 right-0 w-20 h-auto translate-x-6 opacity-50"
                />
                <Image
                    src="/brand/elements/grass_02.png"
                    alt=""
                    width={200}
                    height={200}
                    className="absolute bottom-10 left-0 w-20 h-auto -translate-x-6 opacity-55"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto px-6 pt-4">

                <div className="mb-2">
                    <Logo variant="secondary" height={110} priority />
                </div>

                <p className="font-accent text-2xl text-center text-(--accent-muted) mb-2 leading-snug">
                    Glad you found us.
                </p>

                <p className="text-center text-sm text-(--muted) mb-8 leading-relaxed max-w-xs">
                    A Madison, WI community working to step back from algorithm-driven social media,
                    one intentional choice at a time.
                </p>

                <nav aria-label="Quick links" className="w-full flex flex-col gap-3">
                    {LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`link-card block w-full rounded-xl px-5 py-3.5 text-center transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow ${link.aClass}`}
                        >
                            <span className={`block font-display text-lg font-semibold leading-snug ${link.spanClass}`}>
                                {link.label}
                            </span>
                            <span className={`block text-xs mt-0.5 opacity-70 font-body leading-snug ${link.spanClass}`}>
                                {link.sub}
                            </span>
                        </Link>
                    ))}
                </nav>

                <p className="mt-10 text-xs text-center opacity-40 text-(--foreground)">
                    disconnectmadison.org
                </p>

            </div>
        </div>
    );
}
