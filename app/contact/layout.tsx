import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Disconnect Society. Questions, feedback, or ideas — we'd love to hear from you.",
    alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
