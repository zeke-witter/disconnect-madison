# app/breathe/ — Breathing & Grounding Tools

## Purpose

`/breathe` is a mindfulness utility page — not a content page. It gives users a place to step back from the feed and do something grounding. Linked as a CTA from quiz results (medium/high) and `/help-yourself`.

## Files

```
breathe/
  page.tsx                    → server-rendered shell, imports client components
  layout.tsx                  → metadata only
  exercises.ts                → breathing exercise data (pure data, no React)
  BreathingExerciseClient.tsx → animated breathing timer (client)
  GroundingExercise.tsx       → 5-4-3-2-1 grounding technique (client)
  Reminders.tsx               → "Worth remembering" affirmation cards (client)
```

## Architecture

`page.tsx` is a **Server Component** that imports and renders the three client subcomponents. This keeps the page shell server-rendered while the interactive parts are client islands.

## Components

**`BreathingExerciseClient.tsx`** — Client Component
- Props: `exercises: Exercise[]` (from `exercises.ts`)
- Animated breathing guide (inhale/hold/exhale cycle)
- Users can select from multiple breathing patterns

**`exercises.ts`** — Pure data module (no React, no `'use client'`)
- Array of breathing exercise configurations: name, phases (inhale/hold/exhale durations), description
- Import: `import { exercises } from './exercises'`

**`GroundingExercise.tsx`** — Client Component
- Implements the 5-4-3-2-1 grounding technique
- "One tap per thing you notice" — counts down through senses
- Fully self-contained, no props

**`Reminders.tsx`** — Client Component
- "Worth remembering" section: a set of affirmation/perspective cards
- Possibly animated reveal; check the file for current implementation

## Adding Exercises

Edit `exercises.ts` only. Add a new object to the array with the phase timings. `BreathingExerciseClient` reads the array and renders selection UI dynamically.
