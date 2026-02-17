import { getNewsArticlesAction } from "@/lib/actions";

export default async function NewsCarousel() {
    const articles = await getNewsArticlesAction();

    if (articles.length === 0) return null;

    return (
        <section aria-labelledby="news-heading" className="w-full">
            <h2 id="what-happens" className="font-handjet text-5xl lg:text-7xl font-bold mb-8">In the news</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
                {articles.map((article) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-news flex-shrink-0 w-64 rounded-md border border-(--secondary-accent) overflow-hidden hover:opacity-80 transition-opacity"
                    >
                        {article.image_url ? (
                            <img
                                src={article.image_url}
                                alt=""
                                className="w-full h-36 object-cover"
                            />
                        ) : (
                            <div className="w-full h-36 bg-(--secondary-accent) opacity-20" />
                        )}
                        <p className="p-3 text-sm font-medium leading-snug">
                            {article.title}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
}
