import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Body Image & Self-Perception",
    description: "What the research shows about image-focused social media platforms, body dissatisfaction, and how algorithmic amplification makes it worse.",
    alternates: { canonical: "/learn/body-image" },
};

const stats = [
    {
        figure: "1 in 3",
        detail: "teenage girls for whom Instagram made body image issues worse, according to Facebook's own internal research",
        source: "Facebook internal, via WSJ 2021",
    },
    {
        figure: "20",
        detail: "studies reviewed in a 2016 systematic analysis, all finding consistent links between social media use and body image concerns",
        source: "Body Image, 2016",
    },
    {
        figure: "32%",
        detail: "of teen girls who said that when they felt bad about their bodies, Instagram made them feel worse",
        source: "Facebook internal, via WSJ 2021",
    },
    {
        figure: "13–15",
        detail: "age range at which girls show the strongest vulnerability to appearance-related social comparison on social media",
        source: "Nature Communications, 2022",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="body-image-heading" className="w-full mb-4">
                <h1 id="body-image-heading" className="font-handjet text-5xl lg:text-7xl mb-3">
                    Body image &amp; self-perception
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    Image-focused platforms are designed to surface content that captures attention. The body image research, including the companies&apos; own internal findings, shows what that design produces at scale.
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

            <section aria-labelledby="internal-research" className="w-full mb-16">
                <h2 id="internal-research" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What internal research revealed
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The most damning evidence about Instagram&apos;s effects on body image did not come from academics. It came from the company itself.
                </p>
                <div className="space-y-4">
                    <p>
                        In September 2021, the Wall Street Journal published internal Facebook research documents showing that the company&apos;s own researchers had identified significant body image harms from Instagram, particularly for teenage girls. According to the documents, 32% of teen girls said that when they felt bad about their bodies, Instagram made them feel worse. Researchers at Facebook found that Instagram was worse than other social media platforms for body image issues and was associated with higher rates of anxiety and depression related to appearance.
                    </p>
                    <p>
                        The company had this information internally for years. Executives testified before Congress in 2021 while these findings were known internally. The significance of this evidence is that it removes the argument that the harms are speculative or academically contested. The company that built the product, with access to its own user data at massive scale, concluded that it was causing measurable harm. That is a different standard of evidence than an external survey.
                    </p>
                </div>
            </section>

            <section aria-labelledby="how-platforms-work-against-you" className="w-full mb-16">
                <h2 id="how-platforms-work-against-you" className="font-handjet text-4xl lg:text-5xl mb-3">
                    How image platforms work against you
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Body dissatisfaction from social media is not an accident or a side effect. It is an output of how the platforms are designed to operate.
                </p>
                <div className="space-y-4">
                    <p>
                        Image-heavy platforms like Instagram and TikTok are built around visual content that is selected and amplified based on engagement. Content that generates strong reactions, including envy, aspiration, and comparison, tends to perform well in algorithmic ranking. This creates a systematic bias toward idealized, edited, and filtered representations of bodies and faces. The average user sees a stream that has been optimized, through billions of decisions, to surface appearance content that captures attention, which is not representative of the actual population but is highly effective at triggering social comparison.
                    </p>
                    <p>
                        Filters and editing tools amplify this further. A 2021 study found that exposure to digitally altered images increased body dissatisfaction even when participants were explicitly told the images had been retouched. The awareness of editing does not reliably neutralize the comparison response. The brain processes visual social information in ways that are not fully mediated by conscious knowledge.
                    </p>
                </div>
            </section>

            <section aria-labelledby="social-comparison" className="w-full mb-16">
                <h2 id="social-comparison" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Social comparison theory
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Humans are wired to evaluate themselves relative to others. Social media provides an unprecedented volume of comparison targets, almost all of them curated to appear better than average.
                </p>
                <div className="space-y-4">
                    <p>
                        Social comparison theory, first proposed by Leon Festinger in 1954, holds that people have a drive to evaluate their opinions and abilities by comparing themselves to others. When direct, objective measures are unavailable, we use social reference points. In everyday life, these reference points come from the people around us, a more or less representative sample of the population. On social media, the reference points are algorithmically selected for engagement.
                    </p>
                    <p>
                        The result is a systematic upward comparison: you are comparing yourself to a filtered, edited, strategically presented version of others, rather than to a realistic cross-section. Research has consistently found that upward social comparison is associated with lower self-esteem, increased body dissatisfaction, and worse mood. The sheer volume of comparisons available on a social media platform, hundreds or thousands per scrolling session, compounds this effect in ways that have no precedent in human social experience.
                    </p>
                </div>
            </section>

            <section aria-labelledby="window-of-vulnerability" className="w-full mb-16">
                <h2 id="window-of-vulnerability" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The window of vulnerability
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The effects are present across age groups, but they are most pronounced during a specific developmental window.
                </p>
                <div className="space-y-4">
                    <p>
                        A 2022 study in Nature Communications that analyzed data from large cohorts in the UK found that the association between social media use and well-being was strongest for girls at ages 11 to 13 and boys at 14 to 15, periods corresponding to early and mid-adolescence respectively. Outside these windows, the associations were weaker or absent.
                    </p>
                    <p>
                        This finding is consistent with what is known about puberty and identity formation: these are the years when appearance, peer evaluation, and social belonging become salient concerns, and when the self-concept is most actively being constructed. Introducing a comparison-maximizing platform during this window is not a neutral act. It is intervention into a developmental process at its most sensitive point. This is one of the reasons that age restrictions on social media platforms have gained attention from researchers, pediatricians, and legislators, not because the harms disappear after adolescence, but because the window of peak vulnerability is specific and identifiable.
                    </p>
                </div>
            </section>

            <section aria-labelledby="boys-and-research-gap" className="w-full mb-16">
                <h2 id="boys-and-research-gap" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Beyond girls: boys and the research gap
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The conversation about body image and social media has focused heavily on girls. Boys are also affected, and the research is catching up.
                </p>
                <div className="space-y-4">
                    <p>
                        The body image literature has historically focused on women and girls, and the evidence for social media harms is most developed for that population. But the assumption that boys are largely unaffected is not well-supported. Research has found that adolescent and young adult males who frequently view fitness content, bodybuilding accounts, and physique-focused material on social media show elevated rates of body dissatisfaction, drive for muscularity, and muscle dysmorphia, a form of body dysmorphia characterized by the belief that one is insufficiently muscular.
                    </p>
                    <p>
                        A 2019 study found that exposure to muscular ideal imagery on Instagram produced immediate increases in body dissatisfaction and negative mood in young men. The mechanisms are similar to those documented in girls: idealized imagery, upward comparison, and algorithmic amplification of appearance-focused content. The harms are different in their content (thinness vs. muscularity as the idealized direction) but not in their structure.
                    </p>
                </div>
            </section>

            <section aria-labelledby="filters-and-reality-gap" className="w-full mb-16">
                <h2 id="filters-and-reality-gap" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Filters, editing, and the reality gap
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    A significant portion of what people see on social media is not real. The gap between the presented image and reality is a structural feature of the medium.
                </p>
                <div className="space-y-4">
                    <p>
                        Image editing has always existed, but social media has made it ubiquitous, real-time, and available to everyone. The built-in filters and editing tools on Instagram, TikTok, and Snapchat allow users to smooth skin, reshape facial features, alter body proportions, and enhance lighting, often in ways that are not obviously detectable as edited. Research has found that beauty filter use is associated with increased body dissatisfaction, more negative self-evaluation, and greater consideration of cosmetic procedures among young women.
                    </p>
                    <p>
                        A troubling downstream effect is that the prevalence of filtered images has begun to shift what people perceive as the baseline standard of appearance. Dermatologists and cosmetic surgeons have noted patients bringing in filtered selfies as reference images for procedures, requesting that their actual faces look like their filtered versions. This is a qualitatively new kind of appearance pressure, and it is being driven by platform design decisions that treat appearance modification as a default feature rather than an exceptional intervention. The <Link href="/help-yourself" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Help yourself page</Link> has practical strategies for stepping back, and the <Link href="/pledge" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">pledge</Link> is a way to commit to starting.
                    </p>
                </div>
            </section>

            <section aria-labelledby="body-image-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="body-image-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
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
