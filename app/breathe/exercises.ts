export interface Phase {
    label: string;
    instruction: string;
    duration: number;
    audioFrequency: number;
    hapticPattern: number[];
}

export interface ExerciseConfig {
    id: string;
    name: string;
    tagline: string;
    description: string;
    visualType: 'arc' | 'diamond' | 'sigh';
    phases: Phase[];
}

export const exercises: ExerciseConfig[] = [
    {
        id: '4-7-8',
        name: '4-7-8 Breathing',
        tagline: 'Calming. Grounding. Takes less than a minute per cycle.',
        description: 'Developed by Dr. Andrew Weil, the 4-7-8 technique activates the parasympathetic nervous system to reduce anxiety and promote calm. Breathe in for 4 seconds, hold for 7, and exhale slowly for 8.',
        visualType: 'arc',
        phases: [
            { label: 'Inhale', instruction: 'Breathe in', duration: 4, audioFrequency: 528, hapticPattern: [80] },
            { label: 'Hold', instruction: 'Hold', duration: 7, audioFrequency: 396, hapticPattern: [40, 40, 40] },
            { label: 'Exhale', instruction: 'Breathe out', duration: 8, audioFrequency: 220, hapticPattern: [150] },
        ],
    },
    {
        id: 'box',
        name: 'Box Breathing',
        tagline: 'Equal time on all four sides. Clear the mind, reset the body.',
        description: 'Box breathing creates a simple, symmetrical rhythm that anchors your attention and quiets the stress response. Four counts for each step: inhale, hold, exhale, hold.',
        visualType: 'diamond',
        phases: [
            { label: 'Inhale', instruction: 'Breathe in', duration: 4, audioFrequency: 528, hapticPattern: [80] },
            { label: 'Hold', instruction: 'Hold', duration: 4, audioFrequency: 396, hapticPattern: [40, 40, 40] },
            { label: 'Exhale', instruction: 'Breathe out', duration: 4, audioFrequency: 220, hapticPattern: [150] },
            { label: 'Hold', instruction: 'Hold', duration: 4, audioFrequency: 396, hapticPattern: [40, 40, 40] },
        ],
    },
    {
        id: 'sigh',
        name: 'Physiological Sigh',
        tagline: 'Two breaths in, one long breath out. Fastest known stress reset.',
        description: 'A quick nasal sniff followed immediately by a second full inhale, then a long slow exhale. It deflates collapsed air sacs in the lungs and rapidly activates the parasympathetic nervous system. One cycle is often enough to feel the shift.',
        visualType: 'sigh',
        phases: [
            { label: 'Sniff', instruction: 'Quick nasal sniff', duration: 2, audioFrequency: 528, hapticPattern: [40] },
            { label: 'Inhale', instruction: 'Fill your lungs fully', duration: 2, audioFrequency: 528, hapticPattern: [80] },
            { label: 'Exhale', instruction: 'Breathe out slowly', duration: 8, audioFrequency: 220, hapticPattern: [200] },
        ],
    },
];
