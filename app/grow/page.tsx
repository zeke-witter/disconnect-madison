import type { Metadata } from "next";
import Link from "next/link";
import FlyerCarousel, { type Flyer } from "@/app/components/FlyerCarousel";

const colorFlyers: Flyer[] = [
    {
        file: "/flyers/flyer-generic.pdf",
        name: "General flyer",
        description: "For schools, gyms, coffee shops, libraries, and anywhere people gather.",
    },
    {
        file: "/flyers/flyer-neighbors.pdf",
        name: "Neighbors flyer",
        description: "Designed to prompt reflection and lead people to the quiz. Good for neighborhood boards, laundromats, community centers, and public spaces.",
    },
    {
        file: "/flyers/flyer-bartrivia.pdf",
        name: "Neighborhood bar flyer",
        description: "For locally owned bars, especially those with trivia nights or live music. Speaks to the kind of people who already choose real rooms over screens.",
    },
    {
        file: "/flyers/flyer-mindfulness.pdf",
        name: "Mindfulness flyer",
        description: "For yoga studios, meditation centers, and mindfulness-oriented spaces. Connects intentional phone use to the practices their communities already value.",
    },
    {
        file: "/flyers/flyer-bookstore.pdf",
        name: "Bookstore flyer",
        description: "Tailored for independent bookstores and the community-minded people who frequent them.",
    },
    {
        file: "/flyers/flyer-coffee.pdf",
        name: "Coffee shop flyer",
        description: "Tailored for independent coffee shops and cafes.",
    },
    {
        file: "/flyers/flyer-mentalhealth.pdf",
        name: "Mental health flyer",
        description: "Focused on the mental health impacts of algorithm-driven social media.",
    },
    {
        file: "/flyers/flyer-pets.pdf",
        name: "Pets flyer",
        description: "For pet owners, vet offices, groomers, and animal-loving communities.",
    },
    {
        file: "/flyers/flyer-epic.pdf",
        name: "EPIC flyer",
        description: "Tailored for large tech campuses and their employees.",
    },
    {
        file: "/flyers/flyer-church.pdf",
        name: "Church flyer",
        description: "For faith communities and houses of worship.",
    },
];

const bwFlyers: Flyer[] = [
    {
        file: "/flyers/flyer-generic-bw.pdf",
        name: "General flyer",
        description: "Black and white version of the general flyer.",
    },
    {
        file: "/flyers/flyer-neighbors-bw.pdf",
        name: "Neighbors flyer",
        description: "Designed to prompt reflection and lead people to the quiz. Good for neighborhood boards, laundromats, community centers, and public spaces.",
    },
    {
        file: "/flyers/flyer-bartrivia-bw.pdf",
        name: "Neighborhood bar flyer",
        description: "For locally owned bars, especially those with trivia nights or live music. Speaks to the kind of people who already choose real rooms over screens.",
    },
    {
        file: "/flyers/flyer-mindfulness-bw.pdf",
        name: "Mindfulness flyer",
        description: "For yoga studios, meditation centers, and mindfulness-oriented spaces. Connects intentional phone use to the practices their communities already value.",
    },
    {
        file: "/flyers/flyer-bookstore-bw.pdf",
        name: "Bookstore flyer",
        description: "Tailored for independent bookstores and the community-minded people who frequent them.",
    },
    {
        file: "/flyers/flyer-coffee-bw.pdf",
        name: "Coffee shop flyer",
        description: "Tailored for independent coffee shops and cafes.",
    },
    {
        file: "/flyers/flyer-mentalhealth-bw.pdf",
        name: "Mental health flyer",
        description: "Focused on the mental health impacts of algorithm-driven social media.",
    },
    {
        file: "/flyers/flyer-pets-bw.pdf",
        name: "Pets flyer",
        description: "Black and white version of the pets flyer.",
    },
    {
        file: "/flyers/flyer-epic-bw.pdf",
        name: "EPIC flyer",
        description: "Tailored for large tech campuses and their employees.",
    },
    {
        file: "/flyers/flyer-church-bw.pdf",
        name: "Church flyer",
        description: "Black and white version of the church flyer.",
    },
];

const cards: Flyer[] = [
    {
        file: "/not-business-cards/card-leaf.pdf",
        name: "Leaf card",
        description: "A small, two-sided card you can hand to someone or leave somewhere interesting.",
    },
];

