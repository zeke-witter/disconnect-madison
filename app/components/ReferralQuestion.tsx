'use client';

import { useState } from 'react';
import { submitReferralAction } from '@/lib/actions';

const options = [
    { id: 'word_of_mouth', label: 'A friend told me' },
    { id: 'flyer', label: 'I saw a flyer' },
    { id: 'social_media', label: 'Social media' },
    { id: 'web_search', label: 'Web search' },
    { id: 'other', label: 'Other' },
];

export default function ReferralQuestion({ token }: { token: string }) {
    const [selected, setSelected] = useState<string | null>(null);
    const [otherText, setOtherText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    async function handleSelect(id: string) {
        setSelected(id);
        if (id !== 'other') {
            await submitReferralAction(token, id);
            setSubmitted(true);
        }
    }

    async function handleOtherSubmit() {
        await submitReferralAction(token, 'other', otherText.trim() || undefined);
        setSubmitted(true);
    }

    if (submitted) {
        return <p className="text-sm text-(--secondary-accent)">Thanks for letting us know!</p>;
    }

    return (
        <div>
            <p className="font-semibold mb-4">How did you hear about us?</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`px-4 py-2 rounded-md border text-sm transition-colors cursor-pointer ${
                            selected === opt.id
                                ? 'border-(--primary-accent) bg-(--primary-accent) text-white'
                                : 'border-(--secondary-accent) hover:border-(--primary-accent) text-(--secondary-accent) hover:text-(--primary-color)'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            {selected === 'other' && (
                <div className="mt-4 flex gap-2 justify-center">
                    <input
                        type="text"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleOtherSubmit()}
                        placeholder="Tell us how..."
                        maxLength={200}
                        className="rounded-md border border-(--secondary-accent) bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-(--primary-accent) w-56"
                    />
                    <button
                        onClick={handleOtherSubmit}
                        className="px-4 py-2 rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
