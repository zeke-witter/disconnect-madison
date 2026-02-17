'use client';

import { useActionState } from 'react';
import { addNewsArticleAction } from '@/lib/actions';
import { Field, Input, Label, Button } from '@headlessui/react';

const initialState = {
    message: '',
    success: false,
};

export default function Page() {
    const [state, formAction] = useActionState(addNewsArticleAction, initialState);

    return (
        <div className="w-full max-w-xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl font-bold mb-8">Add news article</h1>
            <form action={formAction} className="space-y-6">
                <Field>
                    <Label className="block mb-1">Article URL</Label>
                    <Input
                        name="url"
                        type="url"
                        required
                        placeholder="https://..."
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                    />
                </Field>
                <Button
                    type="submit"
                    className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500"
                >
                    Add article
                </Button>
                {state?.message && (
                    <p style={{ color: state.success ? 'green' : 'red' }}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
}
