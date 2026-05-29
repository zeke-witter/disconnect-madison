'use client';

import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase-browser';

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createBrowserClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="rounded-md border border-(--accent-muted) px-4 py-2 text-sm text-(--muted) hover:border-(--accent-muted) hover:text-(--muted) transition-colors cursor-pointer"
        >
            Log out
        </button>
    );
}
