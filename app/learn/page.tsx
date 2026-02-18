import type { Metadata } from "next";
import Link from "next/link";
import NewsCarousel from "@/app/components/NewsCarousel";

export const metadata: Metadata = {
    title: "Learn",
    description: "Explore the true costs of social media — research-backed insights on mental health, attention, privacy, and more.",
    alternates: { canonical: "/learn" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section aria-labelledby="at-a-glance" className="w-full mb-16">
                <h1 id="at-a-glance" className="font-handjet text-5xl lg:text-7xl font-bold mb-3">
                    The True Costs of Social Media
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    A summary of findings from clinical studies, longitudinal research, and large-scale public data. <Link href="/sources" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">View sources</Link>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Depression &amp; Anxiety</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Multiple longitudinal studies have found associations between heavy social media use and increased depressive symptoms.</li>
                            <li>Randomized experiments show that limiting daily use can reduce depression and anxiety scores in some populations.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Sleep Disruption</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Nighttime social media use is consistently linked to delayed sleep onset.</li>
                            <li>Blue light exposure and cognitive stimulation from scrolling interfere with the body&apos;s circadian rhythms.</li>
                            <li>Poor sleep is one of the strongest predictors of diminished mental and physical health.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Attention &amp; Focus</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Research on media multitasking shows reduced cognitive performance over time.</li>
                            <li>Even the presence of a phone on a desk can impair working memory.</li>
                            <li>Constant task-switching fragments attention, making sustained focus harder to maintain.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Loneliness &amp; Social Comparison</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Passive consumption (scrolling without interacting) correlates with increased feelings of loneliness.</li>
                            <li>Social comparison effects are well-documented, particularly on platforms that emphasize curated self-presentation.</li>
                            <li>Online interaction does not consistently substitute for in-person connection.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Body Image &amp; Self-Perception</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Image-heavy platforms have been linked to increased body dissatisfaction, with stronger effects in adolescents and young adults.</li>
                            <li>Internal research from major platforms has acknowledged these concerns.</li>
                            <li>The effects appear to be amplified by algorithmic promotion of appearance-focused content.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Polarization &amp; Outrage</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Algorithmic recommendation systems are designed to maximize engagement.</li>
                            <li>Outrage and emotionally charged content spreads faster and further than neutral content.</li>
                            <li>Public studies have documented increased exposure to extreme viewpoints through these amplification systems.</li>
                        </ul>
                    </div>

                    <div className="border border-(--secondary-accent) rounded-md p-6">
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color)">Data Centers &amp; Ecological Impact</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>The infrastructure that powers social media platforms requires enormous amounts of energy and water.</li>
                            <li>Data centers account for a growing share of global electricity consumption, and AI-driven content systems are accelerating that demand.</li>
                            <li>The environmental costs of always-on digital services are substantial and often invisible to end users.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section aria-labelledby="what-happens" className="w-full mb-16">
                <h2 id="what-happens" className="font-handjet text-5xl lg:text-7xl font-bold mb-8">
                    What Happens When You Step Away
                </h2>

                <div className="space-y-10">
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-(--primary-color)">Mood improves</h3>
                        <p className="mb-2">
                            Controlled studies have found that participants who reduced their social media use reported meaningful decreases in depressive symptoms over several weeks. Some randomized trials suggest that decreasing time on these platforms can also reduce loneliness.
                        </p>
                        <p>
                            Many people report lower anxiety and improved emotional stability after stepping back. Outcomes vary from person to person, but the patterns are consistent across multiple studies.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-2 text-(--primary-color)">Sleep and focus recover</h3>
                        <p className="mb-2">
                            Reduced nighttime use is associated with improved sleep duration and quality. Better sleep, in turn, supports mood, physical health, and cognitive performance.
                        </p>
                        <p>
                            Limiting digital interruptions can also improve the ability to sustain attention. People often notice longer stretches of uninterrupted time for reading, working, or simply being present.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-2 text-(--primary-color)">Time reappears</h3>
                        <p className="mb-2">
                            Average daily usage can add up to many hours per week. Reducing or eliminating social media often frees meaningful blocks of time that were previously hard to account for.
                        </p>
                        <p>
                            That time can be redirected toward things that bring more joy and satisfaction. The goal is not to prescribe how it should be spent, but to make it available again.
                        </p>
                    </div>
                </div>

                <p className="mt-10">
                    Stepping away from social media is not about perfection or moral superiority. It is about creating space to examine whether your habits align with the things you actually value. Everyone&apos;s relationship with these platforms is different. What matters is that the choice is intentional, and that it belongs to you.
                </p>
            </section>

            <section aria-labelledby="share-your-story" className="w-full mb-16">
                <h2 id="share-your-story" className="font-handjet text-4xl lg:text-5xl font-bold mb-4">
                    Share Your Story
                </h2>
                <p>
                    Have you stepped away from social media, or are you thinking about it? We&apos;d like to hear from you &mdash; what drove the decision, what surprised you, what you miss (if anything), or what you got back. <Link href="/contact" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Send us a message.</Link>
                </p>
            </section>

            <NewsCarousel />
        </div>
    );
}
