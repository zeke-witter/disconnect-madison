'use client';

import { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Source: Pew Research Center, "Teens, Social Media and Technology 2023"
const data = [
    { platform: 'YouTube', pct: 93 },
    { platform: 'TikTok', pct: 63 },
    { platform: 'Snapchat', pct: 60 },
    { platform: 'Instagram', pct: 59 },
    { platform: 'Facebook', pct: 33 },
    { platform: 'X (Twitter)', pct: 20 },
    { platform: 'WhatsApp', pct: 17 },
    { platform: 'Reddit', pct: 14 },
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

export default function PlatformUsageChart() {
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
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 48, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colors.gridLine} />
                <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: colors.muted, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    type="category"
                    dataKey="platform"
                    width={90}
                    tick={{ fill: colors.fg, fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, '% of teens who use it']}
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
                <Bar dataKey="pct" radius={[0, 3, 3, 0]} fill={colors.accent} />
            </BarChart>
        </ResponsiveContainer>
    );
}
