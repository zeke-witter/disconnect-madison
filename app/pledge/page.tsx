'use client'

import { useState, useActionState } from 'react';
import { submitPledgeAction } from '@/lib/actions';
import { Field, Fieldset, Input, Label, Legend, Radio, RadioGroup, Button } from '@headlessui/react'

const initialState = {
    message: '',
    success: false
};
const pledgeActions = [
    { label: 'Reduce screen time', subtitle: 'Set limits on daily social media use', id: 'reduce_screen_time' },
    { label: 'Step away', subtitle: 'Deactivate one or more accounts', id: 'take_a_break' },
    { label: 'Quit for good', subtitle: 'Permanently delete one or more accounts', id: 'quit_for_good' },
];

export default function Page() {
    const [state, formAction, isPending] = useActionState(submitPledgeAction, initialState);
    const [selectedPledgeAction, setSelectedPledgeAction] = useState(pledgeActions[0]);

    return (
        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <div className="flex-1 max-w-2xl">
                <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-2 w-full">Take the Pledge</h1>
                <p className="text-(--secondary-accent) mb-10 w-full">A small step toward something better.</p>

                <form action={formAction} className="w-full">
                    <Fieldset className="space-y-8">
                        <Legend className="sr-only">Pledge to free yourself from social media</Legend>

                        <div>
                            <p id="pledge-action-label" className="font-bold text-lg mb-4">What do you pledge to do in the next 10 days?</p>
                            <RadioGroup
                                name="pledgeAction"
                                value={selectedPledgeAction}
                                onChange={setSelectedPledgeAction}
                                aria-labelledby="pledge-action-label"
                                className="space-y-3"
                            >
                                {pledgeActions.map((action) => (
                                    <Field key={action.id}>
                                        <Radio
                                            value={action}
                                            className="group flex items-center gap-3 cursor-pointer rounded-md border border-(--secondary-accent) p-4 transition-colors data-checked:border-(--primary-accent) data-checked:bg-(--primary-accent)/10"
                                        >
                                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-(--secondary-accent) group-data-checked:border-(--primary-accent)">
                                                <span className="invisible size-2.5 rounded-full bg-(--primary-accent) group-data-checked:visible" />
                                            </span>
                                            <Label className="cursor-pointer">
                                                <span className="font-bold">{action.label}</span>
                                                <span className="block text-sm text-(--secondary-accent)">{action.subtitle}</span>
                                            </Label>
                                        </Radio>
                                    </Field>
                                ))}
                            </RadioGroup>
                        </div>

                        <Field>
                            <Label className="block font-bold text-lg mb-2">Email address</Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                            />
                            <p className="text-sm text-(--secondary-accent) mt-2">
                                Your email will never be shared or used to contact you. It is collected only to ensure integrity in the pledge count.
                            </p>
                        </Field>
                    </Fieldset>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="mt-8 w-full rounded-md bg-(--primary-accent) px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-(--primary-accent-hover) disabled:opacity-50 font-handjet text-2xl"
                    >
                        {isPending ? 'Submitting...' : 'Submit my pledge'}
                    </Button>

                    {state?.message && (
                        <p className={`mt-4 text-center font-medium ${state.success ? 'text-emerald-600' : 'text-(--primary-accent)'}`}>
                            {state.message}
                        </p>
                    )}
                </form>
            </div>

            <aside className="lg:w-80 lg:mt-24 space-y-8 text-sm" aria-label="Guides for taking action">
                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">Reduce screen time</h2>
                    <ul className="space-y-2">
                        <li><a href="https://support.apple.com/guide/iphone/set-up-screen-time-iphbfa595995/ios" target="_blank" rel="noopener noreferrer">iPhone Screen Time settings</a></li>
                        <li><a href="https://support.google.com/android/answer/9346420" target="_blank" rel="noopener noreferrer">Android Digital Wellbeing</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">Deactivate accounts</h2>
                    <ul className="space-y-2">
                        <li><a href="https://www.facebook.com/help/214376678584711" target="_blank" rel="noopener noreferrer">Facebook &mdash; deactivate</a></li>
                        <li><a href="https://help.instagram.com/370452623149242" target="_blank" rel="noopener noreferrer">Instagram &mdash; deactivate</a></li>
                        <li><a href="https://help.x.com/en/managing-your-account/how-to-deactivate-x-account" target="_blank" rel="noopener noreferrer">X (Twitter) &mdash; deactivate</a></li>
                        <li><a href="https://support.snapchat.com/en-US/a/delete-my-account1" target="_blank" rel="noopener noreferrer">Snapchat &mdash; deactivate</a></li>
                        <li><a href="https://www.tiktok.com/community-guidelines/en/accounts-features" target="_blank" rel="noopener noreferrer">TikTok &mdash; deactivate</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">Delete accounts</h2>
                    <ul className="space-y-2">
                        <li><a href="https://www.facebook.com/help/224562897555674" target="_blank" rel="noopener noreferrer">Facebook &mdash; permanently delete</a></li>
                        <li><a href="https://help.instagram.com/370452623149242" target="_blank" rel="noopener noreferrer">Instagram &mdash; permanently delete</a></li>
                        <li><a href="https://help.x.com/en/managing-your-account/how-to-deactivate-x-account" target="_blank" rel="noopener noreferrer">X (Twitter) &mdash; permanently delete</a></li>
                        <li><a href="https://support.snapchat.com/en-US/a/delete-my-account1" target="_blank" rel="noopener noreferrer">Snapchat &mdash; permanently delete</a></li>
                        <li><a href="https://support.tiktok.com/en/account-and-privacy/deleting-an-account" target="_blank" rel="noopener noreferrer">TikTok &mdash; permanently delete</a></li>
                        <li><a href="https://www.reddit.com/settings" target="_blank" rel="noopener noreferrer">Reddit &mdash; permanently delete</a></li>
                    </ul>
                </div>

                <p className="text-xs text-(--secondary-accent)">
                    Links point to official platform documentation. Verify steps on each platform, as processes may change.
                </p>
            </aside>
        </div>
    )
}
