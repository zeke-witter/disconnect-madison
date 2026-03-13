import Link from 'next/link';
import { exercises } from './exercises';
import BreathingExerciseClient from './BreathingExerciseClient';

export default function BreathePage() {
    return (
        <div className="w-full max-w-2xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section className="mb-10">
                <h1 className="font-handjet text-5xl lg:text-7xl mb-4">Breathe</h1>
                <p className="text-(--secondary-accent) text-lg leading-relaxed">
                    Small tools to help you step out of the feed and back into your body.
                    Start with a breath.
                </p>
            </section>

            <section aria-label="Breathing exercises" className="mb-12">
                <BreathingExerciseClient exercises={exercises} />
            </section>

            <p className="text-sm text-(--secondary-accent) border-t border-(--secondary-accent)/30 pt-6">
                Looking for more ways to reclaim your attention?{' '}
                <Link href="/help-yourself">Read the practical guide</Link>.
            </p>
        </div>
    );
}
