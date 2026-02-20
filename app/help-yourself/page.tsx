import type { Metadata } from "next";
import Link from "next/link";
import HelpYourselfAccordion from "@/app/components/HelpYourselfAccordion";

export const metadata: Metadata = {
    title: "How to Help Yourself",
    description: "Practical, research-informed advice for reducing screen time, surviving the first two weeks, and building a life with less social media.",
    alternates: { canonical: "/help-yourself" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="what-actually-helps" className="w-full mb-10">
                <h1 id="what-actually-helps" className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                    How to help yourself
                </h1>
                <div className="space-y-4">
                    <p className="text-lg text-(--secondary-accent)">
                        Do you feel strong reluctance when you think about deleting your Tiktok or Instagram account? Have you tried to quit in the past, but it didn&apos;t stick? You&apos;re not alone.
                    </p>
                    <p>
                        Reducing screen time (or quitting social media) is hard for a reason. The platforms we use were <span className="italic">designed</span> to make it hard to leave. What works is personal. It depends on why you&apos;re here, how deep the habit runs, and what your life looks like. Some of this advice is backed by research. Some of it is just what people who&apos;ve done this before say helped them. We&apos;ve tried to be honest about which is which.
                    </p>
                    <p>
                        One thing we can say with confidence: the discomfort is temporary. A Georgetown University study found that participants who cut internet access on their phones for two weeks experienced meaningful reductions in anxiety and depression (improvements comparable to cognitive-behavioral therapy) and gained an average of 20 extra minutes of sleep per night. <span className="font-bold">Their attention spans improved by the equivalent of reversing about a decade of age-related cognitive decline.</span>
                    </p>
                    <p>Just like changing any other habit-forming behavior, the hard part isn&apos;t staying away for a long time. It&apos;s getting through the first week or two.</p>
                </div>
            </section>

            <HelpYourselfAccordion />

            <section aria-labelledby="kids-sources" className="w-full mt-6 text-sm text-(--secondary-accent)">
                <h2 id="kids-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
                <p>
                    Full citations for every study referenced on this page are available on the{" "}
                    <Link href="/sources" className="underline">Sources page</Link>.
                </p>
            </section>

            <p className="w-full text-xs text-(--secondary-accent) pt-6 mb-8">
                Disclosure: Disconnect Society is not affiliated with, sponsored by, or receiving compensation from any product or company mentioned on this page. We describe tools and products for informational purposes only. Inclusion is not an endorsement. We encourage you to research any product independently before purchasing.
            </p>

        </div>
    );
}
