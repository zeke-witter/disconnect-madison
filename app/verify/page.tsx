import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams;

    let result: { success: boolean; message: string };

    if (!token) {
        result = { success: false, message: 'Invalid verification link.' };
    } else {
        const { data, error } = await supabase
            .from('pledges')
            .update({ confirmed: true })
            .eq('verification_token', token)
            .eq('confirmed', false)
            .select();

        if (error) {
            console.error('Supabase update error:', error);
            result = { success: false, message: 'Something went wrong. Please try again.' };
        } else if (!data || data.length === 0) {
            result = { success: false, message: 'This link is invalid or your pledge has already been confirmed.' };
        } else {
            revalidatePath('/');
            result = { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!' };
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-lg mx-auto text-center font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                {result.success ? 'Pledge Confirmed' : 'Verification Failed'}
            </h1>
            <p className={`text-lg ${result.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                {result.message}
            </p>
            <a
                href="/"
                className="mt-8 inline-block rounded-md bg-(--primary-accent) px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-(--primary-accent-hover) font-handjet text-2xl"
            >
                Back to home
            </a>
        </div>
    );
}
