import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sleep Disruption",
    description: "How nighttime phone use disrupts sleep, what chronic sleep restriction does to your body and mind, and what changes when you stop scrolling before bed.",
    alternates: { canonical: "/learn/sleep" },
};

const stats = [
    {
        figure: "72%",
        detail: "of U.S. high school students don't get the recommended amount of sleep on school nights",
        source: "CDC, 2023",
    },
    {
        figure: "20–60 min",
        detail: "fewer sleep per night for teens who use devices after lights-out, across multiple large studies",
        source: "Sleep Medicine Reviews, 2015",
    },
    {
        figure: "480 nm",
        detail: "wavelength of blue light most effective at suppressing melatonin production",
        source: "Photochemistry & Photobiology",
    },
    {
        figure: "8–10 hrs",
        detail: "recommended nightly sleep for adolescents; most fall significantly short",
        source: "American Academy of Sleep Medicine",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="sleep-heading" className="w-full mb-4">
                <h1 id="sleep-heading" className="font-handjet text-5xl lg:text-7xl mb-3">
                    Sleep disruption
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    Nighttime phone use doesn&apos;t just cost you sleep. It interferes with some of the most critical maintenance work your body and brain do in a 24-hour cycle. The research on this is consistent, and the path to improvement is one of the clearest in the field.
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

            <section aria-labelledby="sleep-optional" className="w-full mb-16">
                <h2 id="sleep-optional" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Why sleep is not optional
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Sleep is not rest. It is when the brain and body do their most important maintenance work.
                </p>
                <div className="space-y-4">
                    <p>
                        During sleep, the brain consolidates memories from the day, clearing waste products through the glymphatic system. The immune system repairs tissue and mounts defenses. Hormones that regulate hunger, stress, and growth are released. Emotional memories are processed and recontextualized. None of this happens efficiently in waking hours.
                    </p>
                    <p>
                        Chronic sleep deprivation does not just make you tired. It impairs nearly every system in the body. The CDC classifies insufficient sleep as a public health epidemic in the United States. Roughly 1 in 3 adults reports regularly not getting enough sleep. For adolescents, the numbers are worse: 72% of U.S. high schoolers do not meet the recommended 8-10 hours on school nights, according to CDC data.
                    </p>
                </div>
            </section>

            <section aria-labelledby="blue-light" className="w-full mb-16">
                <h2 id="blue-light" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Blue light and the melatonin signal
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Your brain uses light to know when to sleep. Evening phone use sends the wrong signal at the wrong time.
                </p>
                <div className="space-y-4">
                    <p>
                        Melatonin is the hormone that tells your body it is time to sleep. Its production is triggered by darkness and suppressed by light, particularly short-wavelength blue light in the 460-480 nanometer range. Screens emit this wavelength in significant quantities, even at lower brightness settings.
                    </p>
                    <p>
                        A landmark 2014 study in the Proceedings of the National Academy of Sciences found that people who read on light-emitting devices before bed took longer to fall asleep, felt less sleepy at bedtime, and showed suppressed melatonin levels compared to those who read printed books. The effects carried into the next morning: they reported feeling less alert even after a full night&apos;s sleep.
                    </p>
                    <p>
                        The timing matters especially. Melatonin production normally begins 2-3 hours before your natural sleep time. Using a phone during that window can delay the onset of that signal, pushing back the entire sleep cycle. This is called circadian phase delay.
                    </p>
                </div>
            </section>

            <section aria-labelledby="content-problem" className="w-full mb-16">
                <h2 id="content-problem" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The content problem
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Blue light is only part of the issue. What you&apos;re looking at matters as much as the light itself.
                </p>
                <div className="space-y-4">
                    <p>
                        Social media is specifically designed to produce emotional responses. Surprise, amusement, outrage, envy, and anxiety are all more engaging than calm content, and the algorithm knows this. Encountering any of these states in the hour before sleep activates the brain&apos;s arousal systems, counteracting the gradual wind-down that falling asleep requires. Your heart rate rises. Your cortisol levels tick up. Your mind is now processing social information (who said what, who responded, what that person meant) rather than disengaging.
                    </p>
                    <p>
                        This is the content problem, and it is distinct from blue light. You could theoretically use night mode on every device and still experience significant sleep disruption from the same scrolling habit. A book, even a genuinely interesting one, does not typically trigger the same arousal response because it does not carry the social stakes, the unpredictable reward intervals, or the ambient awareness of being connected that social feeds do.
                    </p>
                </div>
            </section>

            <section aria-labelledby="adolescents" className="w-full mb-16">
                <h2 id="adolescents" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Adolescents carry a heavier burden
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Teenagers are not just adults who need more sleep. Their sleep biology is genuinely different, and disrupting it carries distinct consequences.
                </p>
                <div className="space-y-4">
                    <p>
                        Adolescent brains undergo a biological shift during puberty that delays the internal circadian clock, causing teens to feel sleepy later in the evening and to want to sleep later in the morning. This is a physiological reality, not laziness. When school start times demand early waking on top of a delayed sleep phase, teens are already running a structural deficit. Adding social media use to the equation, particularly the late-night social connection that platforms facilitate, amplifies the delay further.
                    </p>
                    <p>
                        A 2015 systematic review in Sleep Medicine Reviews found that screen use before bed was consistently associated with delayed sleep onset, reduced total sleep time, and poorer sleep quality in children and adolescents. The same review found the effects were present across multiple countries and study designs, suggesting the relationship is not an artifact of one cultural context.
                    </p>
                    <p>
                        Sleep is also when adolescent brains consolidate the learning and emotional processing from the day. Cutting it short consistently, across months and years of development, is not benign. It affects academic performance, emotional regulation, risk-taking behavior, and mental health in ways that are harder to attribute directly to the screen use because the sleep deprivation becomes the proximate cause.
                    </p>
                </div>
            </section>

            <section aria-labelledby="feedback-loop" className="w-full mb-16">
                <h2 id="feedback-loop" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The feedback loop
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Poor sleep and heavy social media use reinforce each other. It is harder to break the habit when you&apos;re already depleted.
                </p>
                <div className="space-y-4">
                    <p>
                        Sleep deprivation impairs executive function, including the ability to regulate impulses and make deliberate choices. A tired person is a worse decision-maker. This means that the nights when you most intend to put the phone down are often the nights when you have the least cognitive capacity to follow through.
                    </p>
                    <p>
                        The platforms are also designed to be most compelling when you&apos;re fatigued. Passive, low-effort consumption (scrolling without thinking, watching video after video) is what tired brains default to. The content algorithms learn from this and serve more of whatever kept you on longest. The result is a loop: poor sleep produces the conditions that make heavy use more likely, which worsens sleep, which further reduces the capacity to interrupt the cycle.
                    </p>
                    <p>
                        Research has also found that the relationship runs in both directions. Not only does late-night social media use reduce sleep, but insufficient sleep is associated with increased social media use the following day, possibly as a way to manage low energy and mood. Breaking this loop typically requires a structural change, not just willpower.
                    </p>
                </div>
            </section>

            <section aria-labelledby="what-changes" className="w-full mb-16">
                <h2 id="what-changes" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What changes when you stop
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The research on what improves when people step back from late-night phone use is consistent and encouraging.
                </p>
                <div className="space-y-4">
                    <p>
                        Studies examining phone-free bedtime policies have found improvements in sleep onset time, total sleep duration, and self-reported sleep quality. The changes tend to appear within one to two weeks, not months, because sleep architecture is responsive to the conditions you create relatively quickly.
                    </p>
                    <p>
                        People who remove devices from the bedroom report falling asleep faster and waking less during the night. Some report a gradual shift in their natural sleep and wake timing back toward an earlier, more restorative pattern as the circadian delay resolves.
                    </p>
                    <p>
                        Better sleep compounds: improved mood, lower anxiety, better focus, and more patience are all reliably associated with adequate rest. These are not small effects. For many people, fixing sleep is the most direct path to meaningful improvement in daily functioning, and reducing nighttime phone use is one of the clearest, most evidence-supported ways to start. The <Link href="/help-yourself" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Help yourself page</Link> has practical strategies for making the change stick.
                    </p>
                </div>
            </section>

            <section aria-labelledby="sleep-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="sleep-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
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
