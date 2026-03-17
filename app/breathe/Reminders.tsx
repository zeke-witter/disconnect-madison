'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const REMINDERS = [
    "The urge passes. It always does.",
    "Your surroundings are real. The feed isn\u2019t.",
    "It\u2019s hard to look away by design. Give yourself some grace.",
    "Consider what you can and can\u2019t control. Spend your attention accordingly.",
    "The pull you feel is engineered. It will fade.",
    "Your wellbeing matters. Sincere effort is good enough.",
];

const INTERVAL_MS = 12000;

export default function Reminders() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const advancingRef = useRef(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioEnabledRef = useRef(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const bowlIndexRef = useRef(0);

    // Four fundamentals: G3, A3, C4, D4 — a pentatonic subset
    const BOWL_ROOTS = [196, 220, 261.63, 293.66];

    useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);

    function handleAudioToggle(e: React.MouseEvent) {
        e.stopPropagation();
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        setAudioEnabled(prev => !prev);
    }

    const playBowl = useCallback(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const root = BOWL_ROOTS[bowlIndexRef.current % BOWL_ROOTS.length];
        bowlIndexRef.current += 1;

        // Fundamental + octave + inharmonic partial (singing bowl characteristic)
        const partials: [number, number][] = [
            [root,        0.22],
            [root * 2,    0.10],
            [root * 2.76, 0.05],
        ];
        const now = ctx.currentTime;
        partials.forEach(([freq, amp]) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(amp, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.008, now + 2.8);
            gain.gain.linearRampToValueAtTime(0, now + 3.5);
            osc.start(now);
            osc.stop(now + 3.6);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const advance = useCallback(() => {
        if (advancingRef.current) return;
        advancingRef.current = true;
        setVisible(false);
        setTimeout(() => {
            setIndex(i => (i + 1) % REMINDERS.length);
            setVisible(true);
            advancingRef.current = false;
            if (audioEnabledRef.current) playBowl();
        }, 350);
    }, [playBowl]);

    // Restart the 12-second timer whenever the visible reminder changes
    useEffect(() => {
        const timer = setTimeout(advance, INTERVAL_MS);
        return () => clearTimeout(timer);
    }, [index, advance]);

    return (
        <div
            className="flex flex-col items-center text-center w-full cursor-pointer select-none"
            onClick={advance}
            role="button"
            aria-label="Show next reminder"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); } }}
        >
            <p
                key={index}
                className={`text-xl lg:text-2xl leading-relaxed mb-6 max-w-sm ${
                    visible ? 'animate-reminder-in' : 'opacity-0 transition-opacity duration-200'
                }`}
            >
                {REMINDERS[index]}
            </p>

            {/* Active pill + dot indicators */}
            <div className="flex items-center gap-2 mb-3">
                {REMINDERS.map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${i === index
                            ? 'w-5 h-1.5 bg-(--primary-color)'
                            : 'w-1.5 h-1.5 bg-(--secondary-accent)/30'
                            }`}
                    />
                ))}
            </div>

            <p className="text-xs text-(--secondary-accent)/60 mb-4">tap for another</p>

            <button
                onClick={handleAudioToggle}
                className="flex items-center gap-2 text-sm text-(--secondary-accent) hover:text-(--foreground) transition-colors"
                aria-label={audioEnabled ? 'Mute audio cues' : 'Enable audio cues'}
            >
                {audioEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
