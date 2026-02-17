'use client'

import { useActionState } from 'react';
import { submitContactAction } from '@/lib/actions';
import { Field, Fieldset, Input, Label, Legend, Textarea, Button } from '@headlessui/react';

const initialState = {
    message: '',
    success: false,
};

export default function Page() {
    const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-2 w-full">Contact</h1>
            <p className="text-(--secondary-accent) mb-10 w-full">
                We&apos;re starting small but hoping to grow into something truly impactful. Have a question, idea, or want to collaborate? Send a message below.
            </p>

            <form action={formAction} className="w-full">
                <Fieldset className="space-y-6">
                    <Legend className="sr-only">Contact form</Legend>

                    <Field>
                        <Label className="block font-bold mb-2">Name</Label>
                        <Input
                            name="name"
                            required
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
                            className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                        />
                    </Field>

                    <Field>
                        <Label className="block font-bold mb-2">Message</Label>
                        <Textarea
                            name="message"
                            required
                            rows={6}
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
                    <p className={`mt-4 text-center font-medium ${state.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}
