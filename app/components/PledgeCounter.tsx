import { getPledgesAction } from "@/lib/actions";

export default async function PledgeCounter() {
    // const data = await getPledgesAction();
    // console.log('number of pledges:', data);
    return (
        <div className="flex flex-col lg:flex-row justify-center w-full font-handjet">
            <div className="text-center mx-8 max-w-60">
                <p className="text-6xl text-(--primary-color)" aria-labelledby="pledged-to-deactivate-one">1,306</p>
                <h2 id="pledged-to-deactivate-one" className="text-2xl">Pledged to temporarily deactivate one account</h2>
            </div>
            <div className="text-center mx-8 max-w-60">
                <p className="text-6xl text-(--primary-accent)" aria-labelledby="pledged-to-delete-all">201</p>
                <h2 id="pledged-to-delete-all" className="text-2xl">Pledged to permanently delete all accounts</h2>
            </div>
            <div className="text-center mx-8 max-w-60">
                <p className="text-6xl text-(--secondary-accent)" aria-labelledby="pledged-to-delete-one">504</p>
                <h2 id="pledged-to-delete-one" className="text-2xl">Pledged to permanently delete one account</h2>
            </div>
        </div>
    )
}