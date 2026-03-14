import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Before You Go',
    description: 'A practical guide to leaving social media thoughtfully: what to save, who to reach out to, and how to do it at your own pace.',
    alternates: { canonical: '/before-you-go' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
