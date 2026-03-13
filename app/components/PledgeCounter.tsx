import { getPledgesAction } from "@/lib/actions";

export default async function PledgeCounter() {
    const counts = await getPledgesAction();
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center w-full font-handjet gap-6 lg:gap-0">
            <div className="text-center mx-8 max-w-70">
                <p className="text-6xl text-(--primary-color)" aria-labelledby="pledged-to-reduce">{counts.reduce_screen_time.toLocaleString()}</p>
                <p id="pledged-to-reduce" className="text-2xl">Pledged to reduce screen time</p>
            </div>
            <div className="text-center mx-8 max-w-70">
                <p className="text-6xl text-(--foreground)" aria-labelledby="pledged-to-step-away">{counts.take_a_break.toLocaleString()}</p>
                <p id="pledged-to-step-away" className="text-2xl">Pledged to step away</p>
            </div>
            <div className="text-center mx-8 max-w-70">
                <p className="text-6xl text-(--primary-accent)" aria-labelledby="pledged-to-quit">{counts.quit_for_good.toLocaleString()}</p>
                <p id="pledged-to-quit" className="text-2xl">Pledged to quit for good</p>
            </div>
        </div>
    )
}
