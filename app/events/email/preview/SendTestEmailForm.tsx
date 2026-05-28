'use client';

import { useState } from 'react';
import { sendTestEmailAction } from '@/lib/actions';

export default function SendTestEmailForm({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState('');
    const [isError, setIsError] = useState(false);

    async function handleSend() {
        setSending(true);
        setResult('');
        const fd = new FormData();
        fd.set('eventId', eventId);
        const res = await sendTestEmailAction(fd);
        setSending(false);
        setIsError(!res?.success);
        setResult(res?.message ?? 'Something went wrong.');
        if (res?.success) setTimeout(() => setResult(''), 5000);
    }

    return (
        <div className="flex flex-col items-end gap-1 shrink-0">
            <button
                onClick={handleSend}
                disabled={sending}
                className="rounded-md border border-(--accent-muted) px-4 py-2 text-sm text-(--muted) hover:border-(--foreground) hover:text-(--foreground) transition-colors disabled:opacity-50"
            >
                {sending ? 'Sending...' : 'Send test email'}
            </button>
            {result && (
                <p className={`text-xs ${isError ? 'text-(--accent)' : 'text-(--muted)'}`}>{result}</p>
            )}
        </div>
    );
}
