import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Data Centers & Ecological Impact",
    description: "How the infrastructure powering social media is consuming electricity and water at massive scale, and what it means for the Great Lakes region.",
    alternates: { canonical: "/learn/ecological-impact" },
};

const stats = [
    {
        figure: "~1%",
        detail: "of global electricity consumed by data centers in 2022, comparable to some mid-sized countries",
        source: "IEA, 2022",
    },
    {
        figure: "2×+",
        detail: "projected increase in global data center electricity demand by 2026",
        source: "IEA, 2024",
    },
    {
        figure: "~10×",
        detail: "more energy used per AI query compared to a standard web search",
        source: "Multiple estimates",
    },
    {
        figure: "21%",
        detail: "of the world's surface freshwater held in the Great Lakes basin",
        source: "Great Lakes Commission",
    },
];

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="ecological-heading" className="w-full mb-4">
                <h1 id="ecological-heading" className="font-handjet text-5xl lg:text-7xl mb-3">
                    The ecological cost
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    The infrastructure that powers social media is physical. It consumes electricity, generates heat, and requires enormous amounts of water to cool. That cost is invisible inside the app, but it is real and it is growing.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {stats.map(({ figure, detail, source }) => (
                        <div key={figure} className="border border-(--secondary-accent) rounded-md p-5 flex flex-col gap-2">
                            <span className="font-handjet text-5xl font-bold text-(--primary-accent) leading-none">{figure}</span>
                            <span className="text-sm font-medium text-(--primary-color) leading-snug">{detail}</span>
                            <span className="text-xs text-(--secondary-accent) mt-auto">{source}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="electricity" className="w-full mb-16">
                <h2 id="electricity" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The electricity nobody sees
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Data centers are one of the fastest-growing categories of electricity demand on the planet.
                </p>
                <div className="space-y-4">
                    <p>
                        Global data centers consumed roughly 240 TWh of electricity in 2022, according to the International Energy Agency. That is approximately 1% of total worldwide electricity demand, comparable to the annual consumption of some mid-sized countries. For context, that figure had held relatively stable through the 2010s as efficiency improvements kept pace with rising workloads. That period of stability appears to be over.
                    </p>
                    <p>
                        In its 2024 electricity forecast, the IEA projected that global data center electricity demand could more than double by 2026, driven primarily by the rapid expansion of AI infrastructure. In the United States alone, data centers are estimated to account for roughly 4% of national electricity consumption, a share the IEA expects to grow significantly in the next few years.
                    </p>
                    <p>
                        Much of this growth is happening in regions where the electrical grid still relies heavily on fossil fuels. Data center operators often make commitments to match their consumption with renewable energy certificates, but matching and actually running on renewable electrons are different things. When a data center draws power from a grid at 2 a.m. in a coal-heavy region, the fact that it purchased renewable energy credits elsewhere does not change what fuel was burned to deliver that electricity.
                    </p>
                </div>
            </section>

            <section aria-labelledby="water" className="w-full mb-16">
                <h2 id="water" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Water: the cost hidden in plain sight
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Keeping servers from overheating requires enormous quantities of water. Most of it evaporates and does not return to the source.
                </p>
                <div className="space-y-4">
                    <p>
                        The dominant cooling method in large data centers is evaporative cooling, in which water absorbs heat and is released as vapor into the atmosphere. Unlike water used in a closed loop, this water is consumed: it leaves the watershed and does not come back. The larger the facility and the warmer the climate, the more water it needs.
                    </p>
                    <p>
                        Google disclosed in its 2023 Environmental Report that it consumed roughly 5.6 billion gallons of water in 2022, an increase of about 20% compared to the prior year. Microsoft reported consuming approximately 1.7 billion gallons in its 2022 Environmental Sustainability Report, a 34% increase year over year, which the company attributed in part to the expansion of AI infrastructure. Meta has reported similar upward trends. These are voluntary disclosures; there is no federal requirement for data center operators to report water consumption publicly.
                    </p>
                    <p>
                        This water comes primarily from municipal systems and underground aquifers, the same sources that supply agriculture, ecosystems, and residential use. In regions already facing water stress, large industrial users competing for the same supply creates real pressure on communities that often had no say in the siting decision.
                    </p>
                </div>
            </section>

            <section aria-labelledby="ai-math" className="w-full mb-16">
                <h2 id="ai-math" className="font-handjet text-4xl lg:text-5xl mb-3">
                    AI rewrites the math
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The shift from keyword search to AI-generated responses is not just a product change. It changes the energy equation significantly.
                </p>
                <div className="space-y-4">
                    <p>
                        A standard web search consumes roughly 0.3 Wh of electricity. Multiple estimates suggest that generating a response with a large AI model uses approximately ten times as much energy, though the range varies considerably depending on the model, the length of the response, and the hardware involved. The comparison is not precise, but the directional difference is consistent across published estimates.
                    </p>
                    <p>
                        Social media recommendation algorithms run continuously and at massive scale. Every time a feed refreshes, a personalized ranking is computed in real time for a specific user based on their history, the content available, and the predicted engagement of every possible item. This is not a cached document being retrieved; it is an active computation run billions of times per day. As platforms incorporate more AI into content ranking, ad targeting, and generative features, the per-user energy cost is rising.
                    </p>
                    <p>
                        Training large AI models is an enormous one-time energy expenditure, but running them is an ongoing cost that compounds with each user interaction. A 2023 paper published on arXiv estimated that a conversation of 20 to 50 questions with a large AI system could require roughly the cooling equivalent of a 16-ounce bottle of water. The methodology has been contested and the numbers should be treated as directionally indicative rather than precise, but the underlying point is clear: conversational AI is more resource-intensive than the interfaces it is replacing, and social media is adopting it quickly.
                    </p>
                </div>
            </section>

            <section aria-labelledby="great-lakes" className="w-full mb-16">
                <h2 id="great-lakes" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The Great Lakes in the crosshairs
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    The Midwest is one of the fastest-growing data center markets in the country. The Great Lakes are part of why.
                </p>
                <div className="space-y-4">
                    <p>
                        The Great Lakes basin holds roughly 21% of the world&apos;s surface freshwater and provides drinking water to about 40 million people in the United States and Canada. The region also offers abundant land, existing power infrastructure, a relatively cooler climate, and proximity to major population centers. These same qualities that make it attractive for agriculture and communities make it attractive for data center development.
                    </p>
                    <p>
                        The Chicago metropolitan area is consistently ranked among the top data center markets in the United States. Indiana, Ohio, and Wisconsin have all seen increasing investment in data center construction in recent years. Real estate and technology industry reporting describes the Midwest broadly as a fast-growing market for this infrastructure, driven partly by land costs, partly by energy availability, and partly by access to freshwater for cooling.
                    </p>
                    <p>
                        The Great Lakes-St. Lawrence River Basin Water Resources Compact of 2008 governs diversions of water out of the basin, establishing a framework requiring regional approval for large-scale withdrawals that leave the watershed. However, water used within the basin for industrial purposes, including data center cooling, operates under a different and less restrictive regulatory environment. The Compact protects against removing water from the region, but not necessarily against consuming it within it.
                    </p>
                    <p>
                        The Lakes face compounding pressures: climate-driven fluctuations in water levels, rising water temperatures, more frequent algal blooms, and increasing competition for water resources. Adding large-scale industrial water consumption to that system is not a neutral decision. It is an additional draw on a resource that is already under stress and that millions of people, farms, and ecosystems depend on.
                    </p>
                </div>
            </section>

            <section aria-labelledby="jobs" className="w-full mb-16">
                <h2 id="jobs" className="font-handjet text-4xl lg:text-5xl mb-3">
                    The jobs promise
                </h2>
                <div className="space-y-4">
                    <p className="text-(--secondary-accent)">
                        When a data center developer comes to a city or county, the pitch usually leads with jobs. The math behind that pitch is worth examining closely.
                    </p>
                    <p>
                        Construction employment is real. A large facility requires electricians, ironworkers, concrete workers, and general contractors for two to four years. These are skilled trades jobs that pay well and matter to local workers and their families. Nobody serious disputes this part of the promise.
                    </p>
                    <p>
                        The permanent employment picture is different. Meta announced its $1 billion data center campus in Beaver Dam, Wisconsin in November 2025. The project is expected to support approximately 1,000 construction jobs while it is being built, and around 100 operational jobs once it opens in 2027. That is a 10-to-1 ratio: ten temporary positions for every one that remains. A billion-dollar facility, 100 permanent employees.
                    </p>
                    <p>
                        Microsoft's $3.3 billion investment on the former Foxconn site in Mount Pleasant tells a different story on paper: the company has cited 2,000 permanent jobs. That figure is unusually high for a data center operation and deserves scrutiny, particularly given that the Foxconn project on the same land famously promised 13,000 jobs and delivered a fraction of that before being restructured. The Microsoft project includes AI-related functions beyond basic facility operations, which may account for the higher estimate, but independent verification of those numbers does not yet exist.
                    </p>
                    <p>
                        The public cost of these deals is also worth examining. Wisconsin created a Data Center Sales and Use Tax Exemption in 2023 that allows qualifying facilities to avoid sales tax on servers, networking equipment, and related hardware. Servers are expensive. The exemption is substantial. Wisconsin taxpayers spent an estimated $40 million in 2024 subsidizing data center construction, a figure the state Department of Revenue had originally projected at $8.5 million. Analysts expect the cost to exceed $100 million per budget cycle as more projects come online.
                    </p>
                    <p>
                        Critically, the exemption has no sunset provision. A company that qualifies today pays no sales tax on equipment purchases for as long as it operates in Wisconsin. Kasia Tarczynska, a senior research analyst at Good Jobs First, which tracks corporate subsidies nationally, has specifically flagged this as a problem. Her organization found that data center sales tax exemption programs across 15 states drained nearly $1.5 billion in local and state revenue in 2023 alone. She recommends that states add job creation requirements, sunset provisions, and annual caps, none of which Wisconsin currently has.
                    </p>
                    <p>
                        Foregone tax revenue is not abstract. It represents school funding, road maintenance, fire and emergency services, and local government capacity that must either be made up elsewhere or cut. A facility that contributes relatively little to permanent employment and pays reduced taxes for an indefinite period is not obviously a good deal for a community, even if the construction phase brings real short-term benefits.
                    </p>
                    <p>
                        The Brookings Institution, studying data center economic development broadly, concluded that &ldquo;the standard data center development model delivers short-term construction jobs and revenue, but little durable local economic upside.&rdquo; That assessment fits what Wisconsin is seeing: significant public investment, genuine but temporary construction employment, and a small permanent workforce that often requires specialized skills not always sourced locally.
                    </p>
                    <p>
                        There are more responsible approaches. Meta&apos;s Beaver Dam facility uses dry-cooling technology, which eliminates water consumption for cooling entirely, and the company is funding the restoration of 570 acres of wetlands surrounding the campus. These commitments do not change the jobs math, but they demonstrate that developers can be held to higher environmental standards when communities and regulators demand it. The question is whether Wisconsin is asking.
                    </p>
                </div>
            </section>

            <section aria-labelledby="social-piece" className="w-full mb-16">
                <h2 id="social-piece" className="font-handjet text-4xl lg:text-5xl mb-3">
                    Social media&apos;s piece of the picture
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Not all internet traffic is equal. Video is the most energy-intensive content type, and it now dominates social feeds.
                </p>
                <div className="space-y-4">
                    <p>
                        Video streaming requires significantly more bandwidth and server processing than static images or text. According to IEA analysis, streaming video accounts for a substantial share of global internet traffic. TikTok, Instagram Reels, and YouTube Shorts have made short-form video the central content type in social media, and autoplay features mean that video begins consuming bandwidth before a user has decided to watch it. Autoplay is a deliberate design choice. It increases time on platform. It also increases energy consumption, whether or not a user is actually watching.
                    </p>
                    <p>
                        Your social media feed is not a static document. It is assembled in real time, on demand, specifically for you, based on your history and the predicted engagement of every candidate post. This computation happens every time you open the app and every time you scroll. Multiply that process across billions of daily active users and the energy and water implications are substantial. None of this is communicated to users. The product experience is designed to feel lightweight and effortless. The physical infrastructure required to deliver it is neither.
                    </p>
                </div>
            </section>

            <section aria-labelledby="industry-promises" className="w-full mb-16">
                <h2 id="industry-promises" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What the industry is promising
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Major tech companies have made real commitments on sustainability. They have also obscured some important distinctions.
                </p>
                <div className="space-y-4">
                    <p>
                        Google has claimed to match its global electricity consumption with renewable energy purchases since 2017. Microsoft has committed to becoming carbon negative by 2030 and to replenishing more water than it consumes by the same year. Meta claimed operational carbon neutrality as of 2020. These are genuine corporate commitments and not nothing.
                    </p>
                    <p>
                        The distinction that often gets lost in these announcements is between &ldquo;matched&rdquo; and &ldquo;powered by.&rdquo; Renewable energy certificates (RECs) allow a company to claim carbon neutrality by purchasing credits representing renewable generation somewhere on the grid, even if the electrons actually delivered to its facilities come from fossil fuels. Matching on paper is a meaningful step, but it is not the same as running on clean power. Several of these companies are working toward hourly or regional matching, which would be a stronger standard.
                    </p>
                    <p>
                        Water commitments face a similar gap between current trajectory and stated goals. Microsoft committed to being &ldquo;water positive&rdquo; by 2030, meaning it would replenish more water than it consumes. Its 2022 disclosure showed consumption up 34% year over year. There is a real distance between that trajectory and the goal.
                    </p>
                    <p>
                        There is also a structural problem that efficiency improvements alone cannot solve: the rebound effect. As data centers become more energy-efficient, the cost per unit of computation falls, which drives more demand for computation, which can eliminate the efficiency gains at the aggregate level. This pattern has held broadly in the history of computing. Efficiency is necessary but not sufficient if demand grows faster than the efficiency improvements.
                    </p>
                </div>
            </section>

            <section aria-labelledby="what-to-do" className="w-full mb-16">
                <h2 id="what-to-do" className="font-handjet text-4xl lg:text-5xl mb-3">
                    What you can do with this
                </h2>
                <p className="text-(--secondary-accent) mb-6">
                    Individual choices are not going to solve infrastructure-scale problems. But that does not mean individual choices are irrelevant.
                </p>
                <div className="space-y-4">
                    <p>
                        To be honest: your decision to use or not use social media will not close a data center. The scale mismatch between personal consumption and industrial infrastructure is real, and anyone who suggests otherwise is oversimplifying. That said, demand is demand. Consumer behavior aggregated across enough people shapes investment decisions. The social media business model is attention-based, and less attention means less advertising revenue, which eventually affects how much infrastructure gets built to serve it.
                    </p>
                    <p>
                        There are also places where civic engagement directly connects to this issue. Wisconsin&apos;s Public Service Commission reviews utility infrastructure proposals, including applications related to large new industrial loads like data centers. Local officials make zoning decisions about where these facilities are sited. The Great Lakes are governed by compacts and agreements that are responsive to public input and political pressure. These are not closed systems. They have points of entry for people who are paying attention.
                    </p>
                    <p>
                        If you want to do something tangible: know what your region&apos;s data center development looks like and who is deciding it. Talk to people who depend on the Lakes. And reduce the demand signal you personally send to platforms that have externalized these costs onto your watershed.
                    </p>
                    <p>
                        <Link href="/pledge" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Take the pledge</Link>: reduce your use, step away, or quit for good. Full citations for the research referenced on this page are on the{" "}
                        <Link href="/sources" className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)">Sources page</Link>.
                    </p>
                </div>
            </section>

            <section aria-labelledby="eco-sources" className="w-full mb-8 text-sm text-(--secondary-accent)">
                <h2 id="eco-sources" className="font-bold text-base mb-3 text-(--primary-color)">Sources</h2>
                <p>
                    Full citations for every study and report referenced on this page are available on the{" "}
                    <Link href="/sources" className="underline">Sources page</Link>.
                </p>
            </section>

        </div>
    );
}
