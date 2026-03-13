'use client'

import { useState, useEffect, useRef } from 'react';
import type { ExerciseConfig, Phase } from './exercises';

// ─── Shared types ─────────────────────────────────────────────────────────────

interface VisualProps {
    phase: Phase;
    phases: Phase[];
    phaseIndex: number;
    elapsed: number;
    status: 'idle' | 'running';
    count: number;
}

// ─── Arc visual (4-7-8) ───────────────────────────────────────────────────────

const CIRCUMFERENCE = 2 * Math.PI * 100;

function ArcVisual({ phase, elapsed, status, count }: VisualProps) {
    const progress = status === 'running' ? elapsed / phase.duration : 0;
    const dashOffset = CIRCUMFERENCE * (1 - progress);

    return (
        <svg
            viewBox="0 0 240 240"
            width="240"
            height="240"
            aria-label={status === 'running' ? `${phase.label}: ${count}` : 'Breathing exercise paused'}
        >
            <circle
                cx="120" cy="120" r="100"
                fill="none" stroke="currentColor" strokeWidth="10"
                className="text-(--secondary-accent)/20"
            />
            <circle
                cx="120" cy="120" r="100"
                fill="none" stroke="currentColor" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="text-(--primary-color)"
                style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '120px 120px',
                    transition: 'stroke-dashoffset 0.1s linear',
                }}
            />
            <CenterText phase={phase} count={count} status={status} />
        </svg>
    );
}

// ─── Diamond visual (box breathing) ──────────────────────────────────────────

// Corners clockwise from bottom.
// Phase 0 (Inhale): bottom → right
// Phase 1 (Hold):   right  → top
// Phase 2 (Exhale): top    → left
// Phase 3 (Hold):   left   → bottom
const CORNERS = [
    { x: 120, y: 215 },
    { x: 215, y: 120 },
    { x: 120, y: 25  },
    { x: 25,  y: 120 },
];

function DiamondVisual({ phase, phaseIndex, elapsed, status, count }: VisualProps) {
    const progress = status === 'running' ? elapsed / phase.duration : 0;
    const start = CORNERS[phaseIndex];
    const end = CORNERS[(phaseIndex + 1) % 4];
    const dotX = status === 'running' ? start.x + (end.x - start.x) * progress : CORNERS[0].x;
    const dotY = status === 'running' ? start.y + (end.y - start.y) * progress : CORNERS[0].y;

    return (
        <svg
            viewBox="0 0 240 240"
            width="240"
            height="240"
            aria-label={status === 'running' ? `${phase.label}: ${count}` : 'Breathing exercise paused'}
        >
            {CORNERS.map((corner, i) => {
                const next = CORNERS[(i + 1) % 4];
                return (
                    <line
                        key={i}
                        x1={corner.x} y1={corner.y}
                        x2={next.x} y2={next.y}
                        stroke="currentColor" strokeWidth="2"
                        className="text-(--secondary-accent)/25"
                    />
                );
            })}
            {status === 'running' && CORNERS.map((corner, i) => {
                const next = CORNERS[(i + 1) % 4];
                const isCompleted = i < phaseIndex;
                const isCurrent = i === phaseIndex;
                if (!isCompleted && !isCurrent) return null;
                return (
                    <line
                        key={`hl-${i}`}
                        x1={corner.x} y1={corner.y}
                        x2={isCurrent ? dotX : next.x}
                        y2={isCurrent ? dotY : next.y}
                        stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round"
                        className="text-(--primary-color)"
                    />
                );
            })}
            {CORNERS.map((corner, i) => (
                <circle
                    key={`c-${i}`}
                    cx={corner.x} cy={corner.y} r="4"
                    fill="currentColor"
                    className="text-(--secondary-accent)/40"
                />
            ))}
            <g style={{
                transform: `translate(${dotX}px, ${dotY}px)`,
                transition: status === 'running' ? 'transform 0.1s linear' : 'none',
            }}>
                <circle
                    cx="0" cy="0" r="7"
                    fill="currentColor"
                    className={status === 'running' ? 'text-(--primary-color)' : 'text-(--secondary-accent)/50'}
                />
            </g>
            <CenterText phase={phase} count={count} status={status} />
        </svg>
    );
}

// ─── Sigh visual (physiological sigh) ────────────────────────────────────────
//
// A breathing wave drawn as three connected cubic bezier segments, one per
// phase. The dot travels along the wave, leaving a lit trail. The shoulder
// plateau at the sniff/inhale junction makes the two distinct inhales visible.

type Pt = { x: number; y: number };

