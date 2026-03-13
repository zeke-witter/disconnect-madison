'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const DistractedDrivingChart = dynamic(() => import('./DistractedDrivingChart'), { ssr: false });

type Category = 'all' | 'wellbeing' | 'mind' | 'bigger-picture';

type Card = {
    id: string;
    category: Exclude<Category, 'all'>;
    title: string;
    hook: string;
    bullets: string[];
    href?: string;
};

const DATA_TAGS = [
    'Location', 'Device identifiers', 'Browsing history', 'Contact list',
    'Message timing', 'Scroll behavior', 'Time on post', 'App usage patterns',
    'Purchase intent', 'Camera access', 'Microphone access', 'Behavioral fingerprint',
];

const CARDS: Card[] = [
    {
        id: 'depression',
        category: 'wellbeing',
        title: 'Depression & Anxiety',
        hook: 'Limiting daily social media use can measurably reduce depression and anxiety scores, an effect documented in randomized experiments, not just surveys.',
        bullets: [
            'A 2018 randomized experiment at the University of Pennsylvania assigned participants to limit Instagram, Facebook, and Snapchat to 10 minutes each per day. After three weeks, they reported significant reductions in loneliness and depression compared to the control group.',
            'The relationship appears dose-dependent: the more time spent, the stronger the association with worse outcomes, particularly for passive use (scrolling without interacting or posting).',
            'Girls who increase social media use show steeper rises in depressive symptoms than boys, suggesting differential vulnerability by gender and age.',
            'Fear of missing out (FOMO) and upward social comparison are among the proposed mechanisms. Seeing curated highlights of others\' lives reliably lowers mood even when people know the images are curated.',
        ],
    },
    {
        id: 'sleep',
        category: 'wellbeing',
        title: 'Sleep Disruption',
        hook: 'Nighttime scrolling consistently delays sleep onset. Poor sleep is one of the strongest predictors of diminished mental and physical health.',
        href: '/learn/sleep',
        bullets: [
            'Blue light from phone screens suppresses melatonin production, delaying the body\'s sleep signal even at moderate brightness levels.',
            'Social media triggers cognitive arousal (excitement, anxiety, FOMO) that competes with the mental wind-down sleep requires. The content itself is the problem, not just the light.',
            'Teens who use devices after lights-out sleep 20 to 60 fewer minutes per night on average, according to several large studies.',
            'Chronic sleep restriction impairs memory consolidation, emotional regulation, immune function, and long-term cardiovascular health. The effects compound across days and weeks.',
        ],
    },
    {
        id: 'loneliness',
        category: 'wellbeing',
        title: 'Loneliness & Social Comparison',
        hook: 'Scrolling without engaging (passive consumption) is consistently linked to increased loneliness, not less.',
        bullets: [
            'Young adults who use social media heavily are more than three times as likely to feel socially isolated compared to light users, according to a 2017 study.',
            'Platforms surface the most aspirational content from your network by design, creating a systematically distorted picture of how others are living.',
            'The comparison effect doesn\'t require interaction. Simply viewing others\' highlight reels is enough to trigger downward self-evaluation.',
            'Active use (posting, messaging, commenting) is consistently associated with better well-being outcomes than passive scrolling, but passive use is the dominant mode for most users.',
        ],
    },
    {
        id: 'body-image',
        category: 'wellbeing',
        title: 'Body Image & Self-Perception',
        hook: 'Image-heavy platforms increase body dissatisfaction, especially in adolescents. Major platforms have acknowledged this in their own internal research.',
        bullets: [
            'A 2021 Wall Street Journal investigation revealed that Facebook\'s own internal research found Instagram made body image worse for one in three teenage girls.',
            'A systematic review of 20 studies found consistent links between social media use and body image concerns, with the strongest effects on appearance-focused platforms like Instagram and TikTok.',
            'Beauty filters and fitness content activate social comparison even when users know the images are edited or algorithmically selected for engagement.',
            'Boys are not immune: research shows increased body dissatisfaction and muscle dysmorphia in males who frequently view physique-focused content.',
        ],
    },
    {
        id: 'attention',
        category: 'mind',
        title: 'Attention & Focus',
        hook: 'Your phone doesn\'t have to be in your hand to affect your thinking. Its mere presence on a desk reduces working memory and fluid intelligence.',
        bullets: [
            'A University of Texas study found that leaving a phone in another room produced better cognitive performance than keeping it on a desk, face-down and silent. Out of sight produced meaningfully better results.',
            'Heavy media multitaskers show reduced ability to filter irrelevant information and maintain working memory compared to light multitaskers, even when they aren\'t multitasking at the time of testing.',
            'The average office worker is interrupted every 3 to 5 minutes and takes up to 23 minutes to return to deep focus after each interruption. Notifications are the primary driver.',
            'Adolescent brains are still developing the prefrontal cortex responsible for sustained attention, making them especially susceptible to the habit-forming effects of habitual task-switching.',
        ],
    },
    {
        id: 'driving',
        category: 'mind',
        title: 'Distracted Driving',
        hook: 'In 2023, distracted driving killed 3,275 people. At highway speed, a 5-second glance at your phone covers the length of a football field.',
        bullets: [
            'In 2023, distracted driving killed 3,275 people and injured nearly 325,000 more in the U.S. The real numbers are likely higher; police reports routinely undercount phone involvement because drivers rarely admit it.',
            'More than one in five U.S. drivers report using their phone for social media, video calls, or video watching on most or all of their trips.',
            'Reading or sending a text diverts your eyes for about five seconds. At highway speed, that\'s the length of a football field traveled without looking at the road.',
            'Young drivers ages 15 to 20 are disproportionately represented in phone-related fatal crashes relative to their share of total drivers.',
            'Hands-free calling is not meaningfully safer. Research shows it produces cognitive distraction comparable to handheld use. The problem is divided attention, not where the hands are.',
            'Voice-to-text and similar alternatives still require drivers to mentally compose messages, pulling cognitive focus from the road.',
        ],
    },
    {
        id: 'dependency',
        category: 'mind',
        title: 'Dependency & Cognitive Development',
        hook: 'When information is always a search away, we stop committing it to memory. We remember where to find things, not what they mean.',
        bullets: [
            'A widely cited study in Science found that when people know information is available online, they are less likely to encode it in memory. Researchers call this the Google Effect.',
            'GPS reliance has measurable effects on spatial memory and hippocampal activity. People who navigate without GPS show greater engagement of the brain regions responsible for spatial reasoning.',
            'A study on tweens (ages 10 to 12) found that heavier smartphone use was associated with reduced capacity for complex critical thinking.',
            'Calculator and spell-check dependency show similar patterns: when tools handle the operation, the underlying skill atrophies from disuse. Smartphones and AI assistants may be accelerating this across a much wider range of cognitive functions.',
        ],
    },
    {
        id: 'polarization',
        category: 'bigger-picture',
        title: 'Polarization & Outrage',
        hook: 'Outrage spreads faster and further than calm content. Engagement-maximizing algorithms know this, and they optimize for it.',
        bullets: [
            'A 2021 internal Facebook report, later reported by journalists, acknowledged that its algorithms were amplifying divisive content because it generated more engagement than neutral content.',
            'Research published in Science found that false news spreads six times faster than true news on Twitter, driven primarily by human sharing rather than bots.',
            'The emotional intensity of a post is more predictive of how widely it spreads than its accuracy or importance.',
            'Long-term heavy social media use is associated with increased political polarization and reduced tolerance for opposing viewpoints, even after controlling for pre-existing beliefs.',
        ],
    },
    {
        id: 'data',
        category: 'bigger-picture',
        title: 'Your Data',
        hook: 'Social media apps know more about you than most people realize, and much of it is collected even when you\'re not actively posting.',
        bullets: [
            'Have you ever heard someone say the algorithm knows you better than you know yourself? When you use a social media app, you\'re sharing more than you might expect: your location, device identifiers, browsing history, contacts, message timing, scroll speed, behavioral patterns like how long you pause on a post, and more.',
            'Most platforms say they don\'t sell your data, but they DO "share" it with advertisers, measurement firms, and business partners. In practice, that distinction matters less than it sounds.',
            'You have little control over where that data eventually goes. Companies are acquired. Data brokers buy and resell profile information. Servers are breached. Data that seems harmless in isolation can become sensitive when changing hands.',
            'Many apps request permissions (microphone, camera, contacts) that go well beyond their core function. The average user would need roughly 76 work days per year to read all the privacy policies they encounter.',
            'This is not specific to any one platform. It is a structural feature of the attention economy\'s business model: your attention is the product, and your data is what proves you paid it.',
        ],
    },
    {
        id: 'ecological',
        category: 'bigger-picture',
        title: 'Data Centers & Ecological Impact',
        hook: 'The infrastructure powering social media consumes enormous amounts of energy and water, and AI-driven content is accelerating that demand.',
        href: '/learn/ecological-impact',
        bullets: [
            'Global data center electricity consumption reached an estimated 200 to 250 TWh in 2022, roughly 1% of worldwide demand, and the share is growing as AI workloads expand.',
            'Many data centers require millions of gallons of water per day for cooling. Microsoft, Google, and Meta have all reported significant increases in water consumption alongside AI expansion.',
            'Video streaming (a major component of social media feeds) accounts for roughly 60% of global internet traffic and a substantial share of the sector\'s carbon footprint.',
            'The environmental costs are largely invisible to end users. Nothing in a social media app signals the physical resources consumed to deliver it.',
            'Data centers arrive with big promises about jobs. The permanent employment numbers rarely match the pitch: Meta\'s $1 billion Beaver Dam facility, for example, is expected to create roughly 100 long-term positions. The Brookings Institution has noted that the standard data center model delivers short-term construction work but little durable local economic upside.',
        ],
    },
];

