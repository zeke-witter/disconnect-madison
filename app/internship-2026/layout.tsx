import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Internship 2026 — Tanisha Pathan",
    description: "Meet Tanisha Pathan, Disconnect Madison's 2026 design intern, and see her sticker and brand design work for the project.",
    alternates: { canonical: "/internship-2026" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
