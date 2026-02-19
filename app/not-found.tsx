import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto font-[family-name:var(--font-space-grotesk)]">
            <section className="w-full mb-16">
                <h1 className="font-handjet text-5xl lg:text-7xl font-bold mb-4">
                    Page not found
                </h1>
                <p className="text-lg text-(--secondary-accent) mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has moved.
                </p>
                <Link
                    href="/"
                    className="underline text-(--primary-accent) hover:text-(--primary-accent-hover)"
                >
                    Go back home
                </Link>
            </section>
        </div>
    );
}
