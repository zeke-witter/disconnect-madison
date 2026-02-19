import Link from "next/link";

export default function KidsCallout() {
    return (
        <aside className="w-full border-l-4 border-(--primary-accent) pl-5 py-1">
            <p className="font-bold text-(--primary-color) mb-1">
                This matters most for kids.
            </p>
            <p className="text-(--secondary-accent) mb-3">
                Most adults chose to join social media. Children didn&apos;t. The research on how it&apos;s reshaping their brains (<span className="font-bold">and their mental health</span>) concerns all of us.
            </p>
            <Link
                href="/learn/kids"
                className="underline text-(--primary-accent) hover:text-(--primary-accent-hover) font-medium"
            >
                Read what the research says about kids and social media →
            </Link>
        </aside>
    );
}
