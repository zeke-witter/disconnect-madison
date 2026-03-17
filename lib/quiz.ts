export const questions = [
    {
        id: 'daily-time',
        question: "How much time do you spend on your phone on a typical day?",
        options: [
            { label: "Less than 30 minutes", value: 0 },
            { label: "Around an hour", value: 1 },
            { label: "2–3 hours", value: 2 },
            { label: "More than 3 hours", value: 3 },
        ],
    },
    {
        id: 'morning',
        question: "Do you check your phone first thing in the morning?",
        options: [
            { label: "No. I usually wait at least an hour", value: 0 },
            { label: "Sometimes, in the first 30 minutes", value: 1 },
            { label: "Usually, within a few minutes of waking up", value: 2 },
            { label: "It's the very first thing I do", value: 3 },
        ],
    },
    {
        id: 'feeling-after',
        question: "How do you usually feel after spending time on social media?",
        options: [
            { label: "The same or better. I enjoy it", value: 0 },
            { label: "Sometimes drained or a bit restless", value: 1 },
            { label: "Often anxious, irritable, or down", value: 2 },
            { label: "Almost always worse than before I opened it", value: 3 },
        ],
    },
    {
        id: 'cutting-back',
        question: "Have you ever tried to use social media less and found it harder than expected?",
        options: [
            { label: "I haven't really tried to cut back", value: 0 },
            { label: "A little harder than I expected", value: 1 },
            { label: "Noticeably hard. I keep coming back", value: 2 },
            { label: "Very difficult. I've tried many times and it doesn't stick", value: 3 },
        ],
    },
    {
        id: 'distraction',
        question: "Do you find yourself scrolling when you meant to be doing something else?",
        options: [
            { label: "Rarely or never", value: 0 },
            { label: "Occasionally", value: 1 },
            { label: "Often", value: 2 },
            { label: "Almost constantly", value: 3 },
        ],
    },
    {
        id: 'sleep',
        question: "How often does your phone use interfere with your sleep?",
        options: [
            { label: "Rarely. I put it down well before bed", value: 0 },
            { label: "Sometimes. I check it before bed but sleep fine", value: 1 },
            { label: "Often. I scroll late and don't get enough sleep", value: 2 },
            { label: "Most nights. I lose real sleep to my phone", value: 3 },
        ],
    },
    {
        id: 'self-worth',
        question: "Does social media ever make you feel worse about yourself or your life?",
        options: [
            { label: "No. It doesn't affect how I see myself", value: 0 },
            { label: "Occasionally", value: 1 },
            { label: "Often", value: 2 },
            { label: "Yes, most of the time I use it", value: 3 },
        ],
    },
    {
        id: 'anxiety',
        question: "Picture locking your phone in a sealed box for 24 hours. No access, no exceptions. What do you feel right now, just imagining it?",
        options: [
            { label: "Relieved, honestly. I could use the break.", value: 0 },
            { label: "A little uneasy, if I'm honest.", value: 1 },
            { label: "Uncomfortable. I'm already thinking of reasons I'd need it.", value: 2 },
            { label: "Anxious. I can feel it just picturing it.", value: 3 },
        ],
    },
    {
        id: 'displacement',
        question: "Are there hobbies, relationships, or activities you've let slide because of screen time?",
        options: [
            { label: "Not really", value: 0 },
            { label: "Maybe a few small things", value: 1 },
            { label: "Yes, some things that used to matter to me", value: 2 },
            { label: "Yes, significantly", value: 3 },
        ],
    },
    {
        id: 'coping',
        question: "When you feel bored, lonely, or stressed, what's your first instinct?",
        options: [
            { label: "Usually not to reach for my phone", value: 0 },
            { label: "Sometimes to reach for it", value: 1 },
            { label: "Usually to reach for it", value: 2 },
            { label: "Almost always. It's my automatic response", value: 3 },
        ],
    },
]

export type ResultLevel = 'low' | 'medium' | 'high'

export function getLevel(score: number): ResultLevel {
    if (score <= 7) return 'low'
    if (score <= 17) return 'medium'
    return 'high'
}

export const results: Record<ResultLevel, { title: string; body: string; links: { href: string; label: string }[] }> = {
    low: {
        title: "Things look pretty balanced",
        body: "Your responses don't show strong signs that social media is significantly affecting your wellbeing, at least not in the ways these questions can surface. Habits shift gradually, though, and it's worth checking in with yourself periodically. If something feels off that these questions didn't capture, trust that instinct.",
        links: [
            { href: '/learn', label: 'What the research says' },
            { href: '/help-yourself', label: 'Tips for staying balanced' },
        ],
    },
    medium: {
        title: "Worth paying attention to",
        body: "Some of your habits suggest that social media may be taking a quiet toll. It's not a crisis, but there are real benefits to being more intentional about how and when you use it. Many people in this range find that even modest changes make a noticeable difference in mood, sleep, and focus.",
        links: [
            { href: '/help-yourself', label: 'How to help yourself' },
            { href: '/breathe', label: 'Try a breathing exercise' },
            { href: '/pledge', label: 'Take the pledge' },
            { href: '/learn', label: 'Read the research' },
        ],
    },
    high: {
        title: "Your phone might be taking more than you realize",
        body: "Your responses suggest that social media is affecting your sleep, mood, focus, or time in ways worth taking seriously. You're not alone! These platforms are engineered to make this hard to notice and harder to change. The good news: most people who step back, even briefly, notice meaningful improvements within the first couple of weeks.",
        links: [
            { href: '/breathe', label: 'Try a breathing exercise' },
            { href: '/help-yourself', label: 'How to help yourself' },
            { href: '/pledge', label: 'Take the pledge' },
            { href: '/learn', label: 'Read the research' },
            { href: '/about', label: 'Read our story' },
        ],
    },
}
