import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donate",
    description: "Support Disconnect Madison with a tax-deductible donation. We're a 501(c)(3) nonprofit helping people step back from algorithm-driven social media.",
    alternates: { canonical: "/donate" },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
