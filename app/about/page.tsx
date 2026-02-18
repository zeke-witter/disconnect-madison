import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import founderPhoto from "@/public/founder.jpg";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Disconnect Society's mission to help people free themselves from social media dependence and reconnect with real life.",
    alternates: { canonical: "/about" },
};

export default function Page() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-10 w-full">About Disconnect Society</h1>

            <section aria-labelledby="mission" className="w-full mb-12">
                <h2 id="mission" className="font-bold text-2xl mb-4 text-(--primary-color)">Our mission</h2>
                <p className="mb-4">
                    We believe that widespread dependence on algorithm-driven social media is harming our wellbeing and eroding our ability to meaningfully connect with the world around us.
                </p>
                <p className="mb-4">
                    Our aim is simply to <span className="font-bold">help people</span> by reducing that dependency through intentional choice and solidarity.
                </p>
                <p>
                    The pledge at the center of this project is voluntary and self-directed. We hope you&apos;ll join us in working toward a culture where we spend our most valuable resource (our time) in the real world, rather than the digital one. 
                </p>
            </section>

            <section aria-labelledby="what-this-is" className="w-full mb-12">
                <h2 id="what-this-is" className="font-bold text-2xl mb-4 text-(--primary-color)">What this is and what it isn&apos;t</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold mb-2">This is:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>A voluntary commitment</li>
                            <li>A civic experiment</li>
                            <li>A cultural statement</li>
                            <li>A call to live more intentionally</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">This is not:</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>A business</li>
                            <li>A social media platform</li>
                            <li>A moral purity test</li>
                        </ul>
                    </div>
                </div>
                <p className="mt-4">This is about <span className="italic">helping</span> people, not judging them. We&apos;re all in this boat together.</p>
            </section>

            <section aria-labelledby="who" className="w-full mb-12">
                <h2 id="who" className="font-bold text-2xl mb-4 text-(--primary-color)">Who is Disconnect Society?</h2>
                <div>
                    <Image
                        src={founderPhoto}
                        alt="Photo of the founder"
                        className="float-left w-40 h-auto rounded-md mr-6 mb-4"
                    />
                    <p className="mb-4">
                        Disconnect Society was founded by one person in Madison, WI. It is not funded by investors. It is not a political organization. It is not affiliated with any technology company or competitor. It is not selling a product.
                    </p>
                    <p className="mb-4">
                        I started this project because I noticed changes in myself that I didn&apos;t like, and I <span className="italic">knew</span> those changes were directly connected to how I spent my time online. I felt more isolated than ever — more anxious, more depressed, and angrier. I was losing hours of my life to content that I wouldn&apos;t remember later that day, finding it harder to focus on one thing at a time, and getting less satisfaction from activities I used to love.
                    </p>
                    <p className="mb-4">For several years I listened to the people in my life voice similar concerns, and I finally decided the price I was paying for dopamine on social media was too high. I started deleting accounts one at a time and found I didn&apos;t miss them, and in 2025 I finally deleted my last social media account. <span className="font-bold">I haven&apos;t looked back</span>.</p>
                    <p>
                        With every account I deleted, I reclaimed a little bit more of myself. I read more and slept better. I started talking to the people who live and work in my neighborhood. I became more present and intentional. My hope is this project will help other people improve their mental wellbeing, and know they aren&apos;t alone in the pursuit.
                    </p>
                </div>
            </section>

            <section className="w-full mb-8 text-center">
                <p className="text-lg text-(--secondary-accent) mb-4">
                    If any of this resonates with you, consider taking the <Link href="/pledge">pledge</Link>.
                </p>
                <p className="text-lg text-(--secondary-accent)">
                    If you&apos;ve already stepped away and want to share your story, we&apos;d love to hear it. <Link href="/contact" className="underline text-(--primary-color)">Send us a message</Link>.
                </p>
            </section>
        </div>
    );
}
