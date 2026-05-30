import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parents Guide",
    description: "Practical advice for parents on talking to kids about screen time, modeling healthy habits, navigating other families, and building community around shared values.",
    alternates: { canonical: "/parents" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