const FILTERS: { label: string; value: Category }[] = [
    { label: 'All topics', value: 'all' },
    { label: 'Your wellbeing', value: 'wellbeing' },
    { label: 'Your mind', value: 'mind' },
    { label: 'The bigger picture', value: 'bigger-picture' },
];

const SHADOW_BASE = '0 4px 20px rgba(0,0,0,0.10)';
const SHADOW_RESET = '0 2px 8px rgba(0,0,0,0.06)';

function TiltCard({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);
    const rafRef = useRef<number>(0);
    const [style, setStyle] = useState<React.CSSProperties>({
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
        boxShadow: SHADOW_RESET,
        transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    });

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    function applyTilt(clientX: number, clientY: number) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const el = ref.current;
            if (!el) return;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            const rotX = -y * 10;
            const rotY = x * 10;
            setStyle({
                transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`,
                boxShadow: `${-rotY * 2}px ${rotX * 2 + 8}px 28px rgba(0,0,0,0.16)`,
                transition: 'transform 0.08s ease-out, box-shadow 0.08s ease-out',
            });
        });
    }

    function resetTilt() {
        cancelAnimationFrame(rafRef.current);
        setStyle({
            transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
            boxShadow: SHADOW_BASE,
            transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
        });
    }

    return (
        <button
            ref={ref}
            onClick={onClick}
            onMouseMove={e => applyTilt(e.clientX, e.clientY)}
            onMouseEnter={e => applyTilt(e.clientX, e.clientY)}
            onMouseLeave={resetTilt}
            onTouchMove={e => {
                const t = e.touches[0];
                applyTilt(t.clientX, t.clientY);
            }}
            onTouchEnd={resetTilt}
            style={style}
            className="border border-(--secondary-accent) hover:border-(--primary-color) rounded-md p-6 flex flex-col h-70 relative overflow-hidden text-left w-full cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-(--primary-color)"
        >
            {children}
        </button>
    );
}

export default function LearnGrid() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<Category>('all');
    const [openCard, setOpenCard] = useState<Card | null>(null);

    const filtered = activeFilter === 'all' ? CARDS : CARDS.filter(c => c.category === activeFilter);

    return (
        <>
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by topic">
                {FILTERS.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setActiveFilter(f.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${activeFilter === f.value
                            ? 'bg-(--primary-color) border-(--primary-color) text-white'
                            : 'border-(--secondary-accent) text-(--secondary-accent) hover:border-(--primary-color) hover:text-(--primary-color)'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {filtered.map(card => (
                    <TiltCard key={card.id} onClick={() => setOpenCard(card)}>
                        <h2 className="font-bold text-lg mb-2 text-(--primary-color) shrink-0">{card.title}</h2>
                        <p className="text-sm font-semibold leading-snug mb-2 shrink-0">{card.hook}</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-(--secondary-accent)">
                            {card.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                        <div
                            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none flex items-end justify-end pb-4 pr-5"
                            style={{ background: 'linear-gradient(to top, var(--background) 40%, transparent)' }}
                        >
                            <span className="text-xs font-semibold text-(--primary-color) flex items-center gap-1">
                                Read more <span aria-hidden="true">↓</span>
                            </span>
                        </div>
                    </TiltCard>
                ))}
            </div>

            <Dialog open={openCard !== null} onClose={() => setOpenCard(null)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg rounded-lg bg-(--background) p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-(--secondary-accent)/30">
                        <div className="h-1 bg-(--primary-color) -mx-8 -mt-8 mb-6 rounded-t-lg" />
                        <div className="flex items-start justify-between mb-4">
                            <DialogTitle className="font-bold text-xl text-(--primary-color)">
                                {openCard?.title}
                            </DialogTitle>
                            <button
                                onClick={() => setOpenCard(null)}
                                className="ml-4 text-(--secondary-accent) hover:text-(--foreground) cursor-pointer shrink-0"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        {openCard?.id === 'driving' && <DistractedDrivingChart />}
                        {openCard?.id === 'data' && (
                            <div className="mb-5">
                                <p className="text-xs font-semibold text-(--secondary-accent) uppercase tracking-wide mb-2">Data collected during typical use</p>
                                <div className="flex flex-wrap gap-2">
                                    {DATA_TAGS.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 text-xs rounded-full border border-(--secondary-accent) text-(--secondary-accent)">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <ul className="list-disc pl-5 space-y-3 text-sm">
                            {openCard?.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                        {openCard?.href && (
                            <p className="mt-5 text-sm">
                                <a
                                    href={openCard.href}
                                    className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)"
                                    onClick={() => setOpenCard(null)}
                                >
                                    There&apos;s more. Read the full breakdown →
                                </a>
                            </p>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
