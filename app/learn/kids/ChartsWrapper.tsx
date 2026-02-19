'use client';

import dynamic from 'next/dynamic';

export const PlatformUsageChart = dynamic(() => import('./PlatformUsageChart'), { ssr: false });
export const TeenDepressionChart = dynamic(() => import('./TeenDepressionChart'), { ssr: false });
