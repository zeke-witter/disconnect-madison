'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase-browser';
import { Field, Input, Label, Button } from '@headlessui/react';

export default function Page() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createBrowserClient();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/add-news');
        router.refresh();
    }

    return (
        <div className="w-full max-w-xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl font-bold mb-8">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Field>
                    <Label className="block mb-1">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                    />
                </Field>
                <Field>
                    <Label className="block mb-1">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        required
                        className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2"
                    />
                </Field>
                <Button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500 disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>
                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}
            </form>
        </div>
    );
}
