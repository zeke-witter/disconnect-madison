import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Are we too dependent on our devices?",
    description: "Research on cognitive offloading, the Google Effect, GPS dependency, and how our reliance on devices may be eroding important mental capabilities.",
    alternates: { canonical: "/learn/dependency" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="dependency-heading" className="w-full mb-8">
                <h1 id="dependency-heading" className="font-handjet text-5xl lg:text-7xl font-bold mb-3">
                    Are we too dependent on our devices?
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-4">
                    Do you feel like you&apos;ve gotten worse at remembering things, doing math in your head, navigating without GPS, or thinking through complex problems on your own? You aren&apos;t imagining it.
                </p>
            </section>

            <section aria-labelledby="cognitive-offloading" className="w-full mb-8">
                <h2 id="cognitive-offloading" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    Cognitive offloading: tool or crutch?
                </h2>
                <div className="space-y-4">
                    <p>
                        Humans have always offloaded cognition to external tools, like writing things down, drawing maps, and keeping calendars. These extend our memory and reasoning without diminishing it. This kind of <strong>cognitive offloading</strong> is not inherently harmful. In many cases, it frees up mental capacity for higher-order thinking.
                    </p>
                    <p>
                        The problem researchers are increasingly documenting is different: when devices don&apos;t just assist our thinking, but <em>replace</em> the cognitive practice that builds and maintains mental skills. The atrophy is slow and easy to miss, but it accumulates.
                    </p>
                    <p>
                        A key distinction: using a calculator occasionally is a tool. Losing the ability to do basic arithmetic mentally because you&apos;ve never done it without one is dependency. The question isn&apos;t whether you use technology, it&apos;s whether your brain still works without it.
                    </p>
                </div>
            </section>

            <section aria-labelledby="google-effect" className="w-full mb-16">
                <h2 id="google-effect" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    The Google Effect
                </h2>
                <div className="space-y-4">
                    <p>
                        In 2011, cognitive psychologists Betsy Sparrow, Jenny Liu, and Daniel Wegner published a landmark study in <em>Science</em> documenting what they called the <strong>Google Effect</strong>: when people believe information can be found online, they are significantly less likely to encode it in memory. They remember <em>where</em> to find the answer, not what the answer is.
                    </p>
                    <p>
                        This is a form of <strong>transactive memory</strong>, a strategy of distributing knowledge across a network, remembering who (or what) knows what, rather than the knowledge itself. Humans have always done this with other people. What&apos;s new is the scale and speed of offloading to a device that is always with us.
                    </p>
                    <p>
                        The concern isn&apos;t that any given piece of information is forgotten. It&apos;s the cumulative effect: when we consistently avoid the work of remembering, the mental pathways that support memory consolidation get less exercise. And memory isn&apos;t just storage. It&apos;s the foundation on which reasoning, creativity, and problem-solving are built.
                    </p>
                </div>
            </section>

            <section aria-labelledby="gps" className="w-full mb-16">
                <h2 id="gps" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    Navigation and spatial memory
                </h2>
                <div className="space-y-4">
                    <p>
                        Spatial navigation is one of the oldest and most deeply rooted cognitive functions in the human brain. The hippocampus, a region central to both navigation and memory formation, is one of the areas most affected by chronic GPS dependence.
                    </p>
                    <p>
                        A 2020 study published in <em>Nature Communications</em> by Louisa Dahmani and Véronique Bohbot found that habitual GPS users performed worse on spatial memory tasks and showed lower hippocampal activity during navigation compared to those who navigated independently. The finding wasn&apos;t limited to driving. It reflected a broader reduction in the brain&apos;s capacity for spatial reasoning.
                    </p>
                    <p>
                        The hippocampus also plays a central role in forming episodic memories, our sense of personal history and narrative. Research suggests that chronic GPS reliance may have effects that extend well beyond getting from point A to point B.
                    </p>
                </div>
            </section>

            <section aria-labelledby="phone-presence" className="w-full mb-16">
                <h2 id="phone-presence" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    The cost of just having it nearby
                </h2>
                <div className="space-y-4">
                    <div className="border-l-4 border-(--primary-accent) pl-5">
                        <p className="mb-2">
                            A 2017 study by Adrian Ward and colleagues at the University of Texas found that the <em>mere presence</em> of a smartphone on a desk (silent, face-down, not being used) measurably reduced participants&apos; available working memory and fluid intelligence. The effect was dose-dependent: the more participants relied on their phones in daily life, the greater the cognitive drain from its presence.
                        </p>
                        <p className="text-sm text-(--secondary-accent)">
                            Ward, A.F. et al. <em>Brain Drain: The Mere Presence of One&apos;s Own Smartphone Reduces Available Cognitive Capacity.</em> Journal of the Association for Consumer Research, 2017.
                        </p>
                    </div>
                    <p>
                        The researchers called this &ldquo;brain drain&rdquo;. The phone doesn&apos;t have to be in use to pull your attention. The habit of checking, and the anticipation of checking, occupies mental resources even when you&apos;re trying to focus on something else. The same device is simultaneously a cognitive tool and a cognitive tax.
                    </p>
                </div>
            </section>

            <section aria-labelledby="ai-frontier" className="w-full mb-16">
                <h2 id="ai-frontier" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    AI and the next frontier
                </h2>
                <div className="space-y-4">
                    <p>
                        Smartphones and search engines changed how we store and retrieve information. AI assistants are beginning to change something more fundamental: how we <em>think</em>.
                    </p>
                    <p>
                        When an AI writes your emails, outlines your arguments, summarizes your reading, and answers your questions before you&apos;ve had a chance to sit with them, the cognitive work that used to build those skills simply doesn&apos;t happen. We are in the earliest stages of understanding what this means for human cognition, but the pattern is consistent with what we already know: practice builds capability, and outsourcing eliminates the practice.
                    </p>
                    <p>
                        This is not an argument against AI any more than this site is an argument against technology. <span className="font-bold">It is an argument for intentionality.</span> Being aware of what you&apos;re offloading, and why you&apos;re offloading it, is the first step toward using these tools as amplifiers rather than replacements.
                    </p>
                </div>
            </section>

            <section aria-labelledby="what-to-do" className="w-full mb-16">
                <h2 id="what-to-do" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    What you can do
                </h2>
                <div className="space-y-4">
                    <p>
                        The research points in a consistent direction: the brain responds to practice and atrophies from disuse. The good news is that it also responds to deliberate effort.
                    </p>
                    <p>
                        Simple, concrete habits make a difference. Navigate a familiar route without GPS. Travel somewhere new relying only on road signs or a paper map. Do the mental arithmetic before reaching for a calculator. Sit with a question for a moment before searching. Write something by hand. Read a long piece all the way through without switching tabs.
                    </p>
                    <p>
                        None of this requires rejecting technology. It requires being selective about when you reach for it and making space for your brain to do its own work.
                    </p>
                    <p>
                        If you are looking for more practical strategies, the <Link href="/help-yourself">Help Yourself</Link> page has guidance on reducing screen time and changing habits in a sustainable way. And if you are ready to make a larger change, the <Link href="/pledge">pledge</Link> is a good place to start.
                    </p>
                </div>
            </section>

            <section aria-labelledby="dependency-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="dependency-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
                <p>
                    Full citations for every study referenced on this page are available on the{" "}
                    <Link href="/sources" className="underline">Sources page</Link>.
                </p>
            </section>

        </div>
    );
}
