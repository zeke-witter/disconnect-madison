import Link from 'next/link';
import { Accordion, AccordionItem } from '@/app/components/Accordion';

const Section = AccordionItem;

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="pt-4">
            <h3 className="font-bold text-base mb-2 text-(--primary-color)">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

export default function HelpYourselfAccordion() {
    return (
        <Accordion>
            <Section title="Start with why">
                <p className="mb-4">
                    Before you change a single setting on your phone, get clear on why you&apos;re doing this in a specific, honest way. For example:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>&ldquo;I want to feel less anxious about things I can&apos;t control&rdquo;</li>
                    <li>&ldquo;I want to be more present with my kids at dinner&rdquo;</li>
                    <li>&ldquo;I feel worse about myself after scrolling Tiktok&rdquo;</li>
                </ul>
                <p className="mb-4">
                    Try to do better than &ldquo;social media is bad.&rdquo; The more specific and personal your reason, the more resilient it will be when the urge to scroll hits.
                </p>
                <p>
                    Some people find it helpful to write their reason on a small card and keep it where their phone usually sits. Others set it as their lock screen. The point is to make your personal <span className="italic">why</span> visible at the moment of temptation, not just something you remember in the abstract.
                </p>
            </Section>

            <Section title="Change your environment before trying to change yourself">
                <p className="mb-4">
                    Willpower is a limited resource, and anyone who tells you otherwise is selling something. <span className="italic">Removing</span> temptation is more effective than trying to resist it. Behavioral scientists call these precommitment devices: decisions you make in a calm moment that limit your options in a weak one.
                </p>
                <p>Imagine someone trying to cut down on sugar in their diet. If they make good decisions at the grocery store, they don&apos;t have to worry about fighting temptation at home.</p>
                <Subsection title="Phone-free zones">
                    <p>
                        Pick one or two places in your home where your phone is simply not allowed. The bedroom and the dining table are the most common starting points, and for good reason: they&apos;re the places where phone use most directly competes with sleep, conversation, and presence. Buy a $5 alarm clock. Charge your phone overnight in the kitchen. Removing the phone from the bedroom is the single most frequently cited habit among people who have successfully reduced their screen time.
                    </p>
                </Subsection>
                <Subsection title="Physical separation">
                    <p>
                        The further your phone is from your body, the less you use it. This isn&apos;t a metaphor; it&apos;s documented. The &ldquo;Brain Drain&rdquo; study from the University of Texas found that even having your phone on the desk in front of you reduces your working memory and fluid intelligence...<span className="font-bold">even if it&apos;s face down, even if it&apos;s on silen</span>. The effect disappeared when the phone was in another room. When you&apos;re working, eating, reading, or spending time with someone you care about, put the phone somewhere you can&apos;t see it.
                    </p>
                </Subsection>
                <Subsection title="Timed lockboxes">
                    <p>
                        If physical distance isn&apos;t enough, a timed lockbox takes the decision out of your hands entirely. Products like the kSafe (originally Kitchen Safe) are transparent containers with a timer-controlled lid. Put your phone in, set the timer, and it physically cannot open until the time is up. No override. It sounds extreme, and for some people it is. But for others, especially during the first week or two of breaking a deep habit, it provides exactly the kind of external structure that an overstimulated brain needs. Several similar products exist at different price points. We&apos;re not recommending a specific one. We&apos;re just noting that the category exists and some people find it genuinely transformative.
                    </p>
                </Subsection>
            </Section>

            <Section title="Settings you can change right now">
                <p>
                    You don&apos;t need to buy anything or download anything to make your phone meaningfully less addictive. Most of these take under five minutes.
                </p>
                <Subsection title="Turn off notifications">
                    <p>
                        Not some of them. Almost all of them. Keep calls, texts from real humans, and whatever your job genuinely requires. Turn off everything else: social media alerts, news push notifications, app badges, promotional emails. <span className="font-bold">Every notification is an interruption engineered by someone who profits from your attention.</span> Research on the salience principle shows that notifications are one of the primary external cues that trigger compulsive phone checking, and that turning them off measurably reduces the pull.
                    </p>
                </Subsection>
                <Subsection title="Switch to grayscale">
                    <p>
                        This is the single cheapest, simplest intervention with actual scientific support. Switching your phone display to black and white (grayscale mode, found in your accessibility settings) makes the screen less visually stimulating. Multiple studies have found it reduces daily screen time by roughly 20 to 50 minutes. The bright colors on your apps aren&apos;t aesthetic choices. They&apos;re designed to trigger dopamine responses. When you remove the color, the slot machine doesn&apos;t feel so urgent.
                    </p>
                    <p className="text-(--secondary-accent)">
                        On iPhone: Settings &rarr; Accessibility &rarr; Display &amp; Text Size &rarr; Color Filters &rarr; Grayscale. You can set a triple-click shortcut to toggle it on and off when you actually need color (for photos, maps, etc.).
                    </p>
                    <p className="text-(--secondary-accent)">
                        On Android: Settings &rarr; Accessibility &rarr; Color &amp; Motion (or Visibility Enhancements on Samsung) &rarr; Color Correction &rarr; Grayscale.
                    </p>
                </Subsection>
                <Subsection title="Remove social media from your home screen">
                    <p>
                        If you&apos;re not ready to delete the apps, try moving them off your home screen and into a folder several swipes deep, or accessible only through search. The goal is to add friction. You want to make opening Instagram a deliberate act, not a reflex. If you find yourself searching for the app by name and opening it anyway, that tells you something useful about how strong the habit is.
                    </p>
                </Subsection>
                <Subsection title="Use built-in screen time tools">
                    <p>
                        Both iOS (Screen Time) and Android (Digital Wellbeing) offer app timers, downtime scheduling, and usage reports. They&apos;re useful mostly as awareness tools: seeing that you spent three hours on TikTok yesterday is often more motivating than any advice. The time limits themselves are easy to override with a single tap, which makes them weaker as enforcement tools, but for some people, even that small speed bump is enough to trigger a moment of reflection.
                    </p>
                </Subsection>
                <Subsection title="Schedule Do Not Disturb">
                    <p>
                        Set your phone to enter Do Not Disturb mode automatically during times you want to protect: dinner, the hour before bed, the first hour after waking up, focused work sessions. Allow calls from favorites to come through for genuine emergencies. Everything else can wait.
                    </p>
                </Subsection>
            </Section>

            <Section title="Apps and software tools">
                <p className="mb-4">
                    There&apos;s some irony in using an app to get off your phone, and we acknowledge it. But if you&apos;re not ready to go cold turkey, tools that add friction or limit access can serve as useful stepping stones.
                </p>
                <p className="text-xs text-(--secondary-accent)">
                    We are not affiliated with, sponsored by, or receiving compensation from any of the products mentioned here. We describe what they do so you can make your own informed decision. Inclusion is not an endorsement.
                </p>
                <Subsection title="App blockers">
                    <p>
                        Brick is a physical NFC device paired with an app. You select which apps to block, tap your phone to the Brick to activate the block, and then physically leave the Brick behind. To unblock, you have to return to the device and tap again. The physical separation is the key differentiator. Unlike software-only solutions, you can&apos;t just tap &ldquo;skip&rdquo; or &ldquo;ignore limit.&rdquo; A strict mode prevents deleting the app as a workaround. It works on both iOS and Android. One-time purchase, no subscription.
                    </p>
                    <p>
                        Opal and Freedom are software-only alternatives that block apps and websites on a schedule or on demand. They&apos;re easier to override than a physical device, but they add meaningful friction and include usage tracking. Freedom works across phone, tablet, and computer.
                    </p>
                    <p>
                        one sec is a lighter-touch approach: instead of blocking apps entirely, it inserts a brief breathing exercise every time you open a selected app. The forced pause gives you a moment to ask whether you actually want to be there. Some people find this more sustainable than hard blocking.
                    </p>
                </Subsection>
                <Subsection title="Minimalist launchers">
                    <p>
                        If you use Android, you can replace your phone&apos;s entire home screen with a minimalist launcher, an app that strips away colorful icons, widgets, and visual clutter, replacing them with simple text lists of your essential apps.
                    </p>
                    <p>
                        minimalist phone is one of the more established options. It replaces your home screen with a monochrome, text-based interface and includes tools like app timers, blocking, and notification filtering. Olauncher is a free, open-source alternative with an even more aggressive approach: a single page, no icons, no widgets, just a short list of app names. Several others exist, including Before Launcher and Niagara Launcher, each with different tradeoffs between simplicity and usability.
                    </p>
                    <p>
                        On iPhone, options are more limited because Apple restricts home screen replacements. Dumbify and Blank Spaces offer widget-based workarounds that simplify the home screen appearance without fully replacing the launcher.
                    </p>
                </Subsection>
                <Subsection title="Dumbphones">
                    <p>
                        For some people, the right move is to replace the smartphone entirely, at least some of the time. A growing category of &ldquo;dumbphones&rdquo; or &ldquo;minimal phones&rdquo; offer calls, texts, and a handful of essential tools (maps, music, a basic camera) without app stores, social media, or web browsing.
                    </p>
                    <p>
                        The Light Phone (now in its third generation) is probably the most well-known, with a deliberately beautiful black-and-white interface and a philosophy of being &ldquo;designed to be used as little as possible.&rdquo; The Punkt MP02 is even more stripped down, with physical keys, no touchscreen, and built for calls and texts only. The Mudita Kompakt uses an E-Ink display and includes maps and music. Prices range from under $100 for a basic Nokia feature phone to $800 for the Light Phone III.
                    </p>
                    <p>
                        A middle path: some people keep their smartphone at home and carry a dumbphone when they go out. Others use a dumbphone during the week and their smartphone on weekends. There&apos;s no single right configuration. The goal is to find the arrangement that helps you achieve your personal goals.
                    </p>
                </Subsection>
            </Section>

            <Section title="Getting Through the First Two Weeks">
                <p>
                    The first days without social media (or with dramatically reduced phone use) can feel genuinely uncomfortable. This is normal. Some people describe it as boredom; others call it restlessness, anxiety, or a low-grade feeling that something is missing. <span className="font-bold">If you experience these difficulties, it&apos;s a good sign that reducing/quitting is a great idea for you</span>.
                </p>
                <Subsection title="The urge to check">
                    <p>
                        You will reach for your phone dozens of times a day out of pure habit, not because you need anything from it, but because your brain has been conditioned to expect a reward. The average person checks their phone <span className="italic">over 200 times a day</span>. Each time you notice the urge and don&apos;t act on it, you&apos;re weakening the habit loop and making it easier to resist next time. Most people report a significant reduction in the urge within 7–14 days.
                    </p>
                </Subsection>
                <Subsection title="Boredom is not the enemy">
                    <p>
                        We have been trained to treat boredom as a problem that needs an immediate solution, and the phone as the solution. But boredom is actually where a lot of good things start: creativity, reflection, conversation, rest. When you feel the itch to scroll and you have nothing in particular to do, try doing nothing for a few minutes. Sit with it. Embrace it. See where your mind goes. It may sound absurd, but it works.
                    </p>
                </Subsection>
                <Subsection title="Fill the gap with something physical">
                    <p>
                        The hours you reclaim from your phone need somewhere to go. If you don&apos;t consciously redirect them, you&apos;ll drift back. The most commonly reported replacements among people who successfully reduce screen time are physical: walking, cooking, gardening, exercise, reading a physical book. The physical component matters. It engages your body and senses in a way that counteracts the disembodied passivity of screen time.
                    </p>
                </Subsection>
                <Subsection title="Tell someone">
                    <p>
                        Accountability helps. Tell a friend, a partner, or a family member what you&apos;re doing and why. Ask them to check in on you or, better yet, invite them to join you. Behavioral change research consistently shows that social support is one of the strongest predictors of sustained habit change.
                    </p>
                </Subsection>
            </Section>

            <Section title="Mindfulness and Internal Work">
                <p>
                    The external changes (settings, tools, environment) are important, but they only address part of the problem. The harder part is answering the question: what am I looking for when I reach for my phone?
                </p>
                <Subsection title="Notice the trigger">
                    <p>
                        Every habitual phone check has a trigger. For some people it&apos;s boredom. For others it&apos;s anxiety, loneliness, the discomfort of an awkward social moment, or the need for validation. Start noticing what&apos;s happening right before you pick up the phone. You don&apos;t have to do anything about it at first, just take notice. A pattern will become clear over time, giving you an opportunity to address the actual need instead of the proxy.
                    </p>
                </Subsection>
                <Subsection title="The three-breath pause">
                    <p>
                        Before you open any app out of habit, take three slow breaths. That&apos;s it. The pause interrupts the automatic loop between trigger and response and gives your prefrontal cortex (the part of your brain responsible for deliberate decision-making) a chance to catch up. Apps like one sec automate this, but you can do it yourself without any technology at all.
                    </p>
                </Subsection>
                <Subsection title="Meditation and body awareness">
                    <p>
                        You don&apos;t have to become a meditator to benefit from this. Even five minutes a day of sitting quietly and paying attention to your breathing can measurably reduce the impulsivity that drives compulsive phone checking. Mindfulness practice strengthens the same attentional circuits that chronic phone use weakens. <span className="font-bold">Think of it as physical therapy for your attention span</span>.
                    </p>
                    <p>
                        If you want structure, apps like Insight Timer (free, minimal) offer guided meditations. But sitting in a quiet room and breathing is free too.
                    </p>
                </Subsection>
                <Subsection title="Journaling">
                    <p>
                        Many people find that the compulsive desire to post, share, and comment is partly a desire to process their day, their feelings, their experiences. Journaling serves the same function without the audience, the metrics, or the comparison. A notebook by your bed, a few minutes in the morning or evening. You may find it satisfies a need you didn&apos;t even know you had.
                    </p>
                </Subsection>
            </Section>

            <Section title="Social life without social media">
                <p className="mb-4">
                    This is the concern people raise most often: Won&apos;t I lose touch with everyone? It&apos;s an understandable concern. Social media has become the default infrastructure for organizing events and staying informed about the lives of people we care about. Leaving it can feel like unplugging from the social grid.
                </p>
                <p className="mb-4">This is one of the core reasons Disconnect Society exists. The more people who join us on this journey, the easier it is to connect in the real world.</p>
                <p>
                    People who&apos;ve done it tend to report: you lose touch with <span className="italic">some</span> people, <span className="font-bold">but the relationships that remain get deeper</span>.
                </p>
                <Subsection title="Practical steps">
                    <p>
                        Before you leave or reduce your social media presence:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                        <li>Save the contact information of the people you actually want to stay in touch with</li>
                        <li>Export your data from the platforms if you want to keep your photos, videos, and messages</li>
                        <li>Announce your departure so people know how to reach you</li>
                    </ul>
                    <p>
                        Replace passive social media &ldquo;connection&rdquo; with active connection:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                        <li>Send a text instead of liking a post</li>
                        <li>Call someone <span className="italic">just to talk</span> instead of watching their stories</li>
                        <li>Make plans in person instead of reacting to an event page</li>
                    </ul>
                    <p>Maintaining relationships this way takes some actual effort on your part, and that&apos;s exactly why it means more, and why it&apos;s more fulfilling.</p>
                </Subsection>
                <Subsection title="FOMO is real but temporary">
                    <p>
                        The fear of missing out is one of the strongest psychological hooks keeping people on social media. In the first few weeks after disconnecting, you will feel it acutely. You&apos;ll wonder what people are talking about, what events you&apos;re missing, what news you&apos;re not seeing. The feeling fades and is replaced, for most people, by a sense of liberation or relief. It feels really good to realize that you were never actually missing out on anything essential, and that the constant awareness of everyone else&apos;s curated lives was generating anxiety you had stopped noticing.
                    </p>
                </Subsection>
                <Subsection title="Staying informed">
                    <p>
                        Social media is an exceptionally poor way to stay informed about the world. It optimizes for engagement, not accuracy or importance. You will be <span className="italic">better</span> informed, not worse, if you replace your social media news diet with a single reputable newspaper, newsletter, or podcast that you check once a day. Many people who leave social media report that the thing they expected to miss most (staying informed) is the thing they least miss once they find an alternative.
                    </p>
                </Subsection>
            </Section>

            <Section title="A note for parents">
                <p className="mb-4">
                    If you&apos;re here because you&apos;re worried about your kids, we have a dedicated section on our <Link href="/learn/kids">Learn page covering the research on children and adolescents</Link>. But here are a few practical principles specific to this page:
                </p>
                <p className="mb-4">
                    <span className="font-bold">Model first.</span> Children learn from observation, not lectures. If you want your kid to put down their phone, they need to see you put down yours. This is harder than any parental control software, and more effective.
                </p>
                <p className="mb-4">
                    <span className="font-bold">Create phone-free family rituals.</span> Dinner, car rides, the first hour of the day, the last hour before bed. Make these non-negotiable for everyone in the household, including the adults. Any discomfort you feel at first will fade with time.
                </p>
                <p>
                    <span className="font-bold">Delay smartphone access as long as you can.</span> The &ldquo;Wait Until 8th&rdquo; movement encourages parents to hold off on giving children smartphones until at least eighth grade. A basic phone for calls and texts can cover safety needs without opening the door to social media and infinite scrolling. The longer a child develops social skills, attention, and self-regulation before encountering these platforms, the more resilient they&apos;ll be.
                </p>
            </Section>

            <Section title="Be patient with yourself">
                <p className="mb-4">
                    <span className="font-bold">You are trying to change a behavior that some of the most well-funded companies in history have spent billions of dollars engineering to be as habitual as possible</span>.
                </p>
                <p className="mb-4">
                    Slipping up doesn&apos;t mean you&apos;ve failed! It means you&apos;re human and the system is working as designed: against you.
                </p>
                <p>
                    Reducing screen time is not about perfection. It&apos;s about direction. Every hour you spend present instead of scrolling is an hour well spent, even if you scrolled the hour before it. The goal is not to become someone who never looks at a screen. The goal is to look at screens intentionally, on your terms, when it genuinely serves you, and to spend the rest of your time on things that bring you actual joy and fulfillment.
                </p>
            </Section>

        </Accordion>
    );
}
