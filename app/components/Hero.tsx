import { getTranslations } from 'next-intl/server';

export default async function Hero() {
    const t = await getTranslations('hero');
    return (
        <div id="hero" className="flex flex-col items-center text-center w-full font-space-grotesk text-xl">
            <div className="flex justify-center w-full max-w-7xl">
                <h1 className="font-handjet text-4xl sm:text-4xl md:text-7xl py-8">
                    {t('headingLine1')}<br />
                    <span className="text-5xl sm:text-5xl md:text-8xl">{t('headingLine2')}</span>
                </h1>
            </div>
            <div className="flex justify-center w-full max-w-5xl">
                <p>{t('body1')}</p>
            </div>
            <div className="flex justify-center w-full max-w-5xl pt-6">
                <p className="font-bold text-(--secondary-accent) text-2xl">{t('body2')}</p>
            </div>
            <div className="flex justify-center w-full max-w-5xl py-6">
                <p>{t('body3')}</p>
            </div>
            <div className="flex justify-center w-full max-w-5xl pb-8">
                <p>{t('body4')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
                <a href="/pledge" id="pledge-button" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 text-[#EDEBE6] rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) flex-1 text-center">{t('ctaPledge')}</a>
                <a href="/quiz" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 border-(--primary-accent) text-(--primary-accent) rounded-md hover:bg-(--primary-accent)/10 transition-colors flex-1 text-center">{t('ctaQuiz')}</a>
            </div>
        </div>
    );
}
