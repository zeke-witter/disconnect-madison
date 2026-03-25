'use client';

import { useEffect, useRef, useState } from 'react';

const SHADOW_BASE = '0 4px 20px rgba(0,0,0,0.10)';
const SHADOW_RESET = '0 2px 8px rgba(0,0,0,0.06)';

export default function TiltWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const [style, setStyle] = useState<React.CSSProperties>({
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
        boxShadow: SHADOW_RESET,
        transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    });

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    function applyTilt(clientX: number, clientY: number) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const el = ref.current;
            if (!el) return;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            const rotX = -y * 10;
            const rotY = x * 10;
            setStyle({
                transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`,
                boxShadow: `${-rotY * 2}px ${rotX * 2 + 8}px 28px rgba(0,0,0,0.16)`,
                transition: 'transform 0.08s ease-out, box-shadow 0.08s ease-out',
            });
        });
    }

    function resetTilt() {
        cancelAnimationFrame(rafRef.current);
        setStyle({
            transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
            boxShadow: SHADOW_BASE,
            transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
        });
    }

    return (
        <div
            ref={ref}
            style={style}
            className={className}
            onMouseMove={e => applyTilt(e.clientX, e.clientY)}
            onMouseEnter={e => applyTilt(e.clientX, e.clientY)}
            onMouseLeave={resetTilt}
            onTouchMove={e => {
                const t = e.touches[0];
                applyTilt(t.clientX, t.clientY);
            }}
            onTouchEnd={resetTilt}
        >
            {children}
        </div>
    );
}
