import Link from "next/link";
import StickerCarousel from "./StickerCarousel";

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl mb-2 w-full">Tanisha Pathan</h1>
            <p className="w-full text-(--secondary-accent) text-lg mb-10">Design Intern, 2026</p>

            {/* Profile */}
            <section aria-labelledby="profile-heading" className="w-full mb-16">
                <h2 id="profile-heading" className="sr-only">Profile</h2>
                <div>
                    <div className="float-left w-44 h-44 rounded-md mr-6 mb-4 bg-(--secondary-accent)/20 border border-(--secondary-accent)/40 flex items-center justify-center text-(--secondary-accent) text-sm">
                        Photo coming soon
                    </div>
                    <p className="mb-4">
                        Placeholder paragraph one. Tanisha is a graphic design student with a passion for visual communication and community-driven work. She brings a sharp eye for detail and a collaborative spirit to everything she touches.
                    </p>
                    <p className="mb-4">
                        Placeholder paragraph two. Before joining Disconnect Madison, Tanisha worked on branding projects for student organizations and local nonprofits, developing a style that balances clarity with personality. She believes good design should feel effortless to the people it serves.
                    </p>
                    <p className="mb-6">
                        Placeholder paragraph three. Outside of design, Tanisha is interested in sustainable living, urban community spaces, and the intersection of technology and human behavior — which made Disconnect Madison a natural fit for her first major internship.
                    </p>
                    <a
                        id="portfolio-link"
                        href="https://tanishapathan.framer.website/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-amber-400/70 text-amber-300 font-medium px-5 py-2 rounded-sm hover:border-amber-400 hover:bg-amber-400/10 transition-colors no-underline"
                    >
                        View her portfolio
                    </a>
                </div>
            </section>

            {/* Sticker designs */}
            <section aria-labelledby="stickers-heading" className="w-full mb-16">
                <h2 id="stickers-heading" className="font-bold text-2xl mb-2 text-(--primary-color)">Sticker designs</h2>
                <p className="text-(--secondary-accent) mb-8">
                    Tanisha is designing a series of stickers for Disconnect Madison to use at events and in printed materials. More designs will be added as they&apos;re completed.
                </p>
                <StickerCarousel />
            </section>

            {/* Brand design — coming soon */}
            <section aria-labelledby="brand-heading" className="w-full mb-10">
                <div className="border border-dashed border-(--secondary-accent)/50 rounded-md p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 id="brand-heading" className="font-bold text-2xl text-(--primary-color)">Brand design</h2>
                        <span className="text-xs font-medium border border-(--secondary-accent)/60 text-(--secondary-accent) px-2 py-0.5 rounded-full">
                            Coming soon
                        </span>
                    </div>
                    <p className="text-(--secondary-accent)">
                        Tanisha will be leading a full visual identity refresh for Disconnect Madison, including a logo, color palette, and typography system. This section will showcase that work as it develops.
                    </p>
                </div>
            </section>

            <section className="w-full text-(--secondary-accent) text-sm">
                <p>
                    Interested in contributing to Disconnect Madison? <Link href="/grow">See how you can help</Link>.
                </p>
            </section>
        </div>
    );
}
