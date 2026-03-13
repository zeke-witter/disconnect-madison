import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Attention & Focus",
    description: "How smartphones and social media fragment attention, what the research says about cognitive cost, and what changes when you create space for sustained focus.",
    alternates: { canonical: "/learn/attention" },
};

const stats = [
    {
        figure: "23 min",
        detail: "average time to fully return to a task after an interruption, according to UC Irvine research",
        source: "Gloria Mark, UC Irvine",
    },
    {
        figure: "3–5 min",
        detail: "average time before an office worker is interrupted or self-interrupts",
        source: "Gloria Mark, UC Irvine",
    },
    {
        figure: "47%",
        detail: "of waking hours people's minds are wandering, regardless of what they're doing",
        source: "Killingsworth & Gilbert, Science 2010",
    },
    {
        figure: "10 m",
        detail: "measurable reduction in working memory from having a phone on the desk, face-down and silent",
        source: "Ward et al., JACR 2017",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="attention-heading" className="w-full mb-4">
                <h1 id="attention-heading" className="font-handjet text-5xl lg:text-7xl mb-3">
                    Attention &amp; focus
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    Your attention is not just something you use. It is the resource platforms are built to extract, and the research on what that extraction costs is unusually consistent.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map(({ figure, detail, source }) => (
                        <div key={figure} className="border border-(--secondary-accent) rounded-md p-5 flex flex-col gap-2">
                            <span className="font-handjet text-5xl text-(--primary-accent) leading-none">{figure}</span>
                            <span className="text-sm font-medium text-(--primary-color) leading-snug">{detail}</span>
                            <span className="text-xs text-(--secondary-accent) mt-auto">{source}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="attention-economy" className="w-full mb-16">
                <h2 id="attention-economy" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The attention economy isn&apos;t a metaphor
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Your attention is not just something you use. It is what the platforms are selling.
                </p>
                <div className="space-y-4">
                    <p>
                        Social media platforms are built on a straightforward business model: capture attention, sell it to advertisers. The longer you stay, the more you see, the more data is collected, and the more revenue is generated. Every design decision, from autoplay to infinite scroll to notification timing, is optimized for this goal. Understanding this is not paranoia. It is the stated logic of the industry.
                    </p>
                    <p>
                        The consequence for users is that the product is specifically engineered to resist the natural tendency to disengage. Boredom, which has historically been the signal that prompts people to shift their attention to something else, is being systematically eliminated. That elimination has costs.
                    </p>
                </div>
            </section>

            <section aria-labelledby="interruptions-cost" className="w-full mb-16">
                <h2 id="interruptions-cost" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What interruptions actually cost
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    A single notification does not just pause your work. It restructures your entire mental state.
                </p>
                <div className="space-y-4">
                    <p>
                        Gloria Mark, a professor at UC Irvine who has studied workplace interruptions for over two decades, has found that it takes an average of roughly 23 minutes to fully return to a task after an interruption. This is not the time it takes to glance at a notification and look back at your screen. It is the time required to rebuild the mental context, the threads of thought, the working memory load, that sustained work depends on.
                    </p>
                    <p>
                        Her research also found that workers are interrupted, on average, every 3 to 5 minutes, and that many of those interruptions are self-initiated. People reach for their phones not because a notification arrived but because the habit of checking has become reflexive. The interruption and the self-interruption have merged into a continuous pattern of fragmented attention that makes sustained, demanding cognitive work significantly harder to achieve and maintain.
                    </p>
                </div>
            </section>

            <section aria-labelledby="phone-on-desk" className="w-full mb-16">
                <h2 id="phone-on-desk" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The phone on your desk
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    You do not have to be looking at your phone for it to affect your thinking.
                </p>
                <div className="space-y-4">
                    <p>
                        A 2017 study published in the Journal of the Association for Consumer Research (Ward et al.) gave participants a series of cognitive tests while their smartphones were either on the desk face-down, in their pocket or bag, or in a different room. The results were consistent and striking: the group whose phones were in a different room outperformed both other groups on measures of working memory and fluid intelligence.
                    </p>
                    <p>
                        Having the phone on the desk, even silenced and face-down, consumed enough cognitive resources, presumably through the effort of not looking at it, to measurably reduce available mental capacity. The effect was larger for people who reported stronger phone attachment. The implication is uncomfortable: the device does not need to be in your hand to be a source of cognitive load.
                    </p>
                </div>
            </section>

            <section aria-labelledby="media-multitasking" className="w-full mb-16">
                <h2 id="media-multitasking" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Media multitasking and what it trains
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Doing several things at once feels productive. The research suggests it is teaching your brain something counterproductive.
                </p>
                <div className="space-y-4">
                    <p>
                        A landmark 2009 study by Ophir, Nass, and Wagner at Stanford compared heavy media multitaskers to light multitaskers on a battery of cognitive tasks. The expectation was that heavy multitaskers would be better at managing competing information. Instead, they were worse: they were more easily distracted by irrelevant stimuli, less able to filter out information that was not relevant to the current task, and slower to switch efficiently between tasks. The authors noted that heavy multitaskers appeared to be storing more information in working memory but with less organization and control.
                    </p>
                    <p>
                        Subsequent research has largely confirmed this pattern. The concern is not just about performance in the moment. It is that habitual task-switching, the kind trained by constantly moving between apps, notifications, and feeds, may reshape what feels normal and comfortable for the brain. Sustained, single-task focus becomes harder to sustain, and less rewarding, when fragmentation becomes the default mode.
                    </p>
                </div>
            </section>

            <section aria-labelledby="adolescents-attention" className="w-full mb-16">
                <h2 id="adolescents-attention" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Adolescents and the developing attention system
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Sustained attention is a skill the brain builds during adolescence. The conditions it builds that skill in matter.
                </p>
                <div className="space-y-4">
                    <p>
                        The prefrontal cortex, the region most responsible for regulating attention, inhibiting impulses, and sustaining goal-directed behavior, is not fully developed until the mid-twenties. Adolescence is a particularly sensitive period for this development. The habits and cognitive patterns formed during these years are not neutral. They shape the architecture the brain is building.
                    </p>
                    <p>
                        Heavy smartphone and social media use during adolescence introduces a pattern of near-constant switching and short-cycle reward that the developing prefrontal cortex is practicing against. Research on adolescent media use has found associations between heavy use and reduced capacity for sustained attention and complex critical thinking. This does not mean a teenager who uses social media heavily is permanently damaged. Brains are plastic and adaptive. But it does mean that the conditions in which the attention system develops are worth taking seriously.
                    </p>
                </div>
            </section>

            <section aria-labelledby="sustained-attention-purpose" className="w-full mb-16">
                <h2 id="sustained-attention-purpose" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What sustained attention is for
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The ability to focus deeply on one thing for an extended period is not just useful for work. It is connected to meaning, satisfaction, and genuine skill.
                </p>
                <div className="space-y-4">
                    <p>
                        Cal Newport, a computer science professor and author who has written extensively on deep work, argues that the capacity for sustained, uninterrupted concentration is one of the most valuable skills a person can cultivate, and one of the most threatened. The things people report as most meaningful and satisfying, producing something, learning something difficult, being fully present with another person, tend to require the ability to hold attention on one thing long enough for genuine engagement to occur. Shallow, fragmented attention produces shallow, fragmented experience.
                    </p>
                    <p>
                        The good news is that attention is trainable. People who deliberately create conditions for sustained focus, putting the phone in another room, working in sessions without notifications, building a practice of reading physical books, tend to report that the capacity recovers. It does not happen immediately, but it happens faster than most people expect. The <Link href="/help-yourself" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Help yourself page</Link> has practical strategies for making the change stick, and the <Link href="/pledge" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">pledge</Link> is a way to commit to starting.
                    </p>
                </div>
            </section>

            <section aria-labelledby="attention-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="attention-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
                <p>
                    Full citations for every study referenced on this page are available on the{" "}
                    <Link href="/sources" className="underline">Sources page</Link>.{" "}
                    Ready to make a change?{" "}
                    <Link href="/pledge" className="underline">Take the pledge</Link>.
                </p>
            </section>

        </div>
    );
}
