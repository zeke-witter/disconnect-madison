'use client';

import { useState, useEffect, useRef } from 'react';

// Pentatonic scale: C4, D4, E4, G4, A4
const TAP_TONES = [261.63, 293.66, 329.63, 392, 440];

const STEPS = [
    { count: 5, label: 'SEE', prompt: 'Find 5 things you can see.' },
    { count: 4, label: 'HEAR', prompt: 'Name 4 things you can hear.' },
    { count: 3, label: 'FEEL', prompt: 'Notice 3 things you can physically feel.' },
    { count: 2, label: 'SMELL', prompt: 'Find 2 things you can smell.' },
    { count: 1, label: 'TASTE', prompt: 'Notice 1 thing you can taste.' },
];

export default function GroundingExercise() {
    const [started, setStarted] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [found, setFound] = useState(0);
    const [done, setDone] = useState(false);
    const transitioning = useRef(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioEnabledRef = useRef(false);
    const [audioEnabled, setAudioEnabled] = useState(false);

    useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);

    function playTone(freq: number, duration = 0.4) {
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

    function handleAudioToggle() {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        } else if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        setAudioEnabled(prev => !prev);
    }

    const step = STEPS[stepIndex];

    function handleFound() {
        if (transitioning.current) return;
        if (audioEnabledRef.current) playTone(TAP_TONES[found % TAP_TONES.length]);
        const next = found + 1;
        setFound(next);
        if (next >= step.count) {
            transitioning.current = true;
            if (stepIndex >= STEPS.length - 1) {
                setTimeout(() => setDone(true), 500);
            } else {
                setTimeout(() => {
                    setStepIndex(i => i + 1);
                    setFound(0);
                    transitioning.current = false;
                }, 700);
            }
        }
    }

    function handleReset() {
        setStarted(false);
        setStepIndex(0);
        setFound(0);
        setDone(false);
        transitioning.current = false;
    }

    if (!started) {
        return (
            <div className="flex flex-col items-center text-center">
                <p className="text-sm text-(--secondary-accent) mb-8 max-w-sm leading-relaxed">
                    Tap once for each thing you notice. Work through all five senses to bring yourself back into the room.
                </p>
                <button
                    onClick={() => setStarted(true)}
                    className="font-handjet text-2xl px-10 py-3 rounded-sm bg-(--primary-color) text-(--pill-selected-text) hover:opacity-90 transition-opacity"
                >
                    Start
                </button>
            </div>
        );
    }

    if (done) {
        return (
            <div className="flex flex-col items-center text-center">
                <p className="font-handjet text-6xl mb-3 text-(--primary-color)">Done.</p>
                <p className="text-(--secondary-accent) text-sm mb-8">You&apos;re trying to be present. That&apos;s good enough.</p>
                <button
                    onClick={handleReset}
                    className="text-sm text-(--secondary-accent) underline hover:text-(--foreground) transition-colors"
                >
                    Start over
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center">
            {/* Step progress */}
            <div className="flex gap-2 mb-10" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}>
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 w-10 rounded-full transition-all duration-500 ${i < stepIndex
                                ? 'bg-(--primary-color)'
                                : i === stepIndex
                                    ? 'bg-(--primary-color)/50'
                                    : 'bg-(--secondary-accent)/20'
                            }`}
                    />
                ))}
            </div>

            {/* Sense */}
            <p className="font-handjet text-6xl lg:text-7xl text-(--primary-color) mb-2">
                {step.label}
            </p>
            <p className="text-(--secondary-accent) text-sm mb-10">{step.prompt}</p>

            {/* Found dots */}
            <div className="flex gap-3 mb-10" aria-label={`${found} of ${step.count} found`}>
                {Array.from({ length: step.count }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${i < found
                                ? 'bg-(--primary-color) border-(--primary-color) scale-110'
                                : 'border-(--secondary-accent)/40'
                            }`}
                    />
                ))}
            </div>

            <button
                onClick={handleFound}
                aria-label={`Found one — ${step.count - found} remaining`}
                className="font-handjet text-2xl px-10 py-3 rounded-sm bg-(--primary-color) text-(--pill-selected-text) hover:opacity-90 transition-opacity mb-6"
            >
                Found one
            </button>

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
