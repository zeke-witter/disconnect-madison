'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Source: NHTSA, "Distracted Driving in 2023" (DOT HS 813 703)
const data = [
    { label: 'All fatal crashes', pct: 9 },
    { label: 'Phone-distracted crashes', pct: 15 },
];

interface Colors {
    accent: string;
    color: string;
    fg: string;
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
        color: get('--primary-color') || '#1A7268',
        fg: get('--foreground') || '#1A1A1A',
        muted,
        gridLine: muted + '40',
        tooltipBg: get('--nav-background') || '#2B5250',
        tooltipFg: '#EDEBE6',
    };
}

export default function DistractedDrivingChart() {
    const [colors, setColors] = useState<Colors>({
        accent: '#8C3A2B', color: '#1A7268', fg: '#1A1A1A', muted: '#5C6F73',
        gridLine: '#5C6F7340', tooltipBg: '#2B5250', tooltipFg: '#EDEBE6',
    });

    useEffect(() => {
        setColors(readColors());
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setColors(readColors());
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <div className="mb-4">
            <p className="text-sm font-semibold mb-1">Teen drivers (ages 15–20) as a share of:</p>
            <ResponsiveContainer width="100%" height={120}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                    barSize={22}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colors.gridLine} />
                    <XAxis
                        type="number"
                        domain={[0, 20]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fill: colors.muted, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="label"
                        width={148}
                        tick={{ fill: colors.fg, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        formatter={(value) => [`${value}%`, 'Teen drivers']}
                        contentStyle={{
                            background: colors.tooltipBg,
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: 12,
                        }}
                        labelStyle={{ color: colors.tooltipFg }}
                        itemStyle={{ color: colors.tooltipFg }}
                        cursor={{ fill: colors.accent + '15' }}
                    />
                    <Bar dataKey="pct" radius={[0, 3, 3, 0]}>
                        <Cell fill={colors.color} />
                        <Cell fill={colors.accent} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-(--secondary-accent) mt-1">Source: NHTSA, DOT HS 813 703 (2025)</p>
        </div>
    );
}