export const metadata: Metadata = {
    title: "Help Us Grow",
    description: "Help Disconnect Madison reach more people. Print a flyer, share your story, or get in touch with ideas.",
    alternates: { canonical: "/grow" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="grow-heading" className="w-full mb-10">
                <h1 id="grow-heading" className="font-handjet text-5xl lg:text-7xl mb-4">
                    Help us grow
                </h1>
                <p className="text-lg text-(--secondary-accent)">
                    Disconnect Madison is a registered 501(c)(3) nonprofit operated by one person with no marketing budget and no paid staff. Here&apos;s how you can help.
                </p>
            </section>

            <section aria-labelledby="tell-a-friend-heading" className="w-full mb-10">
                <h2 id="tell-a-friend-heading" className="font-handjet text-4xl lg:text-5xl mb-3">Tell your friends</h2>
                <p className="text-(--secondary-accent)">The single most important factor in our growth is word-of-mouth. Start a dialogue with people in your life. Tell them what you&apos;ve learned. Take the pledge together. <span className="font-bold">If you&apos;ve taken the pledge, share your badge on social media.</span> We recognize the irony, but sharing helps with accountability and encourages others to be brave. We aim to meet people where they are, and the people who stand to benefit most from being more intentional about their screen time are spending their time on Instagram, TikTok, Facebook, etc.</p>
            </section>

            <section aria-labelledby="flyers-heading" className="w-full mb-10">
                <h2 id="flyers-heading" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Print and post a flyer
                </h2>
                <p className="text-(--secondary-accent) mb-8">
                    Print one out and post it somewhere people in your community will see it: a school hallway, library, coffee shop, gym, or community board. Click a flyer to open it as a PDF.
                </p>

                <p className="text-sm text-(--secondary-accent) mb-6">
                    The flyers say <span className="font-medium">disconnectmadison.org</span>, which redirects to this site. It&apos;s a local domain for Madison-area outreach. If you&apos;re outside Madison, WI and would prefer versions with a more generic URL, <Link href="/contact" className="underline hover:text-(--primary-color)">just ask</Link>.
                </p>

                <h3 className="font-handjet text-2xl mb-4">Color</h3>
                <FlyerCarousel flyers={colorFlyers} />

                <h3 className="font-handjet text-2xl mt-10 mb-2">Black and white</h3>
                <p className="text-sm text-(--secondary-accent) mb-4">Cheaper to print at home or a copy shop.</p>
                <FlyerCarousel flyers={bwFlyers} />

                <p className="text-(--secondary-accent) mt-8">
                    Want to help post flyers around Madison? <Link href="/grow/flyer-locations" className="underline hover:text-(--primary-color)">See where we&apos;ve been and where we still need help.</Link>
                </p>
            </section>

            <section aria-labelledby="cards-heading" className="w-full mb-10">
                <h2 id="cards-heading" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Cards
                </h2>
                <p className="text-(--secondary-accent) mb-8">
                    Small enough to keep in your pocket or wallet. Hand one to someone in conversation, or leave a few somewhere people might pick them up. Click a card to open it as a PDF. No littering!
                </p>
                <FlyerCarousel flyers={cards} aspectRatio="3.5 / 2" />
            </section>

            <section aria-labelledby="donate-heading" className="w-full mb-10">
                <h2 id="donate-heading" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Make a donation
                </h2>
                <p className="text-(--secondary-accent) mb-4">
                    Disconnect Madison is a 501(c)(3) nonprofit. If you&apos;d like to support the work financially, every dollar helps cover hosting, printing, and outreach. Donations are tax-deductible.
                </p>
                <p>
                    <Link
                        href="/donate"
                        className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)"
                    >
                        Visit the donate page →
                    </Link>
                </p>
            </section>

            <section aria-labelledby="ideas-heading" className="w-full mb-10">
                <h2 id="ideas-heading" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Got an idea? Want to help?
                </h2>
                <p className="text-(--secondary-accent) mb-4">
                    We&apos;re always open to new ideas, better ways to spread the message, partnerships, events, content, or anything else you think could move the needle. If you want to get involved in any capacity, we&apos;d love to hear from you.
                </p>
                <p className="mb-4">We&apos;re especially in need of assistance from graphic designers (can you tell?) and people with experience in community organizing.</p>
                <p>
                    <Link
                        href="/contact"
                        className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)"
                    >
                        Send us a message through the contact form →
                    </Link>
                </p>
            </section>

        </div>
    );
}
