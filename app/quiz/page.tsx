'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RadioGroup, Radio } from '@headlessui/react'

const questions = [
    {
        id: 'daily-time',
        question: "How much time do you spend on social media on a typical day?",
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
        question: "Do you feel uneasy or anxious when you can't check your phone?",
        options: [
            { label: "No. I'm usually fine without it", value: 0 },
            { label: "A little, sometimes", value: 1 },
            { label: "Somewhat. I notice the urge", value: 2 },
            { label: "Yes, it's hard to ignore", value: 3 },
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

type ResultLevel = 'low' | 'medium' | 'high'

function getLevel(score: number): ResultLevel {
    if (score <= 7) return 'low'
    if (score <= 17) return 'medium'
    return 'high'
}

const results: Record<ResultLevel, { title: string; body: string; links: { href: string; label: string }[] }> = {
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
            { href: '/pledge', label: 'Take the pledge' },
            { href: '/learn', label: 'Read the research' },
        ],
    },
    high: {
        title: "Your phone might be taking more than you realize",
        body: "Your responses suggest that social media is affecting your sleep, mood, focus, or time in ways worth taking seriously. You're not alone! These platforms are engineered to make this hard to notice and harder to change. The good news: most people who step back, even briefly, notice meaningful improvements within the first couple of weeks.",
        links: [
            { href: '/help-yourself', label: 'How to help yourself' },
            { href: '/pledge', label: 'Take the pledge' },
            { href: '/learn', label: 'Read the research' },
            { href: '/about', label: 'Read our story' },
        ],
    },
}

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [selectedValue, setSelectedValue] = useState<number | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    const total = questions.length
    const current = questions[currentIndex]

    function handleNext() {
        if (selectedValue === null) return
        const newAnswers = [...answers, selectedValue]
        if (currentIndex < total - 1) {
            setAnswers(newAnswers)
            setCurrentIndex(currentIndex + 1)
            setSelectedValue(null)
        } else {
            const score = newAnswers.reduce((sum, v) => sum + v, 0)
            setFinalScore(score)
            setShowResults(true)
        }
    }

    function handlePrevious() {
        if (currentIndex === 0) return
        const prevAnswer = answers[currentIndex - 1]
        setAnswers(answers.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
        setSelectedValue(prevAnswer)
    }

    function handleReset() {
        setCurrentIndex(0)
        setAnswers([])
        setSelectedValue(null)
        setShowResults(false)
        setFinalScore(0)
    }

    if (showResults) {
        const level = getLevel(finalScore)
        const result = results[level]
        const pct = Math.round((finalScore / 30) * 100)

        return (
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto font-[family-name:var(--font-space-grotesk)]">
                <div className="w-full">
                    <p className="text-sm text-(--secondary-accent) mb-1">Your score</p>
                    <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-handjet text-6xl font-bold text-(--primary-accent)">{finalScore}</span>
                        <span className="text-(--secondary-accent) text-lg">out of 30</span>
                    </div>
                    <div className="w-full bg-(--secondary-accent)/20 rounded-full h-2 mb-10" role="meter" aria-valuenow={finalScore} aria-valuemin={0} aria-valuemax={30} aria-label={`Score: ${finalScore} out of 30`}>
                        <div
                            className="bg-(--primary-accent) h-2 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                        />
                    </div>

                    <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-6">{result.title}</h1>
                    <p className="text-lg text-(--secondary-accent) leading-relaxed mb-10">{result.body}</p>

                    <div className="space-y-3 mb-10">
                        {result.links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="link-card flex items-center justify-between rounded-md border border-(--secondary-accent) p-4 hover:border-(--primary-accent) hover:bg-(--primary-accent)/5 transition-colors group"
                            >
                                <span className="font-semibold group-hover:text-(--primary-color)">{link.label}</span>
                                <span className="text-(--secondary-accent)" aria-hidden="true">→</span>
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={handleReset}
                        className="text-sm text-(--secondary-accent) underline hover:text-(--primary-accent) transition-colors"
                    >
                        Take the quiz again
                    </button>
                </div>

                <p className="w-full text-xs text-(--secondary-accent) mt-12 pt-6 border-t border-(--secondary-accent)/30">
                    This quiz is meant to prompt self-reflection, not provide a diagnosis. It is not a clinical assessment tool.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section aria-labelledby="quiz-title" className="w-full mb-8">
                <h1 id="quiz-title" className="font-handjet text-5xl lg:text-7xl font-bold mb-2">
                    Is social media affecting you?
                </h1>
                <p className="text-(--secondary-accent)">10 questions. No account needed. Nothing is recorded.</p>
                {currentIndex === 0 && (
                    <p className="text-sm text-(--secondary-accent) mt-3">
                        Answer honestly. There are no wrong answers here, and no one is keeping score but you. This isn&apos;t about feeling bad. It&apos;s about getting an honest look at what might be worth changing.
                    </p>
                )}
            </section>

            <div className="w-full mb-8">
                <div className="flex justify-between text-sm text-(--secondary-accent) mb-2">
                    <span>Question {currentIndex + 1} of {total}</span>
                </div>
                <div className="w-full bg-(--secondary-accent)/20 rounded-full h-1.5" aria-hidden="true">
                    <div
                        className="bg-(--primary-accent) h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                    />
                </div>
            </div>

            <div className="w-full" key={currentIndex}>
                <p id={`question-${currentIndex}`} className="text-xl font-bold mb-6">
                    {current.question}
                </p>
                <RadioGroup
                    value={selectedValue as number}
                    onChange={(v: number) => setSelectedValue(v)}
                    aria-labelledby={`question-${currentIndex}`}
                    className="space-y-3"
                >
                    {current.options.map((option) => (
                        <Radio
                            key={option.value}
                            value={option.value}
                            className="group flex items-center gap-3 cursor-pointer rounded-md border border-(--secondary-accent) p-4 transition-colors data-checked:border-(--primary-accent) data-checked:bg-(--primary-accent)/10 w-full text-left"
                        >
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-(--secondary-accent) group-data-checked:border-(--primary-accent)">
                                <span className="invisible size-2.5 rounded-full bg-(--primary-accent) group-data-checked:visible" />
                            </span>
                            <span>{option.label}</span>
                        </Radio>
                    ))}
                </RadioGroup>

                <div className="mt-8 flex gap-3">
                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="rounded-md border border-(--secondary-accent) px-5 py-3 font-handjet text-2xl font-bold transition-colors hover:border-(--primary-accent) hover:text-(--primary-accent)"
                        >
                            ← Previous
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={selectedValue === null}
                        className="flex-1 rounded-md bg-(--primary-accent) px-6 py-3 font-handjet text-2xl font-bold text-white transition-colors hover:bg-(--primary-accent-hover) disabled:opacity-30"
                    >
                        {currentIndex < total - 1 ? 'Next' : 'See my results'}
                    </button>
                </div>
            </div>

            <p className="w-full text-xs text-(--secondary-accent) mt-12 pt-6 border-t border-(--secondary-accent)/30">
                This quiz is meant to prompt self-reflection, not provide a diagnosis. It is not a clinical assessment tool.
            </p>
        </div>
    )
}
