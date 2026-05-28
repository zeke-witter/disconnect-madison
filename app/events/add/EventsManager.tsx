'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import { getAllEventsAction, saveEventAction, deleteEventAction, createEventEmailDraftAction } from '@/lib/actions';
import type { EventRow } from '@/lib/types';

marked.use({ breaks: true, gfm: true });

type Mode = 'list' | 'create' | 'edit';

const EMPTY_FORM = {
    id: '',
    title: '',
    date: '',
    end_date: '',
    location_name: '',
    location_address: '',
    description: '',
    capacity: '',
    registration_required: false,
    cover_image_url: '',
    published: false,
};

function formatDateShort(dateStr: string): string {
    const [datePart, timePart = ''] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour = 0, minute = 0] = timePart.split(':').map(Number);
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const mm = String(minute).padStart(2, '0');
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${MONTHS[month - 1]} ${day}, ${year} ${h}:${mm} ${ampm}`;
}

function toDatetimeLocal(pgTimestamp: string): string {
    return pgTimestamp.replace(' ', 'T').substring(0, 16);
}

export default function EventsManager({ initialEvents }: { initialEvents: EventRow[] }) {
    const [events, setEvents] = useState<EventRow[]>(initialEvents);
    const [mode, setMode] = useState<Mode>('list');
    const [form, setForm] = useState(EMPTY_FORM);
    const [previewMode, setPreviewMode] = useState<'write' | 'preview'>('write');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [draftingEmailFor, setDraftingEmailFor] = useState<string | null>(null);
    const [draftResult, setDraftResult] = useState<{ id: string; success: boolean; message: string } | null>(null);

    const set = (field: string, value: any) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const reload = useCallback(async () => {
        const data = await getAllEventsAction();
        setEvents(data);
    }, []);

    function openCreate() {
        setForm(EMPTY_FORM);
        setPreviewMode('write');
        setError('');
        setSuccessMsg('');
        setMode('create');
    }

    function openEdit(event: EventRow) {
        setForm({
            id: event.id,
            title: event.title,
            date: toDatetimeLocal(event.date),
            end_date: event.end_date ? toDatetimeLocal(event.end_date) : '',
            location_name: event.location_name,
            location_address: event.location_address ?? '',
            description: event.description,
            capacity: event.capacity != null ? String(event.capacity) : '',
            registration_required: event.registration_required,
            cover_image_url: event.cover_image_url ?? '',
            published: event.published,
        });
        setPreviewMode('write');
        setError('');
        setSuccessMsg('');
        setMode('edit');
    }

    function cancel() {
        setMode('list');
        setError('');
        setSuccessMsg('');
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        // Sync controlled checkbox values that don't show in FormData when unchecked
        if (!form.registration_required) formData.delete('registration_required');
        if (!form.published) formData.delete('published');
        const result = await saveEventAction({}, formData);
        setSaving(false);
        if (result.success) {
            await reload();
            setSuccessMsg(result.message ?? 'Saved.');
            setTimeout(() => { setSuccessMsg(''); setMode('list'); }, 1200);
        } else {
            setError(result.message ?? 'Something went wrong.');
        }
    }

    async function handleDelete() {
        if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return;
        const fd = new FormData();
        fd.set('id', form.id);
        await deleteEventAction(fd);
        await reload();
        setMode('list');
    }

    async function handleDraftEmail(eventId: string) {
        setDraftingEmailFor(eventId);
        setDraftResult(null);
        const result = await createEventEmailDraftAction(eventId);
        setDraftingEmailFor(null);
        setDraftResult({ id: eventId, success: result?.success ?? false, message: result?.message ?? 'Something went wrong.' });
        setTimeout(() => setDraftResult(null), 6000);
    }

    const previewHtml = marked.parse(form.description || '') as string;

    if (mode === 'list') {
        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-display text-4xl lg:text-5xl">Events</h1>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/events/email"
                            className="text-sm text-(--muted) hover:text-(--foreground) transition-colors"
                        >
                            Email drafts
                        </Link>
                        <button
                            onClick={openCreate}
                            className="rounded-md bg-(--accent) px-4 py-2 font-display text-lg text-(--on-accent) hover:bg-(--accent-hover) transition-colors"
                        >
                            New event
                        </button>
                    </div>
                </div>

                {draftResult && (
                    <p className={`text-sm mb-4 ${draftResult.success ? 'text-(--muted)' : 'text-(--accent)'}`}>
                        {draftResult.message}
                        {draftResult.success && (
                            <> — <Link href="/events/email" className="underline">View drafts</Link></>
                        )}
                    </p>
                )}

                {events.length === 0 ? (
                    <p className="text-(--muted)">No events yet. Create your first one.</p>
                ) : (
                    <div className="divide-y divide-(--accent-muted)/20">
                        {events.map(event => (
                            <div key={event.id} className="flex items-center justify-between py-4 gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{event.title}</p>
                                    <p className="text-sm text-(--muted)">{formatDateShort(event.date)} — {event.location_name}</p>
                                </div>
                                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${event.published ? 'bg-(--cta-bg)/25 text-(--accent)' : 'bg-(--accent-muted)/20 text-(--muted)'}`}>
                                    {event.published ? 'Published' : 'Draft'}
                                </span>
                                {event.published && (
                                    <button
                                        onClick={() => handleDraftEmail(event.id)}
                                        disabled={draftingEmailFor === event.id}
                                        className="shrink-0 text-sm text-(--muted) hover:text-(--muted) transition-colors disabled:opacity-50"
                                    >
                                        {draftingEmailFor === event.id ? 'Drafting...' : 'Draft email'}
                                    </button>
                                )}
                                <button
                                    onClick={() => openEdit(event)}
                                    className="shrink-0 text-sm text-(--muted) hover:text-(--muted) transition-colors"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-4xl lg:text-5xl">
                    {mode === 'create' ? 'New event' : 'Edit event'}
                </h1>
                <button onClick={cancel} className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {form.id && <input type="hidden" name="id" value={form.id} />}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title <span className="text-(--accent)">*</span></label>
                        <input
                            name="title"
                            type="text"
                            required
                            value={form.title}
                            onChange={e => set('title', e.target.value)}
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Start date & time <span className="text-(--accent)">*</span></label>
                        <input
                            name="date"
                            type="datetime-local"
                            required
                            value={form.date}
                            onChange={e => set('date', e.target.value)}
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent) [color-scheme:dark]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">End date & time <span className="text-xs text-(--muted)">(optional)</span></label>
                        <input
                            name="end_date"
                            type="datetime-local"
                            value={form.end_date}
                            onChange={e => set('end_date', e.target.value)}
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent) [color-scheme:dark]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Location name <span className="text-(--accent)">*</span></label>
                        <input
                            name="location_name"
                            type="text"
                            required
                            value={form.location_name}
                            onChange={e => set('location_name', e.target.value)}
                            placeholder="e.g. Willy Street Co-op East"
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Address <span className="text-xs text-(--muted)">(optional)</span></label>
                        <input
                            name="location_address"
                            type="text"
                            value={form.location_address}
                            onChange={e => set('location_address', e.target.value)}
                            placeholder="e.g. 1221 Williamson St, Madison WI"
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent)"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium">Description <span className="text-xs text-(--muted)">(Markdown supported)</span></label>
                        <div className="flex text-xs border border-(--accent-muted)/40 rounded overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setPreviewMode('write')}
                                className={`px-3 py-1 transition-colors ${previewMode === 'write' ? 'bg-(--accent-muted)/20 text-(--foreground)' : 'text-(--muted) hover:text-(--foreground)'}`}
                            >
                                Write
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewMode('preview')}
                                className={`px-3 py-1 transition-colors ${previewMode === 'preview' ? 'bg-(--accent-muted)/20 text-(--foreground)' : 'text-(--muted) hover:text-(--foreground)'}`}
                            >
                                Preview
                            </button>
                        </div>
                    </div>

                    {previewMode === 'write' ? (
                        <textarea
                            name="description"
                            rows={10}
                            value={form.description}
                            onChange={e => set('description', e.target.value)}
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent) font-mono text-sm resize-y"
                        />
                    ) : (
                        <>
                            <input type="hidden" name="description" value={form.description} />
                            <div
                                className="min-h-48 w-full rounded-md border border-(--accent-muted)/40 bg-(--accent-muted)/5 px-4 py-3 prose prose-sm prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: previewHtml || '<p class="text-(--muted) italic">Nothing to preview.</p>' }}
                            />
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Capacity <span className="text-xs text-(--muted)">(leave blank for unlimited)</span></label>
                        <input
                            name="capacity"
                            type="number"
                            min="1"
                            value={form.capacity}
                            onChange={e => set('capacity', e.target.value)}
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover image URL <span className="text-xs text-(--muted)">(optional)</span></label>
                        <input
                            name="cover_image_url"
                            type="url"
                            value={form.cover_image_url}
                            onChange={e => set('cover_image_url', e.target.value)}
                            placeholder="https://..."
                            className="block w-full rounded-md border border-(--accent-muted) bg-transparent px-3 py-2 focus:outline-none focus:border-(--accent)"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="registration_required"
                            checked={form.registration_required}
                            onChange={e => set('registration_required', e.target.checked)}
                            className="size-4 rounded border-(--accent-muted) accent-(--accent)"
                        />
                        <span className="text-sm font-medium">Registration required</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="published"
                            checked={form.published}
                            onChange={e => set('published', e.target.checked)}
                            className="size-4 rounded border-(--accent-muted) accent-(--accent)"
                        />
                        <span className="text-sm font-medium">Published <span className="text-xs text-(--muted)">(visible on the public events page)</span></span>
                    </label>
                </div>

                <p className="text-xs text-(--muted)">All times are in Central Time (CT).</p>

                {error && <p className="text-sm text-(--accent)">{error}</p>}
                {successMsg && <p className="text-sm text-(--muted)">{successMsg}</p>}

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-md bg-(--accent) px-5 py-2.5 font-semibold text-(--on-accent) hover:bg-(--accent-hover) transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save event'}
                    </button>
                    <button
                        type="button"
                        onClick={cancel}
                        className="rounded-md border border-(--accent-muted) px-5 py-2.5 text-sm text-(--muted) hover:border-(--foreground) hover:text-(--foreground) transition-colors"
                    >
                        Cancel
                    </button>
                    {mode === 'edit' && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="ml-auto rounded-md border border-(--accent)/40 px-4 py-2.5 text-sm text-(--accent) hover:border-(--accent) hover:bg-(--accent)/10 transition-colors"
                        >
                            Delete event
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
