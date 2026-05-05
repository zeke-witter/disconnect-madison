# app/quiz/ — Self-Reflection Quiz

## Overview

10-question self-reflection quiz that scores the user's relationship with social media. No account required. Nothing stored — entirely client-side.

`page.tsx` is a Client Component (`'use client'`) since it manages question progression and score state.

`layout.tsx` exists only for metadata (title, description, canonical).

## Data Source

All quiz data lives in `lib/quiz.ts`:

```typescript
import { questions, getLevel, results } from '@/lib/quiz';
```

## Questions

10 questions, each with 4 options scored 0–3. Total possible score: 0–30.

Topics: daily screen time, morning phone-checking, post-use mood, difficulty cutting back, unintended scrolling, sleep impact, self-worth effects, phone separation anxiety, displaced activities, stress coping.

## Scoring

```typescript
export function getLevel(score: number): ResultLevel {
    if (score <= 7)  return 'low'
    if (score <= 17) return 'medium'
    return 'high'
}
```

| Score | Level | Meaning |
|---|---|---|
| 0–7 | `low` | Relatively balanced relationship |
| 8–17 | `medium` | Worth paying attention to |
| 18–30 | `high` | Significant impact detected |

## Results

Each level maps to `{ title, body, links[] }` in `lib/quiz.ts`:
- `low`: links to `/learn`, `/help-yourself`
- `medium`: links to `/help-yourself`, `/breathe`, `/pledge`, `/learn`
- `high`: links to `/breathe`, `/help-yourself`, `/pledge`, `/learn`, `/about`

## Page Behavior

- One question shown at a time (no scrolling through all at once)
- Back button to revisit previous answers
- Score calculated on final submission
- Result screen shows level title, body text, and relevant CTA links
- No state is persisted — refreshing resets the quiz

## Adding or Changing Questions

Edit `lib/quiz.ts` only. The page component reads `questions` dynamically, so no changes to `page.tsx` are needed for content edits. If changing score thresholds, update `getLevel()` and verify the result level boundaries still make sense.
