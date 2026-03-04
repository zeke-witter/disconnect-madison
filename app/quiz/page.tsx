'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RadioGroup, Radio } from '@headlessui/react'
import { questions, results, getLevel } from '@/lib/quiz'

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [selectedValue, setSelectedValue] = useState<number | null>(null)
    const [showResults, setShowResults] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    // Restore progress from sessionStorage on mount (avoids hydration mismatch)
    useEffect(() => {
        const saved = sessionStorage.getItem('quiz-progress')
        if (!saved) return
        try {
            const data = JSON.parse(saved)
            setCurrentIndex(data.currentIndex ?? 0)
            setAnswers(data.answers ?? [])
            setSelectedValue(data.selectedValue ?? null)
            setShowResults(data.showResults ?? false)
            setFinalScore(data.finalScore ?? 0)
        } catch {
            sessionStorage.removeItem('quiz-progress')
        }
    }, [])

    // Save progress whenever state changes, but skip the true initial state
    // to avoid overwriting a restored save before the restore effect has applied it
    useEffect(() => {
        if (selectedValue === null && answers.length === 0 && !showResults) return
        sessionStorage.setItem('quiz-progress', JSON.stringify({
            currentIndex, answers, selectedValue, showResults, finalScore,
        }))
    }, [currentIndex, answers, selectedValue, showResults, finalScore])

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
        sessionStorage.removeItem('quiz-progress')
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
                    How is your screen time affecting you?
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