// Wave: (start on ground) — quick sniff rise to shoulder — steeper inhale rise
// to peak — long gentle exhale descent back to ground.
const WAVE: [Pt, Pt, Pt, Pt][] = [
    // Phase 0 — Sniff: ground → shoulder (eases out, decelerates at shoulder)
    [{ x: 15, y: 130 }, { x: 25, y: 130 }, { x: 55, y: 90 }, { x: 65, y: 90 }],
    // Phase 1 — Inhale: shoulder → peak (eases in-out, re-accelerates then glides in)
    [{ x: 65, y: 90 }, { x: 77, y: 90 }, { x: 110, y: 20 }, { x: 120, y: 20 }],
    // Phase 2 — Exhale: peak → ground (linear, long steady descent)
    [{ x: 120, y: 20 }, { x: 126, y: 20 }, { x: 290, y: 130 }, { x: 305, y: 130 }],
];

// Full background guide path
const WAVE_PATH =
    `M ${WAVE[0][0].x},${WAVE[0][0].y} ` +
    WAVE.map(([, p1, p2, p3]) => `C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`).join(' ');

function lerpPt(t: number, a: Pt, b: Pt): Pt {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// De Casteljau: exact sub-bezier from t=0 to t (for the lit trail)
function splitFirst(t: number, [p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]): [Pt, Pt, Pt, Pt] {
    const p01 = lerpPt(t, p0, p1);
    const p12 = lerpPt(t, p1, p2);
    const p23 = lerpPt(t, p2, p3);
    const p012 = lerpPt(t, p01, p12);
    const p123 = lerpPt(t, p12, p23);
    const p0123 = lerpPt(t, p012, p123);
    return [p0, p01, p012, p0123];
}

function bezierPt(t: number, [p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]): Pt {
    const u = 1 - t;
    return {
        x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
        y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
    };
}

// Derivative — gives the tangent direction (for squash & stretch)
function bezierTangent(t: number, [p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]): Pt {
    const u = 1 - t;
    return {
        x: 3*u*u*(p1.x-p0.x) + 6*u*t*(p2.x-p1.x) + 3*t*t*(p3.x-p2.x),
        y: 3*u*u*(p1.y-p0.y) + 6*u*t*(p2.y-p1.y) + 3*t*t*(p3.y-p2.y),
    };
}

function segStr([, p1, p2, p3]: [Pt, Pt, Pt, Pt]): string {
    return `C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
}

// Per-phase easing: sniff eases out (decelerates into shoulder), inhale eases
// in-out (re-accelerates then settles at peak), exhale is linear (steady).
const SIGH_EASE: ((t: number) => number)[] = [
    (t) => 1 - Math.pow(1 - t, 2),
    (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    (t) => t,
];

function SighVisual({ phase, phaseIndex, elapsed, status, count }: VisualProps) {
    const rawT = status === 'running' ? Math.min(elapsed / phase.duration, 1) : 0;
    const eased = SIGH_EASE[Math.min(phaseIndex, SIGH_EASE.length - 1)](rawT);
    const seg = WAVE[Math.min(phaseIndex, WAVE.length - 1)];

    // Dot position on the wave
    const dot = status === 'running' ? bezierPt(eased, seg) : WAVE[0][0];

    // Squash & stretch: stretch the dot along its direction of travel
    const tangent = status === 'running' ? bezierTangent(eased, seg) : { x: 1, y: 0 };
    const speed = Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y);
    const stretch = Math.min(speed / 280, 1) * 0.38;
    const angleDeg = Math.atan2(tangent.y, tangent.x) * (180 / Math.PI);

    // Lit trail: De Casteljau sub-bezier for current segment + full prior segments
    let trailD = '';
    if (status === 'running' && (phaseIndex > 0 || eased > 0)) {
        trailD = `M ${WAVE[0][0].x},${WAVE[0][0].y}`;
        for (let i = 0; i < phaseIndex; i++) trailD += ' ' + segStr(WAVE[i]);
        if (eased > 0) trailD += ' ' + segStr(splitFirst(eased, seg));
    }

    // Phase boundary junction points (sniff→inhale, inhale→exhale)
    const junctions = WAVE.slice(1).map(([p0]) => p0);

    return (
        <svg
            viewBox="0 0 320 185"
            width="320"
            height="185"
            aria-label={status === 'running' ? `${phase.label}: ${count}` : 'Breathing exercise paused'}
        >
            {/* Background wave guide */}
            <path
                d={WAVE_PATH}
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-(--secondary-accent)/25"
            />

            {/* Lit trail */}
            {trailD && (
                <path
                    d={trailD}
                    fill="none" stroke="currentColor" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="text-(--primary-color)"
                />
            )}

            {/* Junction markers — light up as each phase completes */}
            {junctions.map((j, i) => (
                <circle
                    key={i}
                    cx={j.x} cy={j.y} r="3.5"
                    fill="currentColor"
                    className={
                        status === 'running' && phaseIndex > i
                            ? 'text-(--primary-color)'
                            : 'text-(--secondary-accent)/40'
                    }
                />
            ))}

            {/* Idle-state labels: show the three phase sections before starting */}
            {status !== 'running' && (
                <>
                    <text x="15" y="118" fontSize="10" fill="currentColor"
                        className="text-(--secondary-accent)/70"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        Sniff
                    </text>
                    <text x="67" y="79" fontSize="10" fill="currentColor"
                        className="text-(--secondary-accent)/70"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        Inhale
                    </text>
                    <text x="155" y="13" fontSize="10" fill="currentColor"
                        className="text-(--secondary-accent)/70"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        Exhale
                    </text>
                </>
            )}

            {/* Traveling dot — CSS translate (smooth) + SVG rotate+scale (squash/stretch) */}
            <g style={{
                transform: `translate(${dot.x}px, ${dot.y}px)`,
                transition: status === 'running' ? 'transform 0.1s linear' : 'none',
            }}>
                <g transform={`rotate(${angleDeg.toFixed(2)}) scale(${(1 + stretch).toFixed(3)},${(1 - stretch * 0.5).toFixed(3)})`}>
                    <circle
                        cx="0" cy="0" r="7"
                        fill="currentColor"
                        className={status === 'running' ? 'text-(--primary-color)' : 'text-(--secondary-accent)/50'}
                    />
                </g>
            </g>

            {/* Text strip */}
            {status === 'running' ? (
                <>
                    <text x="160" y="150" textAnchor="middle" dominantBaseline="middle"
                        fontSize="14" fontWeight="600" fill="currentColor"
                        className="text-(--secondary-accent)"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {phase.label}
                    </text>
                    <text x="160" y="170" textAnchor="middle" dominantBaseline="middle"
                        fontSize="26" fontWeight="700" fill="currentColor"
                        style={{ fontFamily: 'var(--font-handjet)' }}>
                        {count}
                    </text>
                </>
            ) : (
                <text x="160" y="160" textAnchor="middle" dominantBaseline="middle"
                    fontSize="14" fill="currentColor"
                    className="text-(--secondary-accent)"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Press start
                </text>
            )}
        </svg>
    );
}

// ─── Shared center text (arc + diamond) ──────────────────────────────────────

function CenterText({ phase, count, status }: { phase: Phase; count: number; status: 'idle' | 'running' }) {
    if (status !== 'running') {
        return (
            <text x="120" y="120" textAnchor="middle" dominantBaseline="middle"
                fontSize="16" fill="currentColor"
                className="text-(--secondary-accent)"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Press start
            </text>
        );
    }
    return (
        <>
            <text x="120" y="104" textAnchor="middle" dominantBaseline="middle"
                fontSize="17" fontWeight="600" fill="currentColor"
                className="text-(--secondary-accent)"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {phase.label}
            </text>
            <text x="120" y="128" textAnchor="middle" dominantBaseline="middle"
                fontSize="42" fontWeight="700" fill="currentColor"
                style={{ fontFamily: 'var(--font-handjet)' }}>
                {count}
            </text>
            <text x="120" y="152" textAnchor="middle" dominantBaseline="middle"
                fontSize="14" fill="currentColor"
                className="text-(--secondary-accent)"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {phase.instruction}
            </text>
        </>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BreathingExerciseClient({ exercises }: { exercises: ExerciseConfig[] }) {
    const [selectedId, setSelectedId] = useState(exercises[0].id);
    const [status, setStatus] = useState<'idle' | 'running'>('idle');
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [audioEnabled, setAudioEnabled] = useState(false);

    const audioEnabledRef = useRef(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const timerState = useRef({ phaseIndex: 0, elapsed: 0, cycleCount: 0 });

    useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);

    function playTone(freq: number, duration = 0.5) {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + duration);
        osc.start(now);
        osc.stop(now + duration + 0.05);
    }

    function triggerHaptic(pattern: number[]) {
        if ('vibrate' in navigator) navigator.vibrate(pattern);
    }

    function handleAudioToggle() {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        setAudioEnabled(prev => !prev);
    }

    function handleStart() {
        const exercise = exercises.find(e => e.id === selectedId)!;
        timerState.current = { phaseIndex: 0, elapsed: 0, cycleCount: 0 };
        setPhaseIndex(0); setElapsed(0); setCycleCount(0);
        setStatus('running');
        if (audioEnabledRef.current) playTone(exercise.phases[0].audioFrequency);
        triggerHaptic(exercise.phases[0].hapticPattern);
    }

    function handleStop() {
        setStatus('idle');
        setPhaseIndex(0); setElapsed(0); setCycleCount(0);
        timerState.current = { phaseIndex: 0, elapsed: 0, cycleCount: 0 };
    }

    useEffect(() => {
        if (status !== 'running') return;
        const exercise = exercises.find(e => e.id === selectedId)!;

        const intervalId = setInterval(() => {
            const s = timerState.current;
            const newElapsed = s.elapsed + 0.1;
            const phase = exercise.phases[s.phaseIndex];

            if (newElapsed >= phase.duration - 0.001) {
                const nextPhaseIndex = (s.phaseIndex + 1) % exercise.phases.length;
                const newCycleCount = nextPhaseIndex === 0 ? s.cycleCount + 1 : s.cycleCount;
                timerState.current = { phaseIndex: nextPhaseIndex, elapsed: 0, cycleCount: newCycleCount };
                if (audioEnabledRef.current) playTone(exercise.phases[nextPhaseIndex].audioFrequency);
                triggerHaptic(exercise.phases[nextPhaseIndex].hapticPattern);
                setPhaseIndex(nextPhaseIndex); setElapsed(0); setCycleCount(newCycleCount);
            } else {
                timerState.current = { ...s, elapsed: newElapsed };
                setElapsed(newElapsed);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [status, selectedId, exercises]);

    const exercise = exercises.find(e => e.id === selectedId)!;
    const phase = exercise.phases[phaseIndex];
    const count = status === 'running' ? Math.floor(elapsed) + 1 : 1;

    const visualProps: VisualProps = {
        phase, phases: exercise.phases, phaseIndex, elapsed, status, count,
    };

    return (
        <div className="flex flex-col items-center w-full font-[family-name:var(--font-space-grotesk)]">
            {exercises.length > 1 && (
                <div className="flex gap-3 mb-8 flex-wrap justify-center">
                    {exercises.map(ex => (
                        <button
                            key={ex.id}
                            onClick={() => { handleStop(); setSelectedId(ex.id); }}
                            className={`px-4 py-2 rounded-sm border text-sm font-semibold transition-colors ${
                                selectedId === ex.id
                                    ? 'border-(--primary-color) bg-(--primary-color)/10 text-(--primary-color)'
                                    : 'border-(--secondary-accent) hover:border-(--primary-color)'
                            }`}
                        >
                            {ex.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="text-center mb-8 max-w-md">
                <h2 className="font-handjet text-4xl lg:text-5xl mb-2">{exercise.name}</h2>
                <p className="text-(--secondary-accent) text-sm mb-3">{exercise.tagline}</p>
                <p className="text-(--secondary-accent) text-sm leading-relaxed">{exercise.description}</p>
            </div>

            <div className="relative mb-6" aria-live="polite" aria-atomic="true">
                {exercise.visualType === 'sigh'
                    ? <SighVisual {...visualProps} />
                    : exercise.visualType === 'diamond'
                    ? <DiamondVisual {...visualProps} />
                    : <ArcVisual {...visualProps} />
                }
            </div>

            <button
                onClick={status === 'idle' ? handleStart : handleStop}
                className={`font-handjet text-2xl font-bold px-10 py-3 rounded-sm transition-colors mb-4 ${
                    status === 'idle'
                        ? 'bg-(--primary-color) text-[#E8D9BC] hover:opacity-90'
                        : 'border border-(--secondary-accent) hover:border-(--primary-accent) hover:text-(--primary-accent)'
                }`}
            >
                {status === 'idle' ? 'Start' : 'Stop'}
            </button>

            <p className="text-sm text-(--secondary-accent) mb-6 h-5">
                {cycleCount > 0 && `${cycleCount} ${cycleCount === 1 ? 'cycle' : 'cycles'} completed`}
            </p>

            <button
                onClick={handleAudioToggle}
                className="flex items-center gap-2 text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                aria-label={audioEnabled ? 'Mute audio cues' : 'Enable audio cues'}
            >
                {audioEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                )}
                {audioEnabled ? 'Audio on' : 'Audio off'}
            </button>
        </div>
    );
}
