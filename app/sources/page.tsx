export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section aria-labelledby="sources-heading" className="w-full">
                <h1 id="sources-heading" className="font-handjet text-5xl lg:text-7xl font-bold mb-3">
                    Research &amp; Sources
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-10">
                    This page compiles peer-reviewed studies, major institutional reports, and large-scale data analyses referenced on the{" "}
                    <a href="/learn">Learn</a> page.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Mental health</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;No more FOMO: Limiting social media decreases loneliness and depression.&rdquo;
                                <br /><em>Journal of Social and Clinical Psychology</em>, 2018. [<a href="https://doi.org/10.1521/jscp.2018.37.10.751" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The welfare effects of social media.&rdquo;
                                <br /><em>American Economic Review</em>, 2020. [<a href="https://doi.org/10.1257/aer.20190658" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The Facebook experiment: Quitting Facebook leads to higher levels of well-being.&rdquo;
                                <br /><em>Cyberpsychology, Behavior, and Social Networking</em>, 2016. [link]
                            </li>
                            <li>
                                &ldquo;Increases in depressive symptoms, suicide-related outcomes, and suicide rates among U.S. adolescents after 2010 and links to increased new media screen time.&rdquo;
                                <br /><em>Clinical Psychological Science</em>, 2018. [link]
                            </li>
                            <li>
                                &ldquo;Association of screen time and depression in adolescence.&rdquo;
                                <br /><em>JAMA Pediatrics</em>, 2019. [link]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Sleep research</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Screen time and sleep among school-aged children and adolescents: A systematic literature review.&rdquo;
                                <br /><em>Sleep Medicine Reviews</em>, 2015. [link]
                            </li>
                            <li>
                                &ldquo;Association between portable screen-based media device access or use and sleep outcomes: A systematic review and meta-analysis.&rdquo;
                                <br /><em>JAMA Pediatrics</em>, 2016. [link]
                            </li>
                            <li>
                                &ldquo;Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2014. [link]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Attention &amp; cognition</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Brain drain: The mere presence of one&apos;s own smartphone reduces available cognitive capacity.&rdquo;
                                <br /><em>Journal of the Association for Consumer Research</em>, 2017. [link]
                            </li>
                            <li>
                                &ldquo;Cognitive control in media multitaskers.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2009. [link]
                            </li>
                            <li>
                                &ldquo;The attentional cost of receiving a cell phone notification.&rdquo;
                                <br /><em>Journal of Experimental Psychology: Human Perception and Performance</em>, 2015. [link]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Loneliness &amp; social effects</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence.&rdquo;
                                <br /><em>Journal of Experimental Psychology: General</em>, 2015. [link]
                            </li>
                            <li>
                                &ldquo;Facebook use predicts declines in subjective well-being in young adults.&rdquo;
                                <br /><em>PLOS ONE</em>, 2013. [link]
                            </li>
                            <li>
                                &ldquo;Social media use and perceived social isolation among young adults in the U.S.&rdquo;
                                <br /><em>American Journal of Preventive Medicine</em>, 2017. [link]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Body image research</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Social comparisons on social media: The impact of Facebook on young women&apos;s body image concerns and mood.&rdquo;
                                <br /><em>Body Image</em>, 2015. [link]
                            </li>
                            <li>
                                &ldquo;Facebook knows Instagram is toxic for teen girls, company documents show.&rdquo;
                                <br /><em>The Wall Street Journal</em>, 2021. [link]
                            </li>
                            <li>
                                &ldquo;A systematic review of the impact of the use of social networking sites on body image and disordered eating outcomes.&rdquo;
                                <br /><em>Body Image</em>, 2016. [link]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Algorithmic amplification &amp; polarization</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Emotion shapes the diffusion of moralized content in social networks.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2017. [link]
                            </li>
                            <li>
                                &ldquo;Exposure to opposing views on social media can increase political polarization.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2018. [link]
                            </li>
                            <li>
                                Testimony of Frances Haugen before the U.S. Senate Committee on Commerce, Science, and Transportation.
                                <br /><em>U.S. Senate</em>, 2021. [link]
                            </li>
                            <li>
                                &ldquo;Asymmetric ideological segregation in exposure to political news on Facebook.&rdquo;
                                <br /><em>Science</em>, 2023. [link]
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Data centers &amp; ecological impact</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Recalibrating global data center energy-use estimates.&rdquo;
                                <br /><em>Science</em>, 2020. [link]
                            </li>
                            <li>
                                &ldquo;The carbon footprint of streaming video: Fact-checking the headlines.&rdquo;
                                <br /><em>International Energy Agency</em>, 2020. [link]
                            </li>
                            <li>
                                &ldquo;Making AI less thirsty: Uncovering and addressing the secret water footprint of AI models.&rdquo;
                                <br /><em>arXiv preprint</em>, 2023. [link]
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
