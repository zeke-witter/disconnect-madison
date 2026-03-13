import { verifyPledgeAction } from '@/lib/actions';
import BadgeShare from '@/app/components/BadgeShare';
import ReferralQuestion from '@/app/components/ReferralQuestion';

const nextSteps = [
    {
        number: '1',
        heading: 'Learn what actually helps',
        body: 'Practical strategies for getting through the first two weeks, changing your environment, and staying off for good.',
        cta: 'Explore the guide',
        href: '/help-yourself',
    },
    {
        number: '2',
        heading: 'Share your story',
        body: "What made you decide to make this change? We'd love to hear your reason, and it might help us tailor our advice to help more people like you.",
        cta: 'Send us a message',
        href: '/contact',
    },
    {
        number: '3',
        heading: 'Spread the word',
        body: "Use your badge or the text snippet above to let people know you've pledged. You might give someone else the courage to do the same.",
        cta: 'See other ways to help',
        href: '/grow',
    },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;

    const result = await verifyPledgeAction(token ?? '');

    return (
        <div className={`flex flex-col items-center w-full mx-auto font-[family-name:var(--font-space-grotesk)] ${result.success ? 'max-w-3xl' : 'max-w-lg'}`}>
            <h1 className="font-handjet text-5xl lg:text-7xl mb-4 text-center">
                {result.success ? 'Pledge Confirmed' : 'Verification Failed'}
            </h1>
            <p className={`text-lg text-center ${result.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                {result.message}
            </p>

            {!result.success && (
                <a
                    href="/pledge"
                    className="mt-6 inline-block text-sm text-(--secondary-accent) hover:text-(--primary-accent) hover:underline"
                >
                    Go back and try again &rarr;
                </a>
            )}

            {result.success && (
                <>
                    {/* Badge — prominent, near the top while excitement is high */}
                    <div id="share" className="w-full mt-10">
                        <BadgeShare pledgeAction={result.pledgeAction ?? ''} />
                    </div>

                    {/* Referral question — low-key, after the main moment */}
                    <div className="w-full mt-10 pt-10 border-t border-(--secondary-accent)/20 text-center">
                        <ReferralQuestion token={token ?? ''} />
                    </div>

                    {/* What's next */}
                    <div className="w-full mt-12">
                        <h2 className="font-handjet text-4xl lg:text-5xl mb-8">What&apos;s next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {nextSteps.map((step) => (
                                <div key={step.number} className="rounded-lg border border-(--secondary-accent) p-6 flex flex-col gap-3">
                                    <span className="font-handjet text-7xl font-bold text-(--primary-accent) leading-none">{step.number}</span>
                                    <h3 className="font-bold text-lg">{step.heading}</h3>
                                    <p className="text-sm text-(--secondary-accent) flex-1">{step.body}</p>
                                    <a href={step.href} className="text-sm font-semibold text-(--primary-accent) hover:underline mt-2">
                                        {step.cta} &rarr;
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <a
                id="button-back-home"
                href="/"
                className="mt-10 mb-8 text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
            >
                &larr; Back to home
            </a>
        </div>
    );
}
