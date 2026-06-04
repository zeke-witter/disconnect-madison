import {
    getAllPledgesAction, deletePledgeAction,
    getAllNewsArticlesAction, deleteNewsArticleAction, deleteAllNewsArticlesAction,
    getAllEventRegistrationsAction, deleteEventRegistrationAction, deleteAllEventRegistrationsAction,
} from '@/lib/actions';
import LogoutButton from '@/app/components/LogoutButton';

const PLEDGE_LABELS: Record<string, string> = {
    reduce_screen_time: 'Reduce screen time',
    take_a_break: 'Step away',
    quit_for_good: 'Quit for good',
};

export default async function Page() {
    const canDelete = !process.env.VERCEL_ENV;
    const [pledges, articles, registrations] = await Promise.all([
        getAllPledgesAction(),
        getAllNewsArticlesAction(),
        getAllEventRegistrationsAction(),
    ]);

    return (
        <div className="w-full max-w-4xl mx-auto font-body">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="font-display text-5xl">Dev Tools</h1>
                </div>
                <div className="flex items-center gap-3">
                    <LogoutButton />
                </div>
            </div>

            {/* Pledges */}
            <section className="mb-16" aria-labelledby="pledges-heading">
                <div className="flex items-center justify-between mb-4">
                    <h2 id="pledges-heading" className="font-display text-3xl">Pledges</h2>
                </div>

                {pledges.length === 0 ? (
                    <p className="text-(--muted)">No pledges in the database.</p>
                ) : (
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-(--accent-muted) text-left text-(--muted)">
                                <th className="pb-2 pr-4 font-medium">Email</th>
                                <th className="pb-2 pr-4 font-medium">Pledge</th>
                                <th className="pb-2 pr-4 font-medium">Confirmed</th>
                                <th className="pb-2 pr-4 font-medium">Created</th>
                                <th className="pb-2 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pledges.map((pledge) => (
                                <tr key={pledge.id} className="border-b border-(--accent-muted)/30">
                                    <td className="py-3 pr-4">{pledge.email}</td>
                                    <td className="py-3 pr-4">{PLEDGE_LABELS[pledge.pledge_action] ?? pledge.pledge_action}</td>
                                    <td className="py-3 pr-4">
                                        <span className={`font-bold ${pledge.confirmed ? 'text-(--muted)' : 'text-(--muted)'}`}>
                                            {pledge.confirmed ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-4 text-(--muted)">
                                        {new Date(pledge.created_at).toLocaleString()}
                                    </td>
                                    {canDelete && (
                                        <td className="py-3">
                                            <form action={deletePledgeAction}>
                                                <input type="hidden" name="id" value={pledge.id} />
                                                <button
                                                    type="submit"
                                                    className="text-(--accent) hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            {/* Event Registrations */}
            <section className="mb-16" aria-labelledby="registrations-heading">
                <div className="flex items-center justify-between mb-4">
                    <h2 id="registrations-heading" className="font-display text-3xl">Event Registrations</h2>
                    {canDelete && registrations.length > 0 && (
                        <form action={deleteAllEventRegistrationsAction}>
                            <button
                                type="submit"
                                className="rounded-md border border-(--accent) px-4 py-2 text-sm font-bold text-(--accent) transition-colors hover:bg-(--accent) hover:text-(--on-accent) cursor-pointer"
                            >
                                Delete all ({registrations.length})
                            </button>
                        </form>
                    )}
                </div>

                {registrations.length === 0 ? (
                    <p className="text-(--muted)">No registrations in the database.</p>
                ) : (
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-(--accent-muted) text-left text-(--muted)">
                                <th className="pb-2 pr-4 font-medium">Event</th>
                                <th className="pb-2 pr-4 font-medium">Name</th>
                                <th className="pb-2 pr-4 font-medium">Email</th>
                                <th className="pb-2 pr-4 font-medium">Guests</th>
                                <th className="pb-2 pr-4 font-medium">Status</th>
                                <th className="pb-2 pr-4 font-medium">Cancel link</th>
                                <th className="pb-2 pr-4 font-medium">Created</th>
                                <th className="pb-2 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => {
                                const status = reg.cancelled ? 'Cancelled' : reg.waitlisted ? 'Waitlisted' : 'Confirmed';
                                return (
                                    <tr key={reg.id} className="border-b border-(--accent-muted)/30">
                                        <td className="py-3 pr-4 max-w-40 truncate">{reg.events?.title ?? '—'}</td>
                                        <td className="py-3 pr-4">{reg.name}</td>
                                        <td className="py-3 pr-4">{reg.email}</td>
                                        <td className="py-3 pr-4">{reg.guest_count > 0 ? `+${reg.guest_count}` : '—'}</td>
                                        <td className="py-3 pr-4">
                                            <span className={
                                                reg.cancelled ? 'text-(--muted)' :
                                                reg.waitlisted ? 'text-amber-700' :
                                                'text-green-700'
                                            }>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <a
                                                href={`/events/cancel?token=${reg.cancellation_token}`}
                                                className="font-mono text-xs text-(--accent) hover:underline"
                                            >
                                                cancel link
                                            </a>
                                        </td>
                                        <td className="py-3 pr-4 text-(--muted) whitespace-nowrap">
                                            {new Date(reg.created_at).toLocaleString()}
                                        </td>
                                        {canDelete && (
                                            <td className="py-3">
                                                <form action={deleteEventRegistrationAction}>
                                                    <input type="hidden" name="id" value={reg.id} />
                                                    <button
                                                        type="submit"
                                                        className="text-(--accent) hover:underline cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </section>

            {/* News Articles */}
            <section aria-labelledby="news-heading">
                <div className="flex items-center justify-between mb-4">
                    <h2 id="news-heading" className="font-display text-3xl">News Articles</h2>
                    {canDelete && articles.length > 0 && (
                        <form action={deleteAllNewsArticlesAction}>
                            <button
                                type="submit"
                                className="rounded-md border border-(--accent) px-4 py-2 text-sm font-bold text-(--accent) transition-colors hover:bg-(--accent) hover:text-(--on-accent) cursor-pointer"
                            >
                                Delete all ({articles.length})
                            </button>
                        </form>
                    )}
                </div>

                {articles.length === 0 ? (
                    <p className="text-(--muted)">No articles in the database.</p>
                ) : (
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-(--accent-muted) text-left text-(--muted)">
                                <th className="pb-2 pr-4 font-medium">Image</th>
                                <th className="pb-2 pr-4 font-medium">Title</th>
                                <th className="pb-2 pr-4 font-medium">Created</th>
                                <th className="pb-2 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id} className="border-b border-(--accent-muted)/30">
                                    <td className="py-3 pr-4">
                                        {article.image_url ? (
                                            <img
                                                src={article.image_url}
                                                alt=""
                                                className="w-16 h-10 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-(--muted)">—</span>
                                        )}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline line-clamp-2"
                                        >
                                            {article.title}
                                        </a>
                                    </td>
                                    <td className="py-3 pr-4 text-(--muted) whitespace-nowrap">
                                        {new Date(article.created_at).toLocaleString()}
                                    </td>
                                    {canDelete && (
                                        <td className="py-3">
                                            <form action={deleteNewsArticleAction}>
                                                <input type="hidden" name="id" value={article.id} />
                                                <button
                                                    type="submit"
                                                    className="text-(--accent) hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
