import { getTranslations } from 'next-intl/server';

export default async function Footer() {
    const t = await getTranslations('footer');
    return (
        <footer className="w-full border-t border-(--secondary-accent) mt-16 font-[family-name:var(--font-space-grotesk)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <p className="font-handjet text-2xl font-bold mb-3">Disconnect Madison</p>
                        <p className="text-sm text-(--secondary-accent)">{t('tagline')}</p>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">{t('pagesHeading')}</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/learn">{t('learn')}</a></li>
                            <li><a href="/learn/kids">{t('effectsOnKids')}</a></li>
                            <li><a href="/learn/dependency">{t('deviceDependency')}</a></li>
                            <li><a href="/breathe">{t('breathe')}</a></li>
                            <li><a href="/help-yourself">{t('howToHelpYourself')}</a></li>
                            <li><a href="/quiz">{t('takeTheQuiz')}</a></li>
                            <li><a href="/faq">{t('faq')}</a></li>
                            <li><a href="/about">{t('about')}</a></li>
                            <li><a href="/pledge">{t('takeThePledge')}</a></li>
                            <li><a href="/sources">{t('sources')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">{t('resourcesHeading')}</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://support.apple.com/guide/iphone/set-up-screen-time-iphbfa595995/ios" target="_blank" rel="noopener noreferrer">{t('iphoneScreenTime')}</a></li>
                            <li><a href="https://support.google.com/android/answer/9346420" target="_blank" rel="noopener noreferrer">{t('androidWellbeing')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">{t('contactHeading')}</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/contact">{t('contactUs')}</a></li>
                            <li><a href="/grow">{t('helpUsGrow')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-(--secondary-accent) pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-(--secondary-accent)">
                    <p>Disconnect Madison — Madison, WI</p>
                    <p>{t('noCookies')}</p>
                </div>
            </div>
        </footer>
    );
}
