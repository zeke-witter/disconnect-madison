import { notFound } from 'next/navigation';
import { getDevPledgesAction, deletePledgeAction, deleteAllPledgesAction } from '@/lib/actions';

const PLEDGE_LABELS: Record<string, string> = {
    reduce_screen_time: 'Reduce screen time',
    take_a_break: 'Step away',
    quit_for_good: 'Quit for good',
};

export default async function Page() {
    if (process.env.VERCEL_ENV === 'production') notFound();

    const pledges = await getDevPledgesAction();

    return (
        <div className="w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-handjet text-5xl font-bold">Pledge Manager</h1>
                    <p className="text-sm text-(--secondary-accent) mt-1">Dev/staging only — not available in production.</p>
                </div>
                {pledges.length > 0 && (
                    <form action={deleteAllPledgesAction}>
                        <button
                            type="submit"
                            className="rounded-md border border-(--primary-accent) px-4 py-2 text-sm font-bold text-(--primary-accent) transition-colors hover:bg-(--primary-accent) hover:text-white cursor-pointer"
                        >
                            Delete all ({pledges.length})
                        </button>
                    </form>
                )}
            </div>

            {pledges.length === 0 ? (
                <p className="text-(--secondary-accent)">No pledges in the database.</p>
            ) : (
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-(--secondary-accent) text-left text-(--secondary-accent)">
                            <th className="pb-2 pr-4 font-medium">Email</th>
                            <th className="pb-2 pr-4 font-medium">Pledge</th>
                            <th className="pb-2 pr-4 font-medium">Confirmed</th>
                            <th className="pb-2 pr-4 font-medium">Created</th>
                            <th className="pb-2 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pledges.map((pledge) => (
                            <tr key={pledge.id} className="border-b border-(--secondary-accent)/30">
                                <td className="py-3 pr-4">{pledge.email}</td>
                                <td className="py-3 pr-4">{PLEDGE_LABELS[pledge.pledge_action] ?? pledge.pledge_action}</td>
                                <td className="py-3 pr-4">
                                    <span className={`font-bold ${pledge.confirmed ? 'text-emerald-600' : 'text-(--secondary-accent)'}`}>
                                        {pledge.confirmed ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="py-3 pr-4 text-(--secondary-accent)">
                                    {new Date(pledge.created_at).toLocaleString()}
                                </td>
                                <td className="py-3">
                                    <form action={deletePledgeAction}>
                                        <input type="hidden" name="id" value={pledge.id} />
                                        <button
                                            type="submit"
                                            className="text-(--primary-accent) hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
