import { verifyPledgeAction } from '@/lib/actions';
import BadgeShare from '@/app/components/BadgeShare';

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
        body: 'Use your badge or the text snippet below to let people know you\'ve pledged. You might give someone else the courage to do the same.',
        cta: 'See your badge below',
        href: '#share',
    },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;

    const result = await verifyPledgeAction(token ?? '');

    return (
        <div className={`flex flex-col items-center min-h-[50vh] mx-auto text-center font-[family-name:var(--font-space-grotesk)] ${result.success ? 'max-w-4xl' : 'max-w-lg'}`}>
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                {result.success ? 'Pledge Confirmed' : 'Verification Failed'}
            </h1>
            <p className={`text-lg ${result.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                {result.message}
            </p>

            {result.success && (
                <>
                    <div className="w-full mt-12">
                        <h2 className="font-handjet text-4xl lg:text-5xl font-bold mb-8 text-left">What&apos;s next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {nextSteps.map((step) => (
                                <div key={step.number} className="rounded-lg border border-(--secondary-accent) p-6 text-left flex flex-col gap-3">
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

                    <div id="share" className="w-full mt-12">
                        <BadgeShare pledgeAction={result.pledgeAction ?? ''} />
                    </div>
                </>
            )}

            <a
                id="button-back-home"
                href="/"
                className="mt-8 mb-8 inline-block rounded-md bg-(--primary-accent) px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-(--primary-accent-hover) font-handjet text-2xl"
            >
                Back to home
            </a>
        </div>
    );
}
