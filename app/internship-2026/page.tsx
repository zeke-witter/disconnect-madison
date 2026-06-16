import Image from "next/image";
import Link from "next/link";
import StickerCarousel from "./StickerCarousel";
import SocialCarousel from "./SocialCarousel";

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-body">
            <h1 className="font-display text-5xl lg:text-7xl mb-2 w-full">Tanisha Pathan</h1>
            <p className="w-full text-(--muted) text-lg mb-10">Design Intern, 2026</p>

            {/* Profile */}
            <section aria-labelledby="profile-heading" className="w-full mb-16">
                <h2 id="profile-heading" className="sr-only">Profile</h2>
                <div>
                    <Image
                        src="/internship_tanisha.png"
                        alt="Tanisha Pathan"
                        width={176}
                        height={176}
                        className="float-left w-44 h-44 rounded-md mr-6 mb-4 object-cover"
                    />
                    <p className="mb-4">
                        Hi! I&apos;m Tanisha, a communication design student who spends an unreasonable amount of time recognizing fonts in the wild, mentally redesigning bad flyers, figuring out what makes people pay attention, and then using design to make sure they do.
                    </p>
                    <p className="mb-4">
                        Over the past few years, I&apos;ve had the chance to work with design and advertising agencies, national nonprofits, and student organizations on branding, campaigns, visual identities, and digital content. Those experiences taught me that good design is about much more than aesthetics. It starts with understanding people, asking the right questions, and creating solutions that are thoughtful, effective, and grounded in real needs.
                    </p>
                    <p className="mb-4">
                        Working with Disconnect Madison gave me the opportunity to apply that approach in a meaningful way. The internship challenged me to think carefully about how design can support connection, belonging, and intentional engagement in an increasingly digital world.
                    </p>
                    <p className="mb-6">
                        Beyond design, I&apos;m interested in community, sustainability, and technology, particularly in how they shape the way we interact with one another. That&apos;s one of the reasons Disconnect Madison&apos;s mission resonated with me. Working alongside Zeke, whose enthusiasm for community-building is absolutely infectious, made the experience especially memorable. Projects like this remind me why I enjoy working at the intersection of design, strategy, and social impact.
                    </p>
                    <a
                        id="portfolio-link"
                        href="https://tanishapathan.framer.website/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-(--accent)/70 text-(--accent) font-medium px-5 py-2 rounded-sm hover:border-(--accent) hover:bg-(--accent)/10 transition-colors no-underline"
                    >
                        View my portfolio
                    </a>
                </div>
            </section>

            {/* Sticker designs */}
            <section aria-labelledby="stickers-heading" className="w-full mb-16">
                <h2 id="stickers-heading" className="font-bold text-2xl mb-2 text-(--accent-muted)">Sticker designs</h2>
                <p className="text-(--muted) mb-8">
                    Tanisha is designing a series of stickers for Disconnect Madison to use at events and in printed materials. More designs will be added as they&apos;re completed.
                </p>
                <StickerCarousel />
            </section>

            {/* Social media templates */}
            <section aria-labelledby="social-heading" className="w-full mb-16">
                <h2 id="social-heading" className="font-bold text-2xl mb-2 text-(--accent-muted)">Social media templates</h2>
                <SocialCarousel />
                <p className="text-(--muted) mt-8">
                    In addition to designing several configurable templates for social media posts, Tanisha developed a content calendar and templating guidelines.
                </p>
            </section>

            {/* Brand design — coming soon */}
            <section aria-labelledby="brand-heading" className="w-full mb-10">
                <div className="border border-dashed border-(--accent-muted)/50 rounded-md p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 id="brand-heading" className="font-bold text-2xl text-(--accent-muted)">Brand design</h2>
                        <span className="text-xs font-medium border border-(--accent-muted)/60 text-(--muted) px-2 py-0.5 rounded-full">
                            Coming soon
                        </span>
                    </div>
                    <p className="text-(--muted)">
                        Tanisha will be leading a full visual identity refresh for Disconnect Madison, including a logo, color palette, and typography system. This section will showcase that work as it develops.
                    </p>
                </div>
            </section>

            <section className="w-full text-(--muted) text-sm">
                <p>
                    Interested in contributing to Disconnect Madison? <Link href="/grow">See how you can help</Link>.
                </p>
            </section>
        </div>
    );
}
