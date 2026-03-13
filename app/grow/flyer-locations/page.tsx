import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Flyer Locations",
    description: "Where Disconnect Madison flyers have been posted around Madison, WI, and places we'd love help reaching.",
    alternates: { canonical: "/grow/flyer-locations" },
};

const posted = [
    {
        category: "Independent coffee shops",
        locations: ["Johnson Public House", "Indie Coffee", "Michelangelo's Coffee House", "Fair Trade Coffee House", "Collectivo (Monroe St.)"],
    },
    {
        category: "Independent bookstores",
        locations: ["Mystery to Me", "Lake City Books", "The Book Deal", "Leopold's Books Bar Cafe", "Frugal Muse Books"],
    },
    {
        category: "Community boards",
        locations: ["Willy Street Co-op (Willy St., Middleton)"],
    },
    {
        category: "Bars",
        locations: ["Mana Tap (Milwaukee)"],
    },
    {
        category: "Misc",
        locations: ["Corner of E. Johnson and Paterson"],
    },
];

const uncertain = [
    "Public libraries (distributed, unconfirmed): McFarland, Fitchburg, Oregon, Middleton, Sun Prairie, Stoughton",
    "I'm Board! Games and Family Fun (shared, unconfirmed)",
];

const wishlist = [
    {
        category: "Independent bookstores",
        locations: ["Friends of Sequoya Library"],
    },
    {
        category: "Independent coffee shops",
        locations: ["Cargo Coffee", "Bradbury's", "Mercies Coffee", "Firefly Coffeehouse", "The Sow's Ear"],
    },
    {
        category: "Locally owned bars",
        locations: [
            "Giant Jones",
            "Delta Beer Lab",
            "Working Draft",
            "Willy St. Tavern",
            "The Wisco",
            "Robin Room",
            "Oz by Oz",
            "Come Back Inn",
            "Up North",
            "North Side Cabaret",
            "The Rigby",
            "The Argus",
            "The Brass Ring",
            "Ohio Tavern",
            "High Noon Salloon",
            "Many, many more (this is Wisconsin, after all)",
        ],
    },
    {
        category: "Community boards",
        locations: ["Willy Street Co-op (2 more locations)", "Kwik Trip (several locations)"],
    },
    {
        category: "Yoga studios and mindfulness centers",
        locations: ["Perennial Yoga", "Inner Fire Yoga", "Madison Mindfulness", "little om BIG OM", "Insight Counseling & Wellness"],
    },
    {
        category: "Mental health and wellness orgs",
        locations: ["NAMI Dane County", "Journey Mental Health Center", "Community Shares of Wisconsin"],
    },
    {
        category: "Libraries",
        locations: ["Wisconsin Public Library system (many more locations; central library distributes for you)"],
    },
    {
        category: "Community centers and neighborhood orgs",
        locations: [
            "Wil-Mar neighborhood center",
            "Goodman community center",
            "Lussier community education center",
            "Neighborhood associations (100+, find through cityofmadison.com)",
            "The Social Justice Center",
        ],
    },
    {
        category: "Tech or tech-adjacent businesses",
        locations: [
            "EPIC (several buildings)",
            "100state (E. Washington Ave)",
            "StartingBlock Madison",
            "Madworks Coworking",
            "Generator (makerspace)",
            "Exact Sciences",
            "American Family Insurance (tech division / innovation center)",
            "Fetch Rewards",
            "Nordic Global",
        ],
    },
    {
        category: "Fitness and outdoor rec",
        locations: ["Fleet Feet", "REI", "Boulders", "Machinery Row", "Budget Bicycle Center"],
    },
    {
        category: "Board game cafes and analog entertainment",
        locations: ["Roll Play", "Noble Knight"],
    },
    {
        category: "Schools and parent groups",
        locations: ["MMSD", "Specific school PTAs"],
    },
    {
        category: "UW campus",
        locations: [
            "Memorial Union",
            "Union South",
            "UW Health Services / University Health Services",
            "Student orgs",
            "UW-Madison Information School (Rebekah Willett)",
            "Wisconsin Institute for Discovery",
            "Wisconsin Alumni Research Foundation (WARF)",
            "UW-Madison Discovery to Product (D2P)",
        ],
    },
    {
        category: "Potential institutional partners",
        locations: ["Dane Buy Local", "Sustain Dane", "DANEnet", "Isthmus", "Madison365", "United Way of Dane County", "Boys & Girls Club"],
    },
    {
        category: "Misc",
        locations: ["Your apartment building's bulletin board or elevators!"],
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="locations-heading" className="w-full mb-10">
                <div className="mb-6">
                    <Link href="/grow" className="text-sm text-(--secondary-accent) hover:text-(--primary-color) underline">
                        ← Back to Help Us Grow
                    </Link>
                </div>
                <h1 id="locations-heading" className="font-handjet text-5xl lg:text-7xl mb-4">
                    Flyer locations
                </h1>
                <p className="text-lg text-(--secondary-accent)">
                    A running log of where flyers have been posted around Madison, and places that are still on the list. If any of these are near you, we'd love help getting a flyer up. <Link href="/contact" className="underline hover:text-(--primary-color)">Let us know</Link> if you do.
                </p>
            </section>

            <section aria-labelledby="posted-heading" className="w-full mb-12">
                <h2 id="posted-heading" className="font-handjet text-4xl lg:text-5xl mb-6">Posted</h2>
                <div className="space-y-6">
                    {posted.map(({ category, locations }) => (
                        <div key={category}>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-(--secondary-accent) mb-2">{category}</h3>
                            <ul className="space-y-1">
                                {locations.map((loc) => (
                                    <li key={loc} className="flex items-center gap-2 text-(--secondary-accent)">
                                        <span className="text-green-600 dark:text-green-400 font-bold shrink-0" aria-hidden="true">✓</span>
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {uncertain.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-(--border-color)">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-(--secondary-accent) mb-2">Possibly posted</h3>
                        <ul className="space-y-1">
                            {uncertain.map((loc) => (
                                <li key={loc} className="text-sm text-(--secondary-accent)">{loc}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <section aria-labelledby="wishlist-heading" className="w-full mb-10">
                <h2 id="wishlist-heading" className="font-handjet text-4xl lg:text-5xl mb-3">On the list</h2>
                <p className="text-(--secondary-accent) mb-8">
                    These are spots we'd like to reach. If you're a regular at any of them, or you're willing to make a stop, printing a flyer and asking to put it up would make a real difference. You can <Link href="/grow" className="underline hover:text-(--primary-color)">download a flyer on the grow page</Link>. If you know of a local business or organization that should be on the list, please <Link href="/contact">let us know</Link>, or feel free to bring a flyer there on our behalf :).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlist.map(({ category, locations }) => (
                        <div key={category} className="border border-(--border-color) rounded-lg p-5">
                            <h3 className="font-handjet text-xl mb-3">{category}</h3>
                            <ul className="space-y-1">
                                {locations.map((loc) => (
                                    <li key={loc} className="text-sm text-(--secondary-accent)">{loc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
