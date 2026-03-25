'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { addNewsArticleAction } from '@/lib/actions';
import { Field, Input, Label, Button } from '@headlessui/react';

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {pending ? 'Working...' : label}
        </Button>
    );
}

const initialState = {
    message: '',
    success: false,
};

export default function Page() {
    const [state, formAction] = useActionState(addNewsArticleAction, initialState);

    return (
        <div className="w-full max-w-xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl mb-8">Add news article</h1>
            <form action={formAction} className="space-y-6">
                <Field>
                    <Label className="block mb-1">Article URL</Label>
                    <Input
                        name="url"
                        type="url"
                        required
                        defaultValue={(state as any)?.url ?? ''}
                        placeholder="https://..."
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                    />
                </Field>

                {(state as any)?.needsManual && (
                    <>
                        <p className="text-sm text-(--secondary-accent)">{state.message}</p>
                        <Field>
                            <Label className="block mb-1">Title</Label>
                            <Input
                                name="manualTitle"
                                type="text"
                                required
                                defaultValue={(state as any)?.title ?? ''}
                                className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                            />
                        </Field>
                        <Field>
                            <Label className="block mb-1">Image URL</Label>
                            <Input
                                name="manualImageUrl"
                                type="url"
                                required
                                placeholder="https://..."
                                className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                            />
                        </Field>
                    </>
                )}

                <SubmitButton label={(state as any)?.needsManual ? 'Add manually' : 'Add article'} />

                {state?.message && !(state as any)?.needsManual && (
                    <p style={{ color: state.success ? 'green' : 'red' }}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}
