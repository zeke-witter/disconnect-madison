import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Depression & Anxiety",
    description: "What clinical research actually shows about social media and mental health, who is most affected, and what improves when people step back.",
    alternates: { canonical: "/learn/depression" },
};

const stats = [
    {
        figure: "3 wks",
        detail: "timeframe in which limiting social media to 30 minutes per day produced significant reductions in depression and loneliness",
        source: "Hunt et al., JSCP 2018",
    },
    {
        figure: "2–3×",
        detail: "higher odds of depression in heavy social media users compared to non-users in large population studies",
        source: "Multiple studies",
    },
    {
        figure: "2012",
        detail: "approximate year when rates of teen depression, anxiety, and self-harm began rising sharply in the U.S., coinciding with widespread smartphone adoption",
        source: "Twenge et al., 2018",
    },
    {
        figure: "30 min",
        detail: "daily social media limit used in the Hunt et al. experiment, roughly a quarter of average teen usage",
        source: "Hunt et al., JSCP 2018",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="depression-heading" className="w-full mb-4">
                <h1 id="depression-heading" className="font-handjet text-5xl lg:text-7xl mb-3">
                    Depression &amp; anxiety
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    The research on social media and mental health is contested in the details but consistent in the direction. This page walks through what the evidence actually shows, who is most affected, and what tends to improve when people step back.
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

            <section aria-labelledby="correlation-question" className="w-full mb-16">
                <h2 id="correlation-question" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The correlation question
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The debate about whether social media causes depression or depressed people simply use it more has real implications, but it should not be used to dismiss the evidence.
                </p>
                <div className="space-y-4">
                    <p>
                        This is the most contested area in the research, and intellectual honesty requires acknowledging the debate. Many studies on social media and depression are observational: they find associations but cannot prove causation. Critics correctly point out that people who are already struggling may turn to social media more, which would produce a correlation without a direct causal mechanism running from use to depression. This is a legitimate methodological concern.
                    </p>
                    <p>
                        However, the evidence has grown beyond simple correlation. Randomized controlled experiments, in which participants are assigned to reduce their social media use, have found that the reduction produces improvements in mental health outcomes. That design controls for pre-existing differences. The 2018 Hunt et al. study at the University of Pennsylvania is the most-cited example: participants who limited Instagram, Facebook, and Snapchat to 10 minutes per platform per day for three weeks showed significant reductions in depression and loneliness compared to a control group.
                    </p>
                    <p>
                        Longitudinal studies, following the same individuals over time, have also found that increases in social media use precede increases in depressive symptoms rather than the reverse, which is more consistent with a causal direction. The picture is not simple, but the evidence points more strongly toward genuine effect than the &ldquo;correlation only&rdquo; critique allows.
                    </p>
                </div>
            </section>

            <section aria-labelledby="changed-around-2012" className="w-full mb-16">
                <h2 id="changed-around-2012" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What changed around 2012
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Teen mental health worsened significantly during the 2010s. Understanding when and how is central to evaluating the role of social media.
                </p>
                <div className="space-y-4">
                    <p>
                        Jean Twenge, a psychologist at San Diego State University, has documented a striking shift in adolescent mental health indicators in the United States beginning around 2012 to 2013. Rates of depression, anxiety, loneliness, and self-harm began rising, particularly among adolescent girls, after years of relative stability or even improvement. The timing corresponds closely with the widespread adoption of smartphones and the rise of Instagram in particular.
                    </p>
                    <p>
                        Twenge and her colleagues have published multiple analyses of large datasets showing these trends. The research is not without critics: some argue the effect sizes are small and that other factors (economic stress, academic pressure, changing diagnostic practices) account for much of the shift. Twenge&apos;s response has been that the timing and the demographic specificity, the effects are stronger for girls, stronger for heavier users, and weaker or absent for moderate users, make a coincidence explanation unlikely. The debate is ongoing among researchers. What is clear is that something changed for adolescent mental health in that period, and identifying what it was matters.
                    </p>
                </div>
            </section>

            <section aria-labelledby="passive-vs-active" className="w-full mb-16">
                <h2 id="passive-vs-active" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Passive use vs. active use
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Not all social media use is equally harmful. How you use it matters, sometimes as much as how much.
                </p>
                <div className="space-y-4">
                    <p>
                        A consistent finding across the literature is that passive consumption, scrolling, viewing others&apos; posts without interacting, and browsing without contributing, is more strongly associated with negative mental health outcomes than active use, such as messaging friends directly, commenting, or posting your own content. The proposed mechanism involves social comparison: passive scrolling exposes you to a curated stream of other people&apos;s highlights without the reciprocal social context that in-person or direct communication provides.
                    </p>
                    <p>
                        You see the vacation, the relationship milestone, the achievement, without the behind-the-scenes reality that would normally contextualize it. Active use, particularly direct communication with close connections, more closely resembles the kind of social interaction that tends to support well-being. This finding does not mean that active use is without risk, but it suggests that the platform designs that maximize passive consumption, infinite scroll, autoplay, algorithmic feeds over chronological ones, are specifically the features most associated with harm.
                    </p>
                </div>
            </section>

            <section aria-labelledby="who-most-affected" className="w-full mb-16">
                <h2 id="who-most-affected" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Who is most affected
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The effects are not evenly distributed. Age and gender are the most consistent predictors of vulnerability.
                </p>
                <div className="space-y-4">
                    <p>
                        The research consistently finds that adolescent girls are more affected than boys, and more affected than adult women. The reasons proposed include a greater tendency toward social comparison, higher sensitivity to social evaluation and peer rejection during adolescence, and the particular nature of image-focused platforms where appearance-based comparison is central. Twenge&apos;s analyses of large datasets have found that the gender gap in depression opened up during the same period as widespread social media adoption, and that it is larger in countries with higher rates of social media use.
                    </p>
                    <p>
                        This does not mean adult men are unaffected. Studies have found associations between heavy social media use and depression in adult males as well, particularly around social comparison related to status and achievement. But the dose-response relationship appears steeper, and the threshold lower, for adolescent girls. Understanding this heterogeneity matters for thinking about interventions. A blanket claim that social media affects everyone equally, or that it affects no one meaningfully, both miss the specificity the data actually shows.
                    </p>
                </div>
            </section>

            <section aria-labelledby="anxiety-dimension" className="w-full mb-16">
                <h2 id="anxiety-dimension" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The anxiety dimension
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Anxiety and depression are distinct conditions, but social media appears to worsen both through overlapping mechanisms.
                </p>
                <div className="space-y-4">
                    <p>
                        Social anxiety and general anxiety disorders have also been linked to heavy social media use, through several mechanisms. Fear of missing out (FOMO), the persistent worry that others are having experiences you are not part of, is activated by seeing the continuous stream of social activity that platforms surface. The always-on nature of social media also creates a kind of ambient social monitoring: you are implicitly aware of what others are doing, who is posting, who responded to whom, even when you are not actively checking. This low-grade vigilance has a cost. It keeps the nervous system in a mild state of social alertness that is incompatible with genuine relaxation.
                    </p>
                    <p>
                        Notification anxiety, the conditioned anticipation of checking and the discomfort of not checking, also overlaps with generalized anxiety patterns. Several studies have found that simply turning off notifications reduces anxiety measures, independent of changes in overall usage time.
                    </p>
                </div>
            </section>

            <section aria-labelledby="what-improves" className="w-full mb-16">
                <h2 id="what-improves" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What improves when you step back
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The same experimental designs that established the relationship between use and depression also show what happens on the other side.
                </p>
                <div className="space-y-4">
                    <p>
                        The Hunt et al. study found meaningful reductions in depression and loneliness after just three weeks of limited use. Other randomized trials have found similar results, and the improvements tend to be larger for participants who started with higher baseline distress. A 2020 study published in the American Economic Review (Allcott et al.) randomly assigned some Facebook users to deactivate their accounts for four weeks before the 2018 U.S. midterm elections. Deactivating Facebook reduced online activity and increased offline activities, and participants reported higher subjective well-being at the end of the period.
                    </p>
                    <p>
                        These findings do not mean stepping back is easy, or that the improvements are permanent without continued behavior change. But they do suggest that the relationship is responsive: reduce the exposure, and the mental health indicators tend to follow. The <Link href="/help-yourself" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Help yourself page</Link> has practical strategies for making the change, and the <Link href="/pledge" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">pledge</Link> is a way to commit to starting.
                    </p>
                </div>
            </section>

            <section aria-labelledby="depression-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="depression-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
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
