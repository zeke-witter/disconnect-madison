import type { Metadata } from "next";
import Link from "next/link";
import { PlatformUsageChart, TeenDepressionChart } from "./ChartsWrapper";

export const metadata: Metadata = {
    title: "What Social Media Is Doing to Kids",
    description: "Research-backed findings on how social media is reshaping brain development, mental health, and wellbeing in children and adolescents.",
    alternates: { canonical: "/learn/kids" },
};

const stats = [
    {
        figure: "95%",
        detail: "of American teens use social media",
        source: "Pew Research, 2023",
    },
    {
        figure: "1 in 3",
        detail: "teens say they use it 'almost constantly'",
        source: "Pew Research, 2023",
    },
    {
        figure: "3 in 4",
        detail: "high schoolers use social media several times a day",
        source: "CDC, 2024",
    },
    {
        figure: "~40%",
        detail: "of children ages 8–12 are on platforms with a minimum age of 13",
        source: "Common Sense Media",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="kids-heading" className="w-full mb-4">
                <h1 id="kids-heading" className="font-handjet text-5xl lg:text-7xl font-bold mb-3">
                    What it&apos;s doing to kids
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    Most adults chose to join social media. Children didn&apos;t. And the research on how it&apos;s affecting them is alarming.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map(({ figure, detail, source }) => (
                        <div key={figure} className="border border-(--secondary-accent) rounded-md p-5 flex flex-col gap-2">
                            <span className="font-handjet text-5xl font-bold text-(--primary-accent) leading-none">{figure}</span>
                            <span className="text-sm font-medium text-(--primary-color) leading-snug">{detail}</span>
                            <span className="text-xs text-(--secondary-accent) mt-auto">{source}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="platform-reach" className="w-full mb-16">
                <h2 id="platform-reach" className="font-handjet text-4xl lg:text-5xl font-bold mb-3">
                    Which platforms are they on?
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Percentage of American teenagers who use each platform, as of 2023.
                </p>
                <PlatformUsageChart />
                <p className="text-xs text-(--secondary-accent) mt-3 text-right">
                    Source: Pew Research Center, &ldquo;Teens, Social Media and Technology 2023&rdquo;
                </p>
            </section>

            <section aria-labelledby="experts" className="w-full mb-16">
                <h2 id="experts" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    What experts say
                </h2>
                <div className="space-y-6">
                    <div className="border-l-4 border-(--primary-accent) pl-5">
                        <p className="mb-2">
                            In 2023, the <strong>U.S. Surgeon General</strong> issued a formal advisory warning that social media poses a &ldquo;profound risk of harm&rdquo; to children and adolescents. The advisory called for health warning labels on social media platforms &mdash; the same mechanism used to communicate risks on tobacco and alcohol.
                        </p>
                        <p className="text-sm text-(--secondary-accent)">
                            <em>Social Media and Youth Mental Health: The U.S. Surgeon General&apos;s Advisory</em>, 2023. [<a href="https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf" target="_blank" rel="noopener noreferrer" className="underline">PDF</a>]
                        </p>
                    </div>
                    <div className="border-l-4 border-(--primary-accent) pl-5">
                        <p className="mb-2">
                            The <strong>American Psychological Association</strong> issued its own health advisory in 2023 recommending that social media use by children under 14 be limited, and that minors have access to platforms only with appropriate safeguards &mdash; including parental monitoring, content filters, and protection from harmful recommendations.
                        </p>
                        <p className="text-sm text-(--secondary-accent)">
                            <em>Health Advisory on Social Media Use in Adolescence</em>, APA, 2023. [<a href="https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use.pdf" target="_blank" rel="noopener noreferrer" className="underline">PDF</a>]
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="mental-health" className="w-full mb-16">
                <h2 id="mental-health" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    Mental health and suicide risk
                </h2>
                <div className="space-y-4 mb-10">
                    <p>
                        In 2024 the CDC published its first national survey of teen social media use, based on the Youth Risk Behavior Survey. Among its findings: teens who used social media frequently were significantly more likely to report being bullied, experiencing persistent sadness or hopelessness, and having seriously considered suicide.
                    </p>
                    <p>
                        A 2024 review in <em>JAMA Network Open</em> found consistent associations between social media use and suicide risk in youth across multiple study designs and populations. A large nationwide study published in <em>Scientific Reports</em> in 2023 found a dose-response relationship between time spent on social media and self-harm among adolescents &mdash; meaning more time correlated with greater risk.
                    </p>
                    <p>
                        A 2018 analysis in <em>Clinical Psychological Science</em> documented a sharp rise in depressive symptoms, suicide-related outcomes, and suicide rates among U.S. adolescents beginning around 2012 &mdash; the same period when smartphone ownership and social media use became widespread in that age group.
                    </p>
                </div>

                <h3 className="font-bold text-lg mb-3 text-(--primary-color)">
                    Share of high schoolers reporting persistent sadness or hopelessness
                </h3>
                <TeenDepressionChart />
                <p className="text-xs text-(--secondary-accent) mt-3 text-right">
                    Source: CDC Youth Risk Behavior Survey (YRBS), 2009&ndash;2023
                </p>
            </section>

            <section aria-labelledby="brain" className="w-full mb-16">
                <h2 id="brain" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    Risks to brain development
                </h2>
                <div className="space-y-4">
                    <p>
                        Adolescence is a critical window for brain development &mdash; a period when the neural circuits governing emotion, identity, and social behavior are still being formed. Social media enters that window as a constant source of social feedback: likes, comments, shares, and the fear of missing out.
                    </p>
                    <p>
                        A three-year brain imaging study published in <em>JAMA Pediatrics</em> in 2023 found that adolescents who checked social media more than fifteen times a day showed measurable changes in brain structure over time &mdash; specifically, increased neural sensitivity to social rewards and punishments. The brains of heavy users were becoming more reactive to the feedback loop, not less.
                    </p>
                    <p>
                        A 2022 study in <em>Nature Communications</em> identified specific developmental windows &mdash; particularly ages 10&ndash;12 and 14&ndash;15 &mdash; when the impact of social media on mental health is most acute. These are ages when many children are just beginning to use these platforms.
                    </p>
                    <p>
                        A separate <em>Nature Communications</em> study from 2018 found that higher social media use in early adolescence predicted lower life satisfaction scores one year later &mdash; and that the reverse was not true. The platforms drive the outcome; the outcome does not drive the use.
                    </p>
                </div>
            </section>

            <section aria-labelledby="what-to-do" className="w-full mb-16">
                <h2 id="what-to-do" className="font-handjet text-4xl lg:text-5xl font-bold mb-6">
                    What you can do
                </h2>
                <div className="space-y-4">
                    <p>
                        If you have children in your life, the most direct thing you can do is reduce social media&apos;s role in your household &mdash; and model that behavior yourself. Research consistently shows that parental attitudes and habits around screens are among the strongest predictors of children&apos;s own habits.
                    </p>
                    <p>
                        If you don&apos;t have children, your choices still matter. A culture in which adults treat social media as normal and unavoidable makes it harder for young people to opt out. Every person who steps away changes that calculus a little.
                    </p>
                    <p>
                        <Link href="/pledge" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Take the pledge</Link> &mdash; reduce your use, step away, or quit for good. And if you know a young person who is struggling with social media, share what you&apos;ve learned here.
                    </p>
                </div>
            </section>

            <section aria-labelledby="kids-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="kids-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
                <p>
                    Full citations for every study referenced on this page are available on the{" "}
                    <Link href="/sources" className="underline">Sources page</Link>.
                </p>
            </section>

        </div>
    );
}
