import { getAllNewsArticlesAction } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'News Archive',
    description: 'A complete record of every article shared on Disconnect Madison, with archived copies for durability.',
    alternates: { canonical: '/news' },
};

function getDomain(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function NewsArchivePage() {
    const articles = await getAllNewsArticlesAction();

    type Article = (typeof articles)[number];
    const byYear = articles.reduce<Record<string, Article[]>>((acc, article) => {
        const year = article.created_at
            ? new Date(article.created_at).getFullYear().toString()
            : 'Undated';
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {});

    const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

    return (
        <div className="w-full max-w-3xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl mb-4">News Archive</h1>
            <p className="text-(--secondary-accent) mb-12 max-w-xl">
                Every article we have shared, in order. If a link has gone dark, the archived version should still work.
            </p>

            {articles.length === 0 && (
                <p className="text-(--secondary-accent)">No articles yet.</p>
            )}

            {years.map((year) => (
                <section key={year} className="mb-12">
                    <h2 className="font-handjet text-3xl mb-6 text-(--primary-color)">{year}</h2>
                    <ul className="space-y-0">
                        {byYear[year].map((article) => (
                            <li key={article.id} className="border-b border-(--secondary-accent)/20 py-4 first:border-t first:border-t-(--secondary-accent)/20">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium leading-snug hover:text-(--primary-accent) transition-colors"
                                >
                                    {article.title}
                                </a>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-(--secondary-accent)">
                                    <span>{getDomain(article.url)}</span>
                                    {article.created_at && (
                                        <>
                                            <span aria-hidden>·</span>
                                            <span>{formatDate(article.created_at)}</span>
                                        </>
                                    )}
                                    {article.archived_url && (
                                        <>
                                            <span aria-hidden>·</span>
                                            <a
                                                href={article.archived_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-(--primary-accent) transition-colors underline underline-offset-2"
                                            >
                                                archived
                                            </a>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
