# app/learn/ — Research Content Hub

## Structure

`/learn` is a multi-page research section. The hub page (`page.tsx`) gives an overview of all topics and links out to sub-pages.

```
learn/
  page.tsx               → /learn        (hub overview)
  attention/page.tsx     → /learn/attention
  body-image/page.tsx    → /learn/body-image
  dependency/            → /learn/dependency
    page.tsx
    BrainDrainChart.tsx
    ChartsWrapper.tsx
  depression/page.tsx    → /learn/depression
  ecological-impact/page.tsx → /learn/ecological-impact
  kids/                  → /learn/kids
    page.tsx
    ChartsWrapper.tsx
    PlatformUsageChart.tsx
    TeenDepressionChart.tsx
  sleep/page.tsx         → /learn/sleep
```

## Chart Architecture

Pages with Recharts use a **dynamic import pattern** to avoid SSR issues (Recharts is browser-only):

1. Chart component (e.g., `TeenDepressionChart.tsx`) — `'use client'`, contains the actual Recharts code
2. `ChartsWrapper.tsx` — `'use client'`, uses `next/dynamic` with `{ ssr: false }` to import chart components
3. The page (`page.tsx`) imports `ChartsWrapper` and renders it as a client island inside the otherwise server-rendered page

If adding a new chart to a learn page, follow this same pattern. Do not import Recharts directly in a Server Component.

## Sub-Page Subjects

| Route | Topic |
|---|---|
| `/learn` | Overview of all harms: mental health, attention, sleep, body image, polarization, ecological impact |
| `/learn/attention` | Attention fragmentation, focus degradation, task-switching cost |
| `/learn/body-image` | Comparison culture, eating disorders, appearance anxiety |
| `/learn/dependency` | Cognitive offloading, GPS effect, phone presence effects, AI assistants |
| `/learn/depression` | Depression and anxiety in adolescents and adults |
| `/learn/ecological-impact` | Data center energy use and carbon emissions |
| `/learn/kids` | Effects on children and adolescents specifically; CDC depression trend chart; platform usage chart |
| `/learn/sleep` | Sleep disruption, blue light, bedtime scrolling |

## Content Conventions

- All pages are Server Components (except chart wrappers)
- No `layout.tsx` in sub-routes (metadata is exported directly from `page.tsx`)
- Research claims should link to `/sources` where possible
- Tone: research-driven but accessible, non-judgmental

## `/learn/kids` Charts

**`TeenDepressionChart.tsx`** — Area chart showing CDC depression trends 2009–2023, broken out by gender. Uses Recharts `AreaChart`.

**`PlatformUsageChart.tsx`** — Horizontal bar chart showing platform usage percentages among teens. Uses Recharts `BarChart`.

## `/learn/dependency` Charts

**`BrainDrainChart.tsx`** — Chart illustrating cognitive load or phone presence effects. Uses Recharts.

## `/learn/ecological-impact`

Contains `DistractedDrivingChart.tsx` — note this is in `app/components/` not in the learn subfolder. Check the import path when editing.
