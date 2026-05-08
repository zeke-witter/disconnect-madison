import Link from 'next/link';
import { getEmailDraftsAction } from '@/lib/actions';
import LogoutButton from '@/app/components/LogoutButton';
import EmailManager from './EmailManager';

export default async function EmailPage() {
    const drafts = await getEmailDraftsAction();

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 font-[family-name:var(--font-space-grotesk)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-(--secondary-accent)/20">
                <div className="flex items-center gap-4">
                    <Link
                        href="/events/add"
                        className="text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                    >
                        ← Events
                    </Link>
                    <Link
                        href="/events/email/preview"
                        className="text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                    >
                        Preview template
                    </Link>
                </div>
                <LogoutButton />
            </div>
            <EmailManager initialDrafts={drafts} />
        </div>
    );
}
