'use client';

import { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Source: Ward et al., "Brain Drain: The Mere Presence of One's Own Smartphone
// Reduces Available Cognitive Capacity." Journal of the Association for Consumer Research, 2017.
// Approximate means read from Experiment 1, Figure 1A (OSpan Score).
const data = [
    { location: 'Other room', ospan: 33.9 },
    { location: 'Pocket/bag', ospan: 31.3 },
    { location: 'On desk', ospan: 30.6 },
];

interface Colors {
    accent: string;
    fg: string;
    muted: string;
    gridLine: string;
    tooltipBg: string;
    tooltipFg: string;
}

function readColors(): Colors {
    const s = getComputedStyle(document.documentElement);
    const get = (v: string) => s.getPropertyValue(v).trim();
    const muted = get('--accent-muted') || '#6A994E';
    return {
        accent: get('--accent') || '#386641',
        fg: get('--foreground') || '#386641',
        muted,
        gridLine: muted + '40',
        tooltipBg: get('--nav-background') || '#386641',
        tooltipFg: get('--on-forest') || '#FEF8E8',
    };
}

export default function BrainDrainChart() {
    const [colors, setColors] = useState<Colors>({
        accent: '#386641', fg: '#386641', muted: '#6A994E',
        gridLine: '#6A994E40', tooltipBg: '#386641', tooltipFg: '#FEF8E8',
    });

    useEffect(() => {
        setColors(readColors());
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setColors(readColors());
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 48, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colors.gridLine} />
                <XAxis
                    type="number"
                    domain={[28, 36]}
                    ticks={[28, 30, 32, 34, 36]}
                    tick={{ fill: colors.muted, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: 'Working memory score (OSpan)', position: 'insideBottom', offset: -2, fill: colors.muted, fontSize: 11 }}
                />
                <YAxis
                    type="category"
                    dataKey="location"
                    width={90}
                    tick={{ fill: colors.fg, fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    formatter={(value) => [value, 'OSpan score']}
                    contentStyle={{
                        background: colors.tooltipBg,
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: 13,
                    }}
                    labelStyle={{ color: colors.tooltipFg }}
                    itemStyle={{ color: colors.tooltipFg }}
                    cursor={{ fill: colors.accent + '15' }}
                />
                <Bar dataKey="ospan" radius={[0, 3, 3, 0]} fill={colors.accent} />
            </BarChart>
        </ResponsiveContainer>
    );
}
