import Link from "next/link";

const cards = [
    {
        number: '1',
        heading: 'Understand the problem',
        body: 'Read our summary of research findings on how algorithm-driven social media and device dependency affect mental health, attention, and civic life.',
        cta: 'Explore the research',
        href: '/learn',
        emphasis: false,
    },
    {
        number: '2',
        heading: 'Learn how to help yourself',
        body: 'Practical strategies for reducing your screen time, changing your environment, and making the change stick.',
        cta: 'Read the guide',
        href: '/help-yourself',
        emphasis: false,
    },
    {
        number: '3',
        heading: 'Do it for the kids',
        body: "Even if we were heavily influenced, most adults chose to join social media. Kids today were born into it. The research on how it's reshaping their brains and mental health is alarming, and everyone who has young people in their lives should know it.",
        cta: 'Read what the research says about kids',
        href: '/learn/kids',
        emphasis: true,
    },
];

export default function KidsCallout() {
    return (
        <section
            aria-labelledby="explore-heading"
            className="bg-[#1F3D3A] text-[#F6F4EF] -mx-4 sm:-mx-8 lg:-mx-16 px-4 sm:px-8 lg:px-16 py-14 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)]"
        >
            <h2
                id="explore-heading"
                className="font-handjet text-4xl lg:text-5xl font-bold mb-8"
            >
                What&apos;s next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.number}
                        className={`rounded-lg p-6 flex flex-col gap-3 border ${card.emphasis
                            ? 'border-white/30 bg-white/10'
                            : 'border-white/15 bg-white/5'
                            }`}
                    >
                        <span className={`font-handjet text-7xl font-bold leading-none ${card.emphasis ? 'text-white/70' : 'text-white/40'}`}>
                            {card.number}
                        </span>
                        <h3 className="font-bold text-lg">{card.heading}</h3>
                        <p className="text-sm text-white/70 flex-1">{card.body}</p>
                        <Link
                            href={card.href}
                            className="text-sm font-semibold mt-2 !text-[#F6F4EF] hover:!text-white hover:underline"
                        >
                            {card.cta} &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
