import Link from 'next/link';
import { exercises } from './exercises';
import BreathingExerciseClient from './BreathingExerciseClient';
import GroundingExercise from './GroundingExercise';
import Reminders from './Reminders';

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

            <section aria-label="Breathing exercises" className="mb-16">
                <BreathingExerciseClient exercises={exercises} />
            </section>

            <section aria-labelledby="grounding-heading" className="w-full border-t border-(--secondary-accent)/20 pt-10 mb-16">
                <h2 id="grounding-heading" className="font-handjet text-4xl lg:text-5xl mb-2">Ground yourself</h2>
                <p className="text-(--secondary-accent) text-sm mb-8">
                    The 5-4-3-2-1 technique. One tap per thing you notice.
                </p>
                <GroundingExercise />
            </section>

            <section aria-labelledby="reminders-heading" className="w-full border-t border-(--secondary-accent)/20 pt-10 mb-16">
                <h2 id="reminders-heading" className="font-handjet text-4xl lg:text-5xl mb-8">Worth remembering</h2>
                <Reminders />
            </section>

            <p className="text-sm text-(--secondary-accent) border-t border-(--secondary-accent)/30 pt-6">
                Looking for more ways to reclaim your attention?{' '}
                <Link href="/help-yourself">Read the practical guide</Link>.
            </p>
        </div>
    );
}
