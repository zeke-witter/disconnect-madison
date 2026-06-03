'use client';

import { useState } from 'react';
import { sendTestEmailAction } from '@/lib/actions';

export default function SendTestEmailForm({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState('');
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState('');

    async function handleSend() {
        setSending(true);
        setResult('');
        const fd = new FormData();
        fd.set('eventId', eventId);
        if (email.trim()) fd.set('testEmail', email.trim());
        const res = await sendTestEmailAction(fd);
        setSending(false);
        setIsError(!res?.success);
        setResult(res?.message ?? 'Something went wrong.');
        if (res?.success) setTimeout(() => setResult(''), 5000);
    }

    return (
        <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="test@example.com"
                    className="rounded-md border border-(--accent-muted) px-3 py-2 text-sm text-(--foreground) bg-transparent placeholder:text-(--muted) focus:outline-none focus:border-(--foreground) transition-colors w-56"
                />
                <button
                    onClick={handleSend}
                    disabled={sending}
                    className="rounded-md border border-(--accent-muted) px-4 py-2 text-sm text-(--muted) hover:border-(--foreground) hover:text-(--foreground) transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                    {sending ? 'Sending...' : 'Send test email'}
                </button>
            </div>
            {result && (
                <p className={`text-xs ${isError ? 'text-(--accent)' : 'text-(--muted)'}`}>{result}</p>
            )}
        </div>
    );
}
