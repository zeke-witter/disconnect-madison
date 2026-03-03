import { describe, it, expect } from 'vitest'
import { getLevel, questions, results } from '@/lib/quiz'

describe('getLevel', () => {
    it('returns low for score 0', () => {
        expect(getLevel(0)).toBe('low')
    })

    it('returns low for score 7 (upper boundary)', () => {
        expect(getLevel(7)).toBe('low')
    })

    it('returns medium for score 8 (lower boundary)', () => {
        expect(getLevel(8)).toBe('medium')
    })

    it('returns medium for score 17 (upper boundary)', () => {
        expect(getLevel(17)).toBe('medium')
    })

    it('returns high for score 18 (lower boundary)', () => {
        expect(getLevel(18)).toBe('high')
    })

    it('returns high for score 30 (maximum)', () => {
        expect(getLevel(30)).toBe('high')
    })
})

describe('score calculation', () => {
    it('sums all zero answers to 0', () => {
        const answers = Array(10).fill(0)
        expect(answers.reduce((sum, v) => sum + v, 0)).toBe(0)
    })

    it('sums all max answers to 30', () => {
        const answers = Array(10).fill(3)
        expect(answers.reduce((sum, v) => sum + v, 0)).toBe(30)
    })

    it('sums a known mixed set correctly', () => {
        const answers = [0, 1, 2, 3, 1, 2, 0, 3, 1, 2]
        expect(answers.reduce((sum, v) => sum + v, 0)).toBe(15)
    })

    it('score 15 maps to medium', () => {
        expect(getLevel(15)).toBe('medium')
    })
})

describe('questions data integrity', () => {
    it('has exactly 10 questions', () => {
        expect(questions).toHaveLength(10)
    })

    it('each question has exactly 4 options', () => {
        questions.forEach(q => {
            expect(q.options).toHaveLength(4)
        })
    })

    it('each question has options with values [0, 1, 2, 3] in order', () => {
        questions.forEach(q => {
            expect(q.options.map(o => o.value)).toEqual([0, 1, 2, 3])
        })
    })

    it('each question has a non-empty id and question text', () => {
        questions.forEach(q => {
            expect(q.id.length).toBeGreaterThan(0)
            expect(q.question.length).toBeGreaterThan(0)
        })
    })

    it('all question ids are unique', () => {
        const ids = questions.map(q => q.id)
        expect(new Set(ids).size).toBe(ids.length)
    })
})

describe('results data integrity', () => {
    const levels = ['low', 'medium', 'high'] as const

    it.each(levels)('result "%s" has a non-empty title and body', (level) => {
        expect(results[level].title.length).toBeGreaterThan(0)
        expect(results[level].body.length).toBeGreaterThan(0)
    })

    it.each(levels)('result "%s" has at least one link with valid href and label', (level) => {
        expect(results[level].links.length).toBeGreaterThan(0)
        results[level].links.forEach(link => {
            expect(link.href).toMatch(/^\//)
            expect(link.label.length).toBeGreaterThan(0)
        })
    })

    it('all result levels are defined', () => {
        expect(results.low).toBeDefined()
        expect(results.medium).toBeDefined()
        expect(results.high).toBeDefined()
    })
})
