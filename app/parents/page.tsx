import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto font-body">

            <section aria-labelledby="parents-heading" className="w-full mb-10">
                <h1 id="parents-heading" className="font-display text-5xl lg:text-7xl mb-4">
                    A humble guide for parents
                </h1>
                <p className="text-lg text-(--muted)">
                    More parents than ever are asking the same questions: How do I talk to my kids about this? What rules actually stick? What do I do when my home is screen-free but everywhere else isn&apos;t? There&apos;s no perfect answer, but there is a lot that research and real experience suggest actually helps.
                </p>
            </section>

            <div className="w-full p-6 rounded-md border border-(--accent-muted) bg-(--accent-muted)/5 mb-12">
                <p className="text-(--muted)">
                    Are you a parent? Have you tried these strategies, or do you have advice for other parents? <Link href="/contact">Reach out to us</Link> and let us know what worked for you and what didn&apos;t. Tell us about the challenges you&apos;ve faced and the outcomes you&apos;ve witnessed. It takes a village, after all.
                </p>
            </div>

            <section aria-labelledby="model-heading" className="w-full mb-12">
                <h2 id="model-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">Start with yourself</h2>
                <p className="mb-4">
                    The most powerful thing you can do for your kids is modeling the behavior you want to see. Research consistently shows that a parent&apos;s phone use affects how children feel about themselves and their relationship with their parents.
                </p>
                <p className="mb-4">It&apos;s not easy and you don&apos;t have to be perfect. Every bit of effort counts.</p>
                <ul className="space-y-3 mb-4">
                    <li className="flex gap-3">
                        <span className="text-(--accent-muted) font-bold shrink-0">+</span>
                        <span>Put your phone away at meals. Make it a household rule, not just a kid rule.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-(--accent-muted) font-bold shrink-0">+</span>
                        <span>Don&apos;t reach for your phone when you&apos;re bored or waiting. Your kids notice.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-(--accent-muted) font-bold shrink-0">+</span>
                        <span>Be honest about your own relationship with screens. &ldquo;I&apos;m trying to use my phone less too&rdquo; goes a long way.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-(--accent-muted) font-bold shrink-0">+</span>
                        <span>Designate phone-free spaces at home: the dinner table, bedrooms, and the car are good places to start.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-(--accent-muted) font-bold shrink-0">+</span>
                        <span>Still on social media? Try <Link href="/help-yourself" target="_blank">reducing your screen time</Link> or <Link href="/before-you-go" target="_blank">quitting altogether</Link>.</span>
                    </li>
                </ul>
                <p className="text-(--muted)">
                    Being present isn&apos;t just good for your kids. <b>The same research on reduced phone use that applies to adults applies to you:</b> better sleep, less anxiety, more satisfaction from everyday life.
                </p>
            </section>

            <section aria-labelledby="conversation-heading" className="w-full mb-12">
                <h2 id="conversation-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">Having the conversation</h2>
                <p className="mb-6">
                    Talking about screens works best when it&apos;s an ongoing conversation, not a single lecture. A few principles that help:
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-1">Lead with curiosity, not rules</h3>
                        <p className="text-(--muted)">Ask your kids what they like about the apps they use. How do they feel after? Most kids, given space to reflect, already know something feels off. Starting from their experience rather than your concern keeps the conversation open.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Involve them in making the rules</h3>
                        <p className="text-(--muted)">Kids are more likely to follow boundaries they helped create. &ldquo;What do you think is a fair amount of screen time?&rdquo; opens a door that &ldquo;no phones after 7pm&rdquo; slams shut. You can negotiate from their answer.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Validate what they&apos;d miss</h3>
                        <p className="text-(--muted)">FOMO is real. Don&apos;t dismiss it. Acknowledge that it&apos;s genuinely hard to feel left out of group chats or out of the loop on something, then talk about what else they could do with that time.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Try this quiz together</h3>
                        <p className="text-(--muted)">ExpressVPN&apos;s <a href="https://www.expressvpn.com/blog/how-to-help-kids-outsmart-social-media/" target="_blank" rel="noopener noreferrer">Test Your Knowledge About the Algorithm</a> is a good conversation starter. It helps kids (and adults) understand how platforms are designed to hold attention, in a way that feels like a game rather than a lecture.</p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="structure-heading" className="w-full mb-12">
                <h2 id="structure-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">Building structure at home</h2>
                <p className="mb-6">Consistent, predictable rules that apply to everyone in the household work better than rules that feel targeted at kids.</p>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-1">No phones at meals</h3>
                        <p className="text-(--muted)">Simple, high-impact, and easy to explain. This one is worth protecting.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Charge devices outside the bedroom overnight</h3>
                        <p className="text-(--muted)">Sleep is the biggest casualty of late-night phone use in kids and teens. Keeping chargers in the kitchen or hallway removes the temptation entirely. Again: this works better as a whole-household rule.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Delay smartphones as long as possible</h3>
                        <p className="text-(--muted)">
                            The research on this is clear: the later kids get smartphones and social media access, the better the outcomes for mental health and academic performance. The <a href="https://www.waituntil8th.org/" target="_blank" rel="noopener noreferrer">Wait Until 8th</a> campaign asks parents to pledge to wait until at least 8th grade. The pledge carries more weight when multiple families in the same school or friend group sign on together.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Consider smartphone alternatives for younger kids</h3>
                        <p className="text-(--muted) mb-3">If your child needs to be reachable, there are options that don&apos;t come with an internet browser and social media access:</p>
                        <ul className="space-y-2 text-(--muted)">
                            <li><span className="font-semibold text-(--foreground)">Gabb Phone</span>: calls and texts only, no internet or app store</li>
                            <li><span className="font-semibold text-(--foreground)">Light Phone</span>: minimal by design; calls, texts, and a few basic tools</li>
                            <li><span className="font-semibold text-(--foreground)">Bark Phone</span>: a full smartphone with parental monitoring and content limits built in</li>
                            <li><span className="font-semibold text-(--foreground)">TickTalk Watch</span>: GPS tracking and calling in a wearable; no apps or social media</li>
                        </ul>
                        <p className="text-(--muted) mt-3">None of these are perfect, and the right choice depends on your kid&apos;s age and your family&apos;s situation. But they&apos;re worth knowing about before defaulting to a full smartphone.</p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="other-families-heading" className="w-full mb-12">
                <h2 id="other-families-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">When other families do things differently</h2>
                <p className="mb-6">
                    This is the part no one talks about enough. You set thoughtful rules at home, and then your kid goes to a sleepover where screens are on all night. Or a friend arrives with an iPad and an unlimited data plan. You can&apos;t control other families, but you can do a few things.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-1">Talk before, not after</h3>
                        <p className="text-(--muted)">Before a visit to a screen-heavy home, have a brief, low-pressure conversation: &ldquo;They might have different rules there, and that&apos;s okay. What do you think you&apos;ll do if the screens aren&apos;t really your thing?&rdquo; This gives kids a moment to think, rather than putting them on the spot in the moment.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Give them an out</h3>
                        <p className="text-(--muted)">Some kids want permission to step away from something that doesn&apos;t feel good but don&apos;t know how to do it without feeling weird. &ldquo;You can always tell me you&apos;re not feeling well and I&apos;ll come get you, no questions asked&rdquo; is worth saying out loud before they go.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">When friends bring devices to your home</h3>
                        <p className="text-(--muted)">It&apos;s reasonable to ask kids to put phones and tablets away during shared time at your house. You don&apos;t have to frame it as a rule about their device. Something like &ldquo;we try to keep things screen-free when we&apos;re hanging out together here&rdquo; is easy to say and hard to argue with.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Build relationships with other parents</h3>
                        <p className="text-(--muted)">The easiest path is finding even one or two families who share your values. A simple &ldquo;we&apos;re trying to hold off on smartphones for now. Is your family thinking about any of this?&rdquo; can open a useful conversation. You might be surprised how many parents feel the same way but assume everyone else is fine with it. Try the same approach you try with your own children: curiosity, non-judgment, and openness to disagreement in the moment.</p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="limited-resources-heading" className="w-full mb-12">
                <h2 id="limited-resources-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">What if resources are tight?</h2>
                <p className="mb-4">
                    A lot of the advice on this subject assumes two parents, flexible schedules, and room in the budget for alternative devices or monitoring apps. That&apos;s not every family, and pretending otherwise isn&apos;t helpful.
                </p>
                <p className="mb-6">
                    If you&apos;re stretched thin, screens are sometimes the thing that gives you a few minutes to breathe. That&apos;s real and it&apos;s valid. The goal here isn&apos;t perfection. One thing that sticks is worth more than five things that don&apos;t.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-1">The bedroom rule costs nothing</h3>
                        <p className="text-(--muted)">Charging devices outside the bedroom overnight is the highest-impact single habit change on this page, and it requires no money and no extra time. A charger in the kitchen or hallway is all it takes.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Meals are already happening</h3>
                        <p className="text-(--muted)">Phones away at the table requires no planning and no budget. If sit-down meals aren&apos;t a regular thing, even a few minutes of phone-free time while eating together is meaningful.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Free parental controls are already on the device</h3>
                        <p className="text-(--muted)">Every iPhone has Screen Time built in. Every Android has Digital Wellbeing. Both let you set daily limits on specific apps, schedule downtime, and restrict content. They&apos;re free, already installed, and take about ten minutes to set up.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">School policy is leverage you already have</h3>
                        <p className="text-(--muted)">Many schools are adopting phone-free policies during the school day. If yours hasn&apos;t, reaching out to a teacher or administrator costs nothing. A school-wide policy extends screen-free time without any ongoing effort at home.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Co-viewing is free</h3>
                        <p className="text-(--muted)">When kids do use screens, watching or playing alongside them and asking questions, &ldquo;Why do you think that video got so many views?&rdquo; or &ldquo;How does that make you feel?&rdquo;, builds critical thinking without requiring a separate conversation or structured activity.</p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="community-heading" className="w-full mb-12">
                <h2 id="community-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">Find your people</h2>
                <p className="mb-6">You&apos;re not the only parent trying to figure this out. A few communities worth knowing:</p>

                <div className="space-y-6">
                    <div className="rounded-lg border border-(--accent-muted) p-6">
                        <h3 className="font-bold text-lg mb-1">
                            <a href="https://www.waituntil8th.org/" target="_blank" rel="noopener noreferrer">Wait Until 8th</a>
                        </h3>
                        <p className="text-(--muted)">A grassroots pledge for parents to hold off on giving kids smartphones until 8th grade. The pledge has real teeth when multiple families in the same school sign on together. Their site makes it easy to see if other families in your area have already signed on.</p>
                    </div>
                    <div className="rounded-lg border border-(--accent-muted) p-6">
                        <h3 className="font-bold text-lg mb-1">
                            <a href="https://www.optoutfamily.com/" target="_blank" rel="noopener noreferrer">Opt Out Family</a>
                        </h3>
                        <p className="text-(--muted)">Resources and community for families opting out of the attention economy, from smartphones to social media. Practical, research-backed, and written by a parent for parents.</p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="reading-heading" className="w-full mb-12">
                <h2 id="reading-heading" className="font-display text-3xl lg:text-4xl mb-4 text-(--accent-muted)">Reading list</h2>
                <p className="text-(--muted) mb-6">A short list of resources worth your time. [Work in progress]</p>

                <div className="space-y-6">
                    <div className="rounded-lg border border-(--accent-muted) p-6">
                        <p className="font-bold text-lg mb-1"><span className="italic">The Anxious Generation</span> by Jonathan Haidt</p>
                        <p className="text-(--muted) mb-3">The most thorough examination of how smartphones and social media have reshaped adolescence. If you read one book on this topic, make it this one. Haidt draws on a decade of data to make the case for delayed smartphone access, phone-free schools, and more unsupervised play.</p>
                        <a
                            href="https://www.anxiousgeneration.com/parent-teacher-talk/video"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold"
                        >
                            Watch Haidt&apos;s 37-minute summary for parents and teachers &rarr;
                        </a>
                    </div>
                </div>
            </section>

            <div className="w-full p-6 rounded-md border border-(--accent-muted)/30 bg-(--accent-muted)/5 mb-10">
                <p className="text-sm text-(--muted)">
                    Looking for research on how screens affect kids and teens? Our <Link href="/learn/kids">effects on kids</Link> page covers what the studies show, from depression and sleep disruption to attention and body image.
                </p>
            </div>

        </div>
    );
}
