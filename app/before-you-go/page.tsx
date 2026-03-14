import Link from 'next/link';

export default function BeforeYouGoPage() {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="before-you-go-heading" className="w-full mb-10">
                <h1 id="before-you-go-heading" className="font-handjet text-5xl lg:text-7xl mb-4">
                    Before you go
                </h1>
                <div className="space-y-4 text-lg text-(--secondary-accent)">
                    <p>
                        You don&apos;t have to delete everything today. In fact, you probably shouldn&apos;t. Leaving thoughtfully means you won&apos;t regret it later, and you won&apos;t lose things you meant to save.
                    </p>
                    <p>
                        This guide is for anyone who has decided to step away from one or more platforms, or is seriously considering permanent account deletion. There are no rules, no timeline, and no right way to do it. Here&apos;s how to make it easier.
                    </p>
                </div>
            </section>

            <div className="w-full space-y-12">

                <section aria-labelledby="decide-heading" className="w-full">
                    <h2 id="decide-heading" className="font-handjet text-3xl lg:text-4xl mb-4 text-(--primary-color)">
                        Start by deciding what matters to you
                    </h2>
                    <div className="space-y-4">
                        <p>
                            Before you do anything, spend a few minutes thinking honestly about what you would actually miss, not what you feel anxious about losing. There&apos;s a difference.
                        </p>
                        <p>Some useful questions:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-(--secondary-accent)">
                            <li>Are there photos or videos stored here that exist nowhere else?</li>
                            <li>Are there people you stay in touch with mostly or entirely through this platform?</li>
                            <li>Are there saved posts, bookmarks, or content you genuinely refer back to?</li>
                            <li>What do you actually get from this platform, versus what you tell yourself you get?</li>
                        </ul>
                        <p>
                            These aren&apos;t necessarily reasons to stay. They&apos;re things to handle before you go.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="save-heading" className="w-full">
                    <h2 id="save-heading" className="font-handjet text-3xl lg:text-4xl mb-4 text-(--primary-color)">
                        Save what you want to keep
                    </h2>
                    <div className="space-y-4">
                        <p>
                            Every major platform lets you download a copy of your data: photos, videos, posts, messages, and more. Do this before you deactivate or delete.
                        </p>
                        <p>
                            The process takes a few minutes to request and usually a few hours (sometimes longer) for the platform to prepare your file. Plan ahead.
                        </p>
                        <div className="rounded-md border border-(--secondary-accent)/30 divide-y divide-(--secondary-accent)/20 text-sm mt-4">
                            {[
                                { platform: 'Facebook', href: 'https://www.facebook.com/help/212802592074644', label: 'Download your Facebook data' },
                                { platform: 'Instagram', href: 'https://help.instagram.com/181231772500920', label: 'Download your Instagram data' },
                                { platform: 'X (Twitter)', href: 'https://help.x.com/en/managing-your-account/how-to-download-your-twitter-archive', label: 'Download your X archive' },
                                { platform: 'TikTok', href: 'https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data', label: 'Request your TikTok data' },
                                { platform: 'Snapchat', href: 'https://support.snapchat.com/en-US/a/download-my-data', label: 'Download your Snapchat data' },
                                { platform: 'Reddit', href: 'https://www.reddit.com/settings/data-request', label: 'Request your Reddit data' },
                            ].map(({ platform, href, label }) => (
                                <div key={platform} className="flex items-center justify-between px-4 py-3 gap-4">
                                    <span className="font-medium">{platform}</span>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-(--primary-accent) underline underline-offset-2 shrink-0"
                                    >
                                        {label}
                                    </a>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-(--secondary-accent)">
                            Links point to official platform help pages. Steps may change as platforms update their interfaces.
                        </p>
                        <p>
                            If you have photos or videos worth keeping, consider turning them into something tangible. Services like Chatbooks, Mixbook, and Shutterfly let you upload photos and order printed photo books. Search <span className="italic">photo book printing service</span> to compare current options and pricing.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="connections-heading" className="w-full">
                    <h2 id="connections-heading" className="font-handjet text-3xl lg:text-4xl mb-4 text-(--primary-color)">
                        Reach out before you leave
                    </h2>
                    <div className="space-y-4">
                        <p>
                            If there are people in your life you primarily connect with through social media, let them know you&apos;re leaving. Get their phone number, email address, or however you&apos;d want to actually stay in touch.
                        </p>
                        <p>
                            Don&apos;t assume they&apos;ll track you down. Most people won&apos;t notice you&apos;re gone until it&apos;s been months. A simple message saying &ldquo;I&apos;m stepping back from Instagram, here&apos;s my number&rdquo; goes a long way. The people who matter will appreciate it.
                        </p>
                        <p>
                            This is also a good moment to notice which relationships exist almost entirely on a platform. Sometimes that&apos;s fine. Sometimes it&apos;s clarifying.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="pace-heading" className="w-full">
                    <h2 id="pace-heading" className="font-handjet text-3xl lg:text-4xl mb-4 text-(--primary-color)">
                        You don&apos;t have to do it all at once
                    </h2>
                    <div className="space-y-4">
                        <p>
                            Leaving one platform is enough. You can step back from Instagram and keep Reddit. You can deactivate Facebook for a month before deciding whether to delete permanently. You can stop posting without announcing it.
                        </p>
                        <p>
                            Doing it piece by piece is not a failure of commitment. It&apos;s a reasonable way to make a lasting change. The goal is to get to a place that works for you, not to hit some standard of purity. Most people who have successfully left social media did it gradually.
                        </p>
                        <p>
                            Be patient with yourself. The pull you feel is real, it was engineered. Feeling it doesn&apos;t mean you&apos;re weak. It means the product is working as intended.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="ready-heading" className="w-full">
                    <h2 id="ready-heading" className="font-handjet text-3xl lg:text-4xl mb-4 text-(--primary-color)">
                        When you&apos;re ready
                    </h2>
                    <div className="space-y-4">
                        <p>
                            Official guides for deactivating or deleting accounts on each platform:
                        </p>
                        <div className="rounded-md border border-(--secondary-accent)/30 divide-y divide-(--secondary-accent)/20 text-sm">
                            {[
                                { platform: 'Facebook', deactivate: { href: 'https://www.facebook.com/help/214376678584711', label: 'Deactivate' }, remove: { href: 'https://www.facebook.com/help/224562897555674', label: 'Delete' } },
                                { platform: 'Instagram', deactivate: { href: 'https://help.instagram.com/370452623149242', label: 'Deactivate' }, remove: { href: 'https://help.instagram.com/370452623149242', label: 'Delete' } },
                                { platform: 'X (Twitter)', deactivate: { href: 'https://help.x.com/en/managing-your-account/how-to-deactivate-x-account', label: 'Deactivate' }, remove: { href: 'https://help.x.com/en/managing-your-account/how-to-deactivate-x-account', label: 'Delete' } },
                                { platform: 'TikTok', deactivate: { href: 'https://www.tiktok.com/community-guidelines/en/accounts-features', label: 'Deactivate' }, remove: { href: 'https://support.tiktok.com/en/account-and-privacy/deleting-an-account', label: 'Delete' } },
                                { platform: 'Snapchat', deactivate: { href: 'https://support.snapchat.com/en-US/a/delete-my-account1', label: 'Deactivate' }, remove: { href: 'https://support.snapchat.com/en-US/a/delete-my-account1', label: 'Delete' } },
                                { platform: 'Reddit', deactivate: null, remove: { href: 'https://www.reddit.com/settings', label: 'Delete' } },
                            ].map(({ platform, deactivate, remove }) => (
                                <div key={platform} className="flex items-center justify-between px-4 py-3 gap-4">
                                    <span className="font-medium">{platform}</span>
                                    <div className="flex gap-4 shrink-0">
                                        {deactivate && (
                                            <a href={deactivate.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-(--secondary-accent)">
                                                {deactivate.label}
                                            </a>
                                        )}
                                        <a href={remove.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-(--primary-accent)">
                                            {remove.label}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-(--secondary-accent)">
                            Links point to official platform help pages. Verify steps on each platform, as processes may change.
                        </p>
                        <p className="pt-2">
                            Ready to make it official? <Link href="/pledge">Take the 10-day pledge →</Link>
                        </p>
                    </div>
                </section>

            </div>

            <section aria-labelledby="further-reading" className="w-full mt-12 pt-8 border-t border-(--secondary-accent)/20">
                <h2 id="further-reading" className="font-bold mb-3 text-(--primary-color)">Further reading</h2>
                <p className="text-sm text-(--secondary-accent)">
                    Looking for strategies to reduce screen time, get through the first two weeks, or build habits that stick? See{' '}
                    <Link href="/help-yourself">How to Help Yourself</Link>.
                </p>
            </section>

        </div>
    );
}
