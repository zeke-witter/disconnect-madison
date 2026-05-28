'use client';

import { useState, useCallback } from 'react';
import { getEmailDraftsAction, sendEmailDraftAction, deleteEmailDraftAction } from '@/lib/actions';
import type { EmailDraft } from '@/lib/types';

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function EmailManager({ initialDrafts }: { initialDrafts: EmailDraft[] }) {
    const [drafts, setDrafts] = useState<EmailDraft[]>(initialDrafts);
    const [previewId, setPreviewId] = useState<string | null>(null);
    const [sending, setSending] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const reload = useCallback(async () => {
        const data = await getEmailDraftsAction();
        setDrafts(data);
    }, []);

    async function handleSend(draft: EmailDraft) {
        if (!confirm(`Send "${draft.subject}" to the entire newsletter list? This cannot be undone.`)) return;
        setSending(draft.id);
        setMessage('');
        const fd = new FormData();
        fd.set('id', draft.id);
        const result = await sendEmailDraftAction(fd);
        setSending(null);
        if (result?.success) {
            setIsError(false);
            setMessage(result.message ?? 'Sent.');
            await reload();
        } else {
            setIsError(true);
            setMessage(result?.message ?? 'Something went wrong.');
        }
    }

    async function handleDelete(draft: EmailDraft) {
        if (!confirm(`Delete draft "${draft.subject}"?`)) return;
        const fd = new FormData();
        fd.set('id', draft.id);
        await deleteEmailDraftAction(fd);
        await reload();
    }

    const previewing = previewId ? drafts.find(d => d.id === previewId) : null;

    if (previewing) {
        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-display text-4xl lg:text-5xl">Email preview</h1>
                    <button
                        onClick={() => setPreviewId(null)}
                        className="text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                    >
                        ← Back
                    </button>
                </div>
                <p className="text-sm text-(--secondary-accent) mb-2">Subject: <span className="text-(--foreground)">{previewing.subject}</span></p>
                <div className="rounded-lg border border-(--secondary-accent)/30 overflow-hidden mt-4">
                    <iframe
                        srcDoc={previewing.body_html}
                        title="Email preview"
                        className="w-full h-[600px] bg-white"
                        sandbox="allow-same-origin"
                    />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-4xl lg:text-5xl">Email drafts</h1>
            </div>

            {message && (
                <p className={`text-sm mb-4 ${isError ? 'text-(--primary-accent)' : 'text-emerald-400'}`}>{message}</p>
            )}

            {!process.env.NEXT_PUBLIC_BASE_URL && (
                <div className="mb-6 rounded-md border border-(--secondary-accent)/30 bg-(--secondary-accent)/5 px-4 py-3 text-sm text-(--secondary-accent)">
                    <strong className="text-(--foreground)">RESEND_AUDIENCE_ID required.</strong> Add this env var before sending broadcasts.
                </div>
            )}

            {drafts.length === 0 ? (
                <p className="text-(--secondary-accent)">No drafts yet. Open an event in the editor and click &ldquo;Draft announcement email&rdquo; to create one.</p>
            ) : (
                <div className="divide-y divide-(--secondary-accent)/20">
                    {drafts.map(draft => (
                        <div key={draft.id} className="py-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{draft.subject}</p>
                                    {draft.event_title && (
                                        <p className="text-sm text-(--secondary-accent) mt-0.5">Event: {draft.event_title}</p>
                                    )}
                                    <p className="text-xs text-(--secondary-accent) mt-1">Created {formatDate(draft.created_at)}</p>
                                    {draft.status === 'sent' && draft.sent_at && (
                                        <p className="text-xs text-emerald-400 mt-0.5">Sent {formatDate(draft.sent_at)}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${draft.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-(--secondary-accent)/20 text-(--secondary-accent)'}`}>
                                        {draft.status === 'sent' ? 'Sent' : 'Draft'}
                                    </span>
                                    <button
                                        onClick={() => setPreviewId(draft.id)}
                                        className="text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                                    >
                                        Preview
                                    </button>
                                    {draft.status === 'draft' && (
                                        <button
                                            onClick={() => handleSend(draft)}
                                            disabled={sending === draft.id}
                                            className="text-sm font-medium text-(--primary-color) hover:text-(--foreground) transition-colors disabled:opacity-50"
                                        >
                                            {sending === draft.id ? 'Sending...' : 'Send to list'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(draft)}
                                        className="text-sm text-(--secondary-accent)/60 hover:text-(--primary-accent) transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
