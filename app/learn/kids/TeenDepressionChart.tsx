'use client';

import { useEffect, useId, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ReferenceLine, ResponsiveContainer,
} from 'recharts';

// Source: CDC Youth Risk Behavior Survey (YRBS)
// Metric: % of high school students reporting persistent feelings of sadness or hopelessness
const data = [
    { year: 2009, pct: 26 },
    { year: 2011, pct: 28 },
    { year: 2013, pct: 30 },
    { year: 2015, pct: 30 },
    { year: 2017, pct: 32 },
    { year: 2019, pct: 37 },
    { year: 2021, pct: 44 },
    { year: 2023, pct: 40 },
];

interface Colors {
    accent: string;
    muted: string;
    gridLine: string;
    tooltipBg: string;
    tooltipFg: string;
}

function readColors(): Colors {
    const s = getComputedStyle(document.documentElement);
    const get = (v: string) => s.getPropertyValue(v).trim();
    const muted = get('--secondary-accent') || '#5C6F73';
    return {
        accent: get('--primary-accent') || '#8C3A2B',
        muted,
        gridLine: muted + '40',
        tooltipBg: get('--background') || '#1F3D3A',
        tooltipFg: get('--foreground') || '#EDEBE6',
    };
}

// Inline SVG label for the 2012 reference line
function RefLabel({ viewBox, fill }: { viewBox?: { x: number; y: number }; fill: string }) {
    const x = (viewBox?.x ?? 0) + 6;
    const y = (viewBox?.y ?? 0) + 14;
    return (
        <text x={x} y={y} fill={fill} fontSize={11} textAnchor="start">
            ~2012: smartphones reach 50% of teens
        </text>
    );
}

export default function TeenDepressionChart() {
    const gradientId = useId();
    const [colors, setColors] = useState<Colors>({
        accent: '#8C3A2B', muted: '#5C6F73',
        gridLine: '#5C6F7340', tooltipBg: '#1F3D3A', tooltipFg: '#F6F4EF',
    });

    useEffect(() => {
        setColors(readColors());
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setColors(readColors());
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.accent} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={colors.accent} stopOpacity={0.03} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                <XAxis
                    dataKey="year"
                    type="number"
                    domain={[2008, 2024]}
                    ticks={[2009, 2011, 2013, 2015, 2017, 2019, 2021, 2023]}
                    tick={{ fill: colors.muted, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tickFormatter={(v) => `${v}%`}
                    domain={[0, 50]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                    tick={{ fill: colors.muted, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Reported persistent sadness']}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{
                        background: colors.tooltipBg,
                        border: 'none',
                        borderRadius: '6px',
                        color: colors.tooltipFg,
                        fontSize: 13,
                    }}
                />
                <ReferenceLine
                    x={2012}
                    stroke={colors.muted}
                    strokeDasharray="4 4"
                    label={<RefLabel fill={colors.muted} />}
                />
                <Area
                    type="monotone"
                    dataKey="pct"
                    stroke={colors.accent}
                    strokeWidth={2.5}
                    fill={`url(#${gradientId})`}
                    dot={{ r: 4, fill: colors.accent, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: colors.accent }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
