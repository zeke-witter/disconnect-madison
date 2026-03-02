import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Is Social Media Affecting You?",
    description: "A short self-reflection quiz to help you understand your relationship with social media and screen time. No account needed. Nothing recorded.",
    alternates: { canonical: "/quiz" },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return children;
}
