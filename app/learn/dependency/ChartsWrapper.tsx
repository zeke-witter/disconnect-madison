'use client';

import dynamic from 'next/dynamic';

export const BrainDrainChart = dynamic(() => import('./BrainDrainChart'), { ssr: false });
