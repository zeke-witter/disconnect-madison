import { verifyPledgeAction } from '@/lib/actions';
import BadgeShare from '@/app/components/BadgeShare';

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;

    const result = await verifyPledgeAction(token ?? '');

    return (
        <div className="flex flex-col items-center min-h-[50vh] max-w-lg mx-auto text-center font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                {result.success ? 'Pledge Confirmed' : 'Verification Failed'}
            </h1>
            <p className={`text-lg ${result.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                {result.message}
            </p>
            {result.success && (
                <>
                    <BadgeShare pledgeAction={result.pledgeAction ?? ''} />
                    <p className="mt-8 text-base text-(--secondary-accent)">
                        Ready to follow through? <a href="/help-yourself" className="underline text-(--primary-color)">Here&apos;s what actually helps.</a>
                    </p>
                    <p className="mt-4 text-base text-(--secondary-accent)">
                        Have a story to share? Whether it&apos;s why you decided to make this change, or what you&apos;ve noticed since stepping away, we&apos;d love to hear it.{' '}
                        <a href="/contact" className="underline text-(--primary-color)">Send us a message.</a>
                    </p>
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
