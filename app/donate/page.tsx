'use client';

import { useEffect } from 'react';

const GIVE_LIVELY_WIDGET_URL = 'https://secure.givelively.org/widgets/simple_donation/disconnect-society-inc.js?show_suggested_amount_buttons=true&address_required=false&has_required_custom_question=false&suggested_donation_amounts[]=10&suggested_donation_amounts[]=25&suggested_donation_amounts[]=50&suggested_donation_amounts[]=100';

const PAYPAL_DONATE_URL = 'https://www.paypal.com/ncp/payment/2M95VS5D6F5WW';

export default function DonatePage() {
    useEffect(() => {
        const gl = document.createElement('script');
        gl.src = GIVE_LIVELY_WIDGET_URL;
        document.getElementsByTagName('head')[0].appendChild(gl);
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto font-[family-name:var(--font-space-grotesk)]">

            <section aria-labelledby="donate-heading" className="w-full mb-10">
                <h1 id="donate-heading" className="font-handjet text-5xl lg:text-7xl mb-4">
                    Support the mission
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-3">
                    Disconnect Madison is a 501(c)(3) nonprofit run by one person with no staff and no paid advertising. Your donation helps keep the site running, fund printed materials, and reach more people across Madison and beyond.
                </p>
                <p className="text-(--secondary-accent)">
                    All donations are tax-deductible. Every dollar goes directly toward the work.
                </p>
            </section>

            <section aria-labelledby="give-lively-heading" className="w-full mb-12">
                <h2 id="give-lively-heading" className="sr-only">Donation form</h2>
                <div id="give-lively-widget" className="gl-simple-donation-widget" />
            </section>

            <section aria-labelledby="paypal-heading" className="w-full border-t border-(--secondary-accent) pt-8 mb-10">
                <h2 id="paypal-heading" className="font-handjet text-3xl mb-3">Donate via PayPal</h2>
                <p className="text-(--secondary-accent) mb-5">
                    You can also give through PayPal. All PayPal donations go to the same place and are equally tax-deductible.
                </p>
                <a
                    id="paypal-donate-button"
                    href={PAYPAL_DONATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-amber-400/70 text-amber-300 font-medium px-6 py-3 rounded-sm hover:border-amber-400 hover:bg-amber-400/10 transition-colors no-underline"
                >
                    Donate with PayPal
                </a>
            </section>

        </div>
    );
}
