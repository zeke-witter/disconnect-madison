# tests/ — Unit Tests (Vitest)

## Framework

Vitest. Config at `vitest.config.ts` in project root.

Run: `npm test`

## Test Files

| File | Covers |
|---|---|
| `actions.test.ts` | Server action logic (pledge validation, email construction, etc.) |
| `middleware.test.ts` | Auth middleware route protection logic |
| `quiz.test.ts` | `getLevel()` scoring thresholds, question data shape |
| `setup.ts` | Global test setup (mocks, env vars, etc.) |

## Conventions

- Tests live in `tests/` (not colocated with source)
- Import from `@/*` using the project path alias
- Supabase and Resend should be mocked in unit tests (see `setup.ts`)
- Quiz logic tests are pure (no mocks needed — `lib/quiz.ts` has no side effects)

## Key Assertions to Cover

- `getLevel(score)`: verify boundary values (7→low, 8→medium, 17→medium, 18→high)
- `submitPledgeAction`: honeypot triggers fake success, invalid email rejected, invalid pledge type rejected
- Middleware: unprotected routes pass through, protected routes redirect when no session
