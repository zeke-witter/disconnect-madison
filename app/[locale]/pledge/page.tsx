'use client'

import { useState, useActionState } from 'react';
import { submitPledgeAction, resendVerificationAction } from '@/lib/actions';
import { Field, Fieldset, Input, Label, Legend, Radio, RadioGroup, Button, Checkbox } from '@headlessui/react';
import { useTranslations } from 'next-intl';

const initialState = {
    message: '',
    success: false
};

export default function Page() {
    const t = useTranslations('pledge');
    const [state, formAction, isPending] = useActionState(submitPledgeAction, initialState);
    const [resendState, resendAction, isResendPending] = useActionState(resendVerificationAction, { message: '', success: false });

    const pledgeActions = [
        { label: t('action1Label'), subtitle: t('action1Subtitle'), id: 'reduce_screen_time' },
        { label: t('action2Label'), subtitle: t('action2Subtitle'), id: 'take_a_break' },
        { label: t('action3Label'), subtitle: t('action3Subtitle'), id: 'quit_for_good' },
    ];

    const [selectedPledgeId, setSelectedPledgeId] = useState('reduce_screen_time');
    const [newsletterOptIn, setNewsletterOptIn] = useState(false);
    const [email, setEmail] = useState('');

    const selectedPledgeAction = pledgeActions.find(a => a.id === selectedPledgeId) ?? pledgeActions[0];

    if (state.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-lg mx-auto text-center font-[family-name:var(--font-space-grotesk)]">
                <h1 className="font-handjet text-5xl lg:text-7xl mb-4">{t('successHeading')}</h1>
                <p className="text-lg text-(--secondary-accent) mb-2">{t('successSentTo')}</p>
                <p className="font-bold text-lg mb-8">{email}</p>

                <div className="w-full rounded-lg border-2 border-(--primary-accent) bg-(--primary-accent)/10 p-5 mb-8 text-left">
                    <p className="font-bold mb-1">{t('successWarningHeading')}</p>
                    <p className="text-sm text-(--secondary-accent) mt-1">{t('successWarningBody')}</p>
                </div>

                <form action={resendAction} className="w-full mb-3">
                    <input type="hidden" name="email" value={email} />
                    <button
                        type="submit"
                        disabled={isResendPending || resendState.success}
                        className="w-full rounded-md border border-(--secondary-accent) px-6 py-3 text-sm font-semibold text-(--secondary-accent) transition-colors hover:border-(--primary-accent) hover:text-(--primary-accent) disabled:opacity-50"
                    >
                        {isResendPending ? t('resendSending') : t('resend')}
                    </button>
                </form>

                {resendState.message && (
                    <p className={`text-sm mb-4 ${resendState.success ? 'text-(--primary-color)' : 'text-(--primary-accent)'}`}>
                        {resendState.message}
                    </p>
                )}

                <a
                    id="button-back-home"
                    href="/"
                    className="mt-6 inline-block rounded-md bg-(--primary-accent) px-6 py-3 font-handjet text-2xl font-bold text-white transition-colors hover:bg-(--primary-accent-hover)"
                >
                    {t('backToHome')}
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <div className="flex-1 max-w-2xl">
                <h1 className="font-handjet text-5xl lg:text-7xl mb-2 w-full">{t('heading')}</h1>
                <p className="text-(--secondary-accent) mb-10 w-full">{t('subheading')}</p>

                <form action={formAction} className="w-full">
                    <Fieldset className="space-y-8">
                        <Legend className="sr-only">{t('legend')}</Legend>

                        {/* Honeypot field — hidden from real users, filled by bots */}
                        <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
                            <label htmlFor="website">Website</label>
                            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div>
                            <p id="pledge-action-label" className="font-bold text-lg mb-4">{t('questionLabel')}</p>
                            <RadioGroup
                                name="pledgeAction"
                                value={selectedPledgeAction}
                                onChange={(action) => setSelectedPledgeId(action.id)}
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
                            <Label className="block font-bold text-lg mb-2">{t('emailLabel')}</Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border border-(--secondary-accent) bg-transparent px-4 py-3 focus:outline-none focus:border-(--primary-accent) focus:ring-1 focus:ring-(--primary-accent)"
                            />
                            <p className="text-sm text-(--secondary-accent) mt-2">{t('emailHelp')}</p>
                        </Field>

                        <Field className="flex items-start gap-3">
                            <Checkbox
                                name="newsletter_opt_in"
                                value="true"
                                checked={newsletterOptIn}
                                onChange={setNewsletterOptIn}
                                className="group mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border border-(--secondary-accent) transition-colors data-checked:border-(--primary-accent) data-checked:bg-(--primary-accent)"
                            >
                                <span className="invisible size-2.5 rounded-sm bg-white group-data-checked:visible" />
                            </Checkbox>
                            <div>
                                <Label className="font-bold cursor-pointer">{t('newsletterLabel')}</Label>
                                <p className="text-sm text-(--secondary-accent) mt-1">{t('newsletterHelp')}</p>
                            </div>
                        </Field>
                    </Fieldset>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="mt-8 w-full rounded-md bg-(--primary-accent) px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-(--primary-accent-hover) disabled:opacity-50 font-handjet text-2xl"
                    >
                        {isPending ? t('submitting') : t('submit')}
                    </Button>

                    {state?.message && !state.success && (
                        <div className="mt-4 text-center">
                            <p className="font-medium text-(--primary-accent)">{state.message}</p>
                            <a
                                href={`/contact?subject=${encodeURIComponent('Bug report: pledge form')}&message=${encodeURIComponent(`I ran into an error on the pledge page.\n\nPledge type selected: ${selectedPledgeAction.label}\nEmail entered: ${email}\nError message: ${state.message}\n\nDevice: (e.g. iPhone 15, Windows laptop)\nBrowser: (e.g. Safari, Chrome, Firefox)\nAnything else:`)}`}
                                className="mt-2 inline-block text-sm text-(--secondary-accent) hover:text-(--primary-accent) hover:underline"
                            >
                                {t('reportIssue')} &rarr;
                            </a>
                        </div>
                    )}
                </form>
            </div>

            <aside className="lg:w-80 lg:mt-24 space-y-8 text-sm" aria-label="Guides for taking action">
                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">{t('sidebarGuideHeading')}</h2>
                    <p className="text-(--secondary-accent)">{t('sidebarGuideBody')} <a href="/help-yourself">{t('sidebarGuideLink')} →</a></p>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">{t('sidebarReduceHeading')}</h2>
                    <ul className="space-y-2">
                        <li><a href="https://support.apple.com/guide/iphone/set-up-screen-time-iphbfa595995/ios" target="_blank" rel="noopener noreferrer">{t('iPhoneScreenTime')}</a></li>
                        <li><a href="https://support.google.com/android/answer/9346420" target="_blank" rel="noopener noreferrer">{t('androidWellbeing')}</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">{t('sidebarDeactivateHeading')}</h2>
                    <ul className="space-y-2">
                        <li><a href="https://www.facebook.com/help/214376678584711" target="_blank" rel="noopener noreferrer">{t('deactivateFacebook')}</a></li>
                        <li><a href="https://help.instagram.com/370452623149242" target="_blank" rel="noopener noreferrer">{t('deactivateInstagram')}</a></li>
                        <li><a href="https://help.x.com/en/managing-your-account/how-to-deactivate-x-account" target="_blank" rel="noopener noreferrer">{t('deactivateX')}</a></li>
                        <li><a href="https://support.snapchat.com/en-US/a/delete-my-account1" target="_blank" rel="noopener noreferrer">{t('deactivateSnapchat')}</a></li>
                        <li><a href="https://www.tiktok.com/community-guidelines/en/accounts-features" target="_blank" rel="noopener noreferrer">{t('deactivateTikTok')}</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3 text-(--primary-color)">{t('sidebarDeleteHeading')}</h2>
                    <ul className="space-y-2">
                        <li><a href="https://www.facebook.com/help/224562897555674" target="_blank" rel="noopener noreferrer">{t('deleteFacebook')}</a></li>
                        <li><a href="https://help.instagram.com/370452623149242" target="_blank" rel="noopener noreferrer">{t('deleteInstagram')}</a></li>
                        <li><a href="https://help.x.com/en/managing-your-account/how-to-deactivate-x-account" target="_blank" rel="noopener noreferrer">{t('deleteX')}</a></li>
                        <li><a href="https://support.snapchat.com/en-US/a/delete-my-account1" target="_blank" rel="noopener noreferrer">{t('deleteSnapchat')}</a></li>
                        <li><a href="https://support.tiktok.com/en/account-and-privacy/deleting-an-account" target="_blank" rel="noopener noreferrer">{t('deleteTikTok')}</a></li>
                        <li><a href="https://www.reddit.com/settings" target="_blank" rel="noopener noreferrer">{t('deleteReddit')}</a></li>
                    </ul>
                </div>

                <p className="text-xs text-(--secondary-accent)">{t('sidebarDisclaimer')}</p>
            </aside>
        </div>
    );
}
