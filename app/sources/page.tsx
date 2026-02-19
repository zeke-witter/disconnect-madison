import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sources",
    description: "Peer-reviewed studies, institutional reports, and data analyses on the effects of social media.",
    alternates: { canonical: "/sources" },
};

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
                                <br /><em>Cyberpsychology, Behavior, and Social Networking</em>, 2016. [<a href="https://doi.org/10.1089/cyber.2016.0259" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Increases in depressive symptoms, suicide-related outcomes, and suicide rates among U.S. adolescents after 2010 and links to increased new media screen time.&rdquo;
                                <br /><em>Clinical Psychological Science</em>, 2018. [<a href="https://doi.org/10.1177/2167702617723376" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Association of screen time and depression in adolescence.&rdquo;
                                <br /><em>JAMA Pediatrics</em>, 2019. [<a href="https://doi.org/10.1001/jamapediatrics.2019.1759" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Sleep research</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Screen time and sleep among school-aged children and adolescents: A systematic literature review.&rdquo;
                                <br /><em>Sleep Medicine Reviews</em>, 2015. [<a href="https://doi.org/10.1016/j.smrv.2014.07.007" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Association between portable screen-based media device access or use and sleep outcomes: A systematic review and meta-analysis.&rdquo;
                                <br /><em>JAMA Pediatrics</em>, 2016. [<a href="https://doi.org/10.1001/jamapediatrics.2016.2341" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2014. [<a href="https://doi.org/10.1073/pnas.1418490112" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Attention &amp; cognition</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Brain drain: The mere presence of one&apos;s own smartphone reduces available cognitive capacity.&rdquo;
                                <br /><em>Journal of the Association for Consumer Research</em>, 2017. [<a href="https://doi.org/10.1086/691462" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Cognitive control in media multitaskers.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2009. [<a href="https://doi.org/10.1073/pnas.0903620106" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The attentional cost of receiving a cell phone notification.&rdquo;
                                <br /><em>Journal of Experimental Psychology: Human Perception and Performance</em>, 2015. [<a href="https://doi.org/10.1037/xhp0000100" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Dependency &amp; cognitive development</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Google effects on memory: Cognitive consequences of having information at our fingertips.&rdquo;
                                <br /><em>Science</em>, 2011. [<a href="https://doi.org/10.1126/science.1207745" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Cognitive offloading.&rdquo;
                                <br /><em>Trends in Cognitive Sciences</em>, 2016. [<a href="https://doi.org/10.1016/j.tics.2016.07.002" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Consequences of cognitive offloading: Boosting performance but diminishing memory.&rdquo;
                                <br /><em>Quarterly Journal of Experimental Psychology</em>, 2021. [<a href="https://doi.org/10.1177/17470218211008060" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Habitual use of GPS negatively impacts spatial memory during self-guided navigation.&rdquo;
                                <br /><em>Scientific Reports</em>, 2020. [<a href="https://doi.org/10.1038/s41598-020-62877-0" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Brain drain: The mere presence of one&rsquo;s own smartphone reduces available cognitive capacity.&rdquo;
                                <br /><em>Journal of the Association for Consumer Research</em>, 2017. [<a href="https://doi.org/10.1086/691462" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Effects of internet and smartphone addiction on cognitive control in adolescents and young adults: A systematic review of fMRI studies.&rdquo;
                                <br /><em>Neuroscience &amp; Biobehavioral Reviews</em>, 2024. [<a href="https://doi.org/10.1016/j.neubiorev.2024.105573" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The influence of smartphone use on tweens&rsquo; capacity for complex critical thinking.&rdquo;
                                <br /><em>Children</em>, 2023. [<a href="https://doi.org/10.3390/children10040698" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Smartphones and cognition: A review of research exploring the links between mobile technology habits and cognitive functioning.&rdquo;
                                <br /><em>Frontiers in Psychology</em>, 2017. [<a href="https://doi.org/10.3389/fpsyg.2017.00605" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The effects of over-reliance on AI dialogue systems on students&rsquo; cognitive abilities: A systematic review.&rdquo;
                                <br /><em>Smart Learning Environments</em>, 2024. [<a href="https://doi.org/10.1186/s40561-024-00316-7" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Generative AI can harm learning.&rdquo;
                                <br /><em>Wharton School Working Paper</em>, 2024. [<a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Beware of metacognitive laziness: Effects of generative artificial intelligence on learning motivation, processes, and performance.&rdquo;
                                <br /><em>British Journal of Educational Technology</em>, 2024. [<a href="https://doi.org/10.1111/bjet.13544" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Loneliness &amp; social effects</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Passive Facebook usage undermines affective well-being: Experimental and longitudinal evidence.&rdquo;
                                <br /><em>Journal of Experimental Psychology: General</em>, 2015. [<a href="https://doi.org/10.1037/xge0000057" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Facebook use predicts declines in subjective well-being in young adults.&rdquo;
                                <br /><em>PLOS ONE</em>, 2013. [<a href="https://doi.org/10.1371/journal.pone.0069841" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Social media use and perceived social isolation among young adults in the U.S.&rdquo;
                                <br /><em>American Journal of Preventive Medicine</em>, 2017. [<a href="https://doi.org/10.1016/j.amepre.2017.01.010" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Body image research</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Social comparisons on social media: The impact of Facebook on young women&apos;s body image concerns and mood.&rdquo;
                                <br /><em>Body Image</em>, 2015. [<a href="https://doi.org/10.1016/j.bodyim.2014.12.002" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Facebook knows Instagram is toxic for teen girls, company documents show.&rdquo;
                                <br /><em>The Wall Street Journal</em>, 2021. [<a href="https://www.wsj.com/articles/facebook-knows-instagram-is-toxic-for-teen-girls-company-documents-show-11631620739" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;A systematic review of the impact of the use of social networking sites on body image and disordered eating outcomes.&rdquo;
                                <br /><em>Body Image</em>, 2016. [<a href="https://doi.org/10.1016/j.bodyim.2016.02.008" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Algorithmic amplification &amp; polarization</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Emotion shapes the diffusion of moralized content in social networks.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2017. [<a href="https://doi.org/10.1073/pnas.1618923114" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Exposure to opposing views on social media can increase political polarization.&rdquo;
                                <br /><em>Proceedings of the National Academy of Sciences</em>, 2018. [<a href="https://doi.org/10.1073/pnas.1804840115" target="_blank">link</a>]
                            </li>
                            <li>
                                Testimony of Frances Haugen before the U.S. Senate Committee on Commerce, Science, and Transportation.
                                <br /><em>U.S. Senate</em>, 2021. [<a href="https://www.commerce.senate.gov/services/files/FC8A558E-824E-4914-BEDB-3A7B1190BD49" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Asymmetric ideological segregation in exposure to political news on Facebook.&rdquo;
                                <br /><em>Science</em>, 2023. [<a href="https://doi.org/10.1126/science.ade7138" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Data centers &amp; ecological impact</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                &ldquo;Recalibrating global data center energy-use estimates.&rdquo;
                                <br /><em>Science</em>, 2020. [<a href="https://doi.org/10.1126/science.aba3758" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The carbon footprint of streaming video: Fact-checking the headlines.&rdquo;
                                <br /><em>International Energy Agency</em>, 2020. [<a href="https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;Making AI less thirsty: Uncovering and addressing the secret water footprint of AI models.&rdquo;
                                <br /><em>arXiv preprint</em>, 2023. [<a href="https://arxiv.org/abs/2304.03271" target="_blank">link</a>]
                            </li>
                            <li>
                                &ldquo;The Energy Hunger of AI: Large Language Models as Challenges and Enablers for Sustainable Energy&rdquo;
                                <br /><em>Energies</em>, 2025. [<a href="https://doi.org/10.3390/en18174701" target="_blank">link</a>]
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 space-y-12">
                    <h2 className="font-bold text-xl mb-4 text-(--primary-accent)">Children &amp; adolescents</h2>

                    <h3 className="font-semibold text-lg mt-6 mb-3 text-(--secondary-accent)">Institutional advisories</h3>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            &ldquo;Social Media and Youth Mental Health: The U.S. Surgeon General&rsquo;s Advisory.&rdquo;
                            <br /><em>U.S. Department of Health and Human Services</em>, 2023. [<a href="https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Health Advisory on Social Media Use in Adolescence.&rdquo;
                            <br /><em>American Psychological Association</em>, 2023. [<a href="https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use.pdf" target="_blank">link</a>]
                        </li>
                    </ul>

                    <h3 className="font-semibold text-lg mt-6 mb-3 text-(--secondary-accent)">Brain development</h3>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            &ldquo;Association of habitual checking behaviors on social media with longitudinal functional brain development.&rdquo;
                            <br /><em>JAMA Pediatrics</em>, 2023. [<a href="https://doi.org/10.1001/jamapediatrics.2022.4924" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Media use and brain development during adolescence.&rdquo;
                            <br /><em>Nature Communications</em>, 2018. [<a href="https://doi.org/10.1038/s41467-018-03126-x" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Windows of developmental sensitivity to social media.&rdquo;
                            <br /><em>Nature Communications</em>, 2022. [<a href="https://doi.org/10.1038/s41467-022-29296-3" target="_blank">link</a>]
                        </li>
                    </ul>

                    <h3 className="font-semibold text-lg mt-6 mb-3 text-(--secondary-accent)">Mental health, self-harm &amp; suicide risk</h3>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            &ldquo;Frequent social media use and experiences with bullying victimization, persistent feelings of sadness or hopelessness, and suicide risk among high school students &mdash; Youth Risk Behavior Survey, United States, 2023.&rdquo;
                            <br /><em>MMWR Supplements (CDC)</em>, 2024. [<a href="https://doi.org/10.15585/mmwr.su7304a3" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Social media and suicide risk in youth.&rdquo;
                            <br /><em>JAMA Network Open</em>, 2024. [<a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2825340" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;A nationwide study on time spent on social media and self-harm among adolescents.&rdquo;
                            <br /><em>Scientific Reports</em>, 2023. [<a href="https://doi.org/10.1038/s41598-023-46370-y" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Social media use of adolescents who died by suicide: lessons from a psychological autopsy study.&rdquo;
                            <br /><em>Child and Adolescent Psychiatry and Mental Health</em>, 2023. [<a href="https://doi.org/10.1186/s13034-023-00597-9" target="_blank">link</a>]
                        </li>
                    </ul>

                    <h3 className="font-semibold text-lg mt-6 mb-3 text-(--secondary-accent)">Body image</h3>
                    <p>See above</p>

                    <h3 className="font-semibold text-lg mt-6 mb-3 text-(--secondary-accent)">Usage &amp; prevalence</h3>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            &ldquo;Teens, social media and technology 2023.&rdquo;
                            <br /><em>Pew Research Center</em>, 2023. [<a href="https://www.pewresearch.org/internet/2023/12/11/teens-social-media-and-technology-2023/" target="_blank">link</a>]
                        </li>
                        <li>
                            &ldquo;Association between screen time and depression in adolescence.&rdquo;
                            <br /><em>JAMA Pediatrics</em>, 2019. [<a href="https://doi.org/10.1001/jamapediatrics.2019.1759" target="_blank">link</a>]
                        </li>
                    </ul>
                </div>

            </section>
        </div>
    );
}
