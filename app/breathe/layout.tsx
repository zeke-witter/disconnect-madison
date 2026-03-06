import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Breathe — 4-7-8 Breathing Exercise",
    description: "A guided 4-7-8 breathing exercise to calm your nervous system, reduce anxiety, and return your attention to the present moment. No account needed.",
    alternates: { canonical: "/breathe" },
};

export default function BreatheLayout({ children }: { children: React.ReactNode }) {
    return children;
}
