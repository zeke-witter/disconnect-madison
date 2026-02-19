import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Help Us Grow",
    description: "Help Disconnect Society reach more people. Print a flyer, share your story, or get in touch with ideas.",
    alternates: { canonical: "/grow" },
};

const flyers = [
    {
        file: "/disconnect-flyer-generic.pdf",
        name: "General flyer",
        description: "For schools, gyms, coffee shops, libraries — anywhere people gather.",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="grow-heading" className="w-full mb-16">
                <h1 id="grow-heading" className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                    Help us grow
                </h1>
                <p className="text-lg text-(--secondary-accent)">
                    Disconnect Society is a community project operated by one person with no marketing budget and no paid staff. Here&apos;s how you can help.
                </p>
            </section>

            <section aria-labelledby="flyers-heading" className="w-full mb-16">
                <h2 id="flyers-heading" className="font-handjet text-4xl lg:text-5xl font-bold mb-3">
                    Print a flyer
                </h2>
                <p className="text-(--secondary-accent) mb-8">
                    Print one out and post it somewhere people in your community will see it &mdash; a school hallway, library, coffee shop, gym, or community board. Click a flyer to open it as a PDF.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {flyers.map(({ file, name, description }) => (
                        <a
                            key={file}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block border border-(--secondary-accent) rounded-md overflow-hidden hover:border-(--primary-accent) transition-colors"
                        >
                            <div className="relative w-full overflow-hidden bg-(--secondary-accent)/10" style={{ aspectRatio: '8.5 / 11' }}>
                                <iframe
                                    src={file}
                                    className="w-full h-full pointer-events-none"
                                    title={`${name} preview`}
                                />
                            </div>
                            <div className="p-4 flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-medium text-(--primary-color)">{name}</p>
                                    <p className="text-sm text-(--secondary-accent) mt-0.5">{description}</p>
                                </div>
                                <span className="text-xs text-(--secondary-accent) shrink-0 mt-0.5">PDF</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <section aria-labelledby="ideas-heading" className="w-full mb-16">
                <h2 id="ideas-heading" className="font-handjet text-4xl lg:text-5xl font-bold mb-3">
                    Got an idea? Want to help?
                </h2>
                <p className="text-(--secondary-accent) mb-4">
                    We&apos;re always open to new ideas, better ways to spread the message, partnerships, events, content, or anything else you think could move the needle. If you want to get involved in any capacity, we&apos;d love to hear from you.
                </p>
                <p className="mb-4">We&apos;re especially in need of assistance from graphic designers (can you tell?) and people with experience in community organizing.</p>
                <p>
                    <Link
                        href="/contact"
                        className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)"
                    >
                        Send us a message through the contact form →
                    </Link>
                </p>
            </section>

        </div>
    );
}
