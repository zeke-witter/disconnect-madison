import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Are we too dependent on our devices?",
    alternates: { canonical: "/learn/dependency" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section className="w-full mb-16">
                <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-6">
                    Are we too dependent on our devices?
                </h1>
                <p className="text-(--secondary-accent)">
                    This page is a work in progress. Check back soon.
                </p>
            </section>
        </div>
    );
}
