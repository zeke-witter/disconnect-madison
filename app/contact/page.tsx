'use client'

import { useActionState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitContactAction } from '@/lib/actions';
import { Field, Fieldset, Input, Label, Legend, Textarea, Button } from '@headlessui/react';

const initialState = {
    message: '',
    success: false,
};

function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactAction, initialState);
    const searchParams = useSearchParams();
    const defaultName = searchParams.get('name') ?? '';
    const defaultEmail = searchParams.get('email') ?? '';
    const defaultMessage = searchParams.get('message') ?? '';

    const mailtoBody = `I tried to contact you through the website but hit an error.\n\nDevice: (e.g. iPhone 15, Windows laptop)\nBrowser: (e.g. Safari, Chrome, Firefox)\nWhat I was trying to say:\n`;
    const mailtoHref = `mailto:zeke@disconnectmadison.org?subject=${encodeURIComponent('Contact form issue')}&body=${encodeURIComponent(mailtoBody)}`;

    return (
        <form action={formAction} className="w-full">
            <Fieldset className="space-y-6">
                <Legend className="sr-only">Contact form</Legend>

                <Field>
                    <Label className="block font-bold mb-2">Name</Label>
                    <Input
                        name="name"
                        required
                        defaultValue={defaultName}
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                    />
                </Field>

                <Field>
                    <Label className="block font-bold mb-2">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        defaultValue={defaultEmail}
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                    />
                </Field>

                <Field>
                    <Label className="block font-bold mb-2">Message</Label>
                    <Textarea
                        name="message"
                        required
                        rows={6}
                        defaultValue={defaultMessage}
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent) resize-y"
                    />
                </Field>
            </Fieldset>

            <Button
                type="submit"
                disabled={isPending}
                className="mt-8 w-full rounded-md bg-(--primary-accent) px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-(--primary-accent-hover) disabled:opacity-50 font-handjet text-2xl"
            >
                {isPending ? 'Sending...' : 'Send message'}
            </Button>

            {state?.message && (
                <div className="mt-4 text-center">
                    <p className={`font-medium ${state.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                        {state.message}
                    </p>
                    {!state.success && (
                        <a
                            href={mailtoHref}
                            className="mt-2 inline-block text-sm text-(--secondary-accent) hover:text-(--primary-accent) hover:underline"
                        >
                            Try emailing us directly &rarr;
                        </a>
                    )}
                </div>
            )}
        </form>
    );
}

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-2 w-full">Contact</h1>
            <p className="text-(--secondary-accent) mb-4 w-full">
                Have a question, idea, or want to collaborate? Let us know.
            </p>
            <p className="text-(--secondary-accent) mb-10 w-full">
                We&apos;d also love to hear your story about why you decided to step away from social media, what drove that choice, or what changed when you did. <span className="font-bold">Sharing your story helps others find the courage to try.</span>
            </p>

            <Suspense>
                <ContactForm />
            </Suspense>
        </div>
    );
}
