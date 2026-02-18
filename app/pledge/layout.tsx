import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Take the Pledge",
    description: "Pledge to reduce screen time, deactivate, or permanently delete your social media accounts. Join the Disconnect Society movement.",
    alternates: { canonical: "/pledge" },
};

export default function PledgeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
