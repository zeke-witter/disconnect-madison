import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/app/components/Accordion";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description: "Common questions about Disconnect Society, the pledge, and what it means to step back from algorithm-driven social media.",
    alternates: { canonical: "/faq" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="faq-title" className="w-full mb-10">
                <h1 id="faq-title" className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                    Frequently asked questions
                </h1>
                <p className="text-lg text-(--secondary-accent)">
                    Questions about the project, the pledge, and what it all means. If something isn&apos;t covered here, <Link href="/contact">reach out</Link>.
                </p>
            </section>

            <Accordion>

                <AccordionItem title="Who is this for?" defaultOpen>
                    <p className="mb-4">
                        Anyone. Disconnect Society isn&apos;t a club for people who&apos;ve already decided social media is ruining their lives. It&apos;s for anyone who&apos;s curious about the role these platforms play in their wellbeing and wants to think more intentionally about it.
                    </p>
                    <p>
                        That said, if you&apos;ve been feeling anxious, distracted, sleep-deprived, or vaguely unhappy and you haven&apos;t yet connected that to your phone habits, this is a good place to start. Not sure whether social media is affecting you? <Link href="/quiz">Our short quiz</Link> can help surface what you might already know on some level.
                    </p>
                </AccordionItem>

                <AccordionItem title={`Why "Disconnect Society"? Isn't the whole point connection?`}>
                    <p className="mb-4">
                        The name works on a couple of levels. Most directly, it&apos;s about disconnecting from screens and from the algorithm-driven platforms that have come to dominate our social lives. But it&apos;s also a play on words: &ldquo;social&rdquo; media has turned out, for many people, to be deeply anti-social — isolating, divisive, and engineered to keep us staring at a screen instead of looking up at the world around us.
                    </p>
                    <p>
                        We connect by disconnecting.
                    </p>
                </AccordionItem>

                <AccordionItem title="Is this a political or ideological movement?">
                    <p>
                        No. Disconnect Society is deliberately nonpartisan and non-ideological. Concern about the effects of algorithm-driven social media cuts across every political persuasion and demographic. The research isn&apos;t politically charged. We are not affiliated with any political party, company, government agency, or competitor to social media platforms. We&apos;re a community of people who think it&apos;s worth reflecting on what these platforms are doing to us and making some conscious choices in response.
                    </p>
                </AccordionItem>

                <AccordionItem title="What counts as social media?">
                    <p className="mb-4">
                        Major algorithmic platforms like Facebook, Instagram, TikTok, and X/Twitter are the obvious cases. But the line blurs quickly. Reddit, LinkedIn, YouTube, Discord, Snapchat, Twitch, and Nextdoor all share some characteristics of social media without fitting neatly into the category.
                    </p>
                    <p>
                        The honest answer is that it&apos;s subjective, and what matters most is what <span className="italic">you</span> recognize as social media in your own life, and what you believe you could have a healthier relationship with. If a platform is eating your time, stoking anxiety, or keeping you from things that matter, it probably belongs in scope.
                    </p>
                </AccordionItem>

                <AccordionItem title="What does this have to do with AI?">
                    <p className="mb-4">
                        More than you might expect. The algorithms that power social media feeds are AI: machine learning models trained to predict which content will keep you engaged the longest. When a platform surfaces something that makes you angry, anxious, or compelled to keep scrolling, that&apos;s AI doing exactly what it was designed to do. In that sense, AI is already at the center of what this project is about.
                    </p>
                    <p className="mb-4">
                        AI tools like chatbots and writing assistants are a different thing. They don&apos;t have a feed optimized to maximize your time on platform. They don&apos;t surface content designed to provoke emotional reactions. They respond when you engage with them and go quiet when you don&apos;t. That&apos;s a fundamentally different relationship than the one social media has built with your attention.
                    </p>
                    <p>
                        There&apos;s also a newer concern worth naming: AI-generated content is flooding social media platforms at scale, making feeds harder to trust and navigate. The signal-to-noise ratio is getting worse, and that&apos;s accelerating some of the same dynamics we&apos;re already worried about. Disconnect Society is skeptical of the attention economy, not technology in general.
                    </p>
                </AccordionItem>

                <AccordionItem title="What about messaging apps like WhatsApp, iMessage, or Telegram?">
                    <p className="mb-4">
                        That&apos;s a judgment call that only you can make. Messaging apps serve a different purpose than social media. They&apos;re closer to texting than to algorithmic feeds designed to maximize your engagement. Most of the time, they&apos;re not the problem.
                    </p>
                    <p>
                        That said, some people find themselves compulsively checking group chats or getting drawn into dynamics that feel more like doomscrolling than staying in touch. If a messaging app is something you feel you could be more mindful about, include it in your thinking. You&apos;re setting the terms here.
                    </p>
                </AccordionItem>

                <AccordionItem title="I use social media for work. Can I still participate?">
                    <p className="mb-4">
                        Of course. Disconnect Society isn&apos;t about moral purity or cold-turkey absolutes. If your job requires you to post, monitor, or engage on social platforms, that&apos;s a real constraint and we&apos;re not asking you to pretend otherwise.
                    </p>
                    <p>
                        What we&apos;re after is intentionality, making sure you&apos;re in control of your relationship with these platforms, not the other way around. Many people who use social media professionally find it useful to clearly separate work use from personal use: specific times for each, work accounts off personal devices, and clear rules about when they&apos;re &ldquo;on&rdquo; and when they&apos;re not.
                    </p>
                </AccordionItem>

                <AccordionItem title="Why pledge? Can't I just try to cut back on my own?">
                    <p className="mb-4">
                        You absolutely can. A pledge is a tool, not a requirement.
                    </p>
                    <p className="mb-4">
                        What a pledge adds is intentionality and, if you share it, a layer of accountability. Making a commitment, especially a public one, meaningfully increases the likelihood of following through. That&apos;s not just intuition; it&apos;s a consistent finding in behavioral research on habit change.
                    </p>
                    <p>
                        There&apos;s also a social dimension. When you share your pledge, you open a door for the people around you to reflect on their own habits. You don&apos;t have to evangelize. You just have to say: <span className="italic">I did this, and here&apos;s why.</span> That kind of quiet modeling is one of the most effective ways behavior change spreads through communities.
                    </p>
                </AccordionItem>

                <AccordionItem title="How is my email address used when I take the pledge?">
                    <p>
                        Your email is used only to verify your pledge, to confirm it was submitted by a real person and to prevent duplicate submissions. You&apos;ll receive one confirmation email. That&apos;s it. Your address is never shared with anyone, never used for marketing, and never added to a mailing list. We have no interest in your inbox beyond confirming your pledge.
                    </p>
                </AccordionItem>

                <AccordionItem title="Isn't it hypocritical to promote quitting social media on social media?">
                    <p className="mb-4">
                        We don&apos;t believe so. Having a healthy, intentional relationship with social media platforms is entirely possible. But for many people it takes conscious effort, because these platforms are engineered to prevent exactly that. Using them deliberately to share a message about intentional use isn&apos;t a contradiction.
                    </p>
                    <p>
                        There&apos;s also a practical reality: the people who stand to benefit most from stepping back are spending a lot of time on social media. If we want to reach them, we have to meet them where they are. A post about reconnecting with the real world, shared on Instagram, might be the thing that prompts someone to put down their phone and take a walk. We&apos;ll take it.
                    </p>
                </AccordionItem>

                <AccordionItem title="Will I lose touch with people if I step back from social media?">
                    <p className="mb-4">
                        Possibly, though usually less than people expect. What tends to happen is that some weaker connections fade, largely because they were sustained by passive engagement (likes, reactions, story views) rather than genuine contact, while relationships that actually matter in your life get <em>more</em> direct attention.
                    </p>
                    <p className="mb-4">
                        Before you reduce or leave, it&apos;s worth saving the contact information of people you want to stay in touch with and letting them know how to reach you.
                    </p>
                    <p>
                        The relationships that survive the transition tend to get deeper. A text, a call, or a cup of coffee takes more effort than a like, and that&apos;s exactly why it means more.
                    </p>
                </AccordionItem>

                <AccordionItem title="What about my photos, videos, and posts? I don't want to lose all of that.">
                    <p className="mb-4">
                        You don&apos;t have to. Every major platform has a tool that lets you export your data: your photos, videos, posts, messages, and more. It takes a few minutes and gives you a local copy of everything before you go. If preserving your history matters to you, do that first.
                    </p>
                    <p>
                        That said, it&apos;s worth asking yourself an honest question: are you afraid of losing your <span className="italic">content</span>, or afraid of losing your <span className="italic">presence</span>? The photos are easy to keep. What&apos;s harder to let go of is the profile, the follower count, the record of being there. If that&apos;s the part that feels significant, that&apos;s worth sitting with.
                    </p>
                </AccordionItem>

                <AccordionItem title="How can I help or get involved?">
                    <p className="mb-4">
                        We&apos;re glad you asked. Take a look at the <Link href="/grow">Grow page</Link> for a few specific ways to help, including a printable flyer you can post around your community. If you have skills you&apos;d like to contribute, especially in graphic design, community organizing, or outreach, <Link href="/contact">get in touch</Link> and tell us what you have in mind.
                    </p>
                    <p>
                        Disconnect Society is run by one person with no budget. Any help, however small, is genuinely valued.
                    </p>
                </AccordionItem>

            </Accordion>

        </div>
    );
}
