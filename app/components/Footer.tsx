export default function Footer() {
    return (
        <footer className="w-full border-t border-(--secondary-accent) mt-16 font-[family-name:var(--font-space-grotesk)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <p className="font-handjet text-2xl font-bold mb-3">Disconnect Society</p>
                        <p className="text-sm text-(--secondary-accent)">
                            A community project encouraging intentional choices about social media and screen time.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">Pages</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/learn">Learn</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/pledge">Take the Pledge</a></li>
                            <li><a href="/sources">Sources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">Resources</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://support.apple.com/guide/iphone/set-up-screen-time-iphbfa595995/ios" target="_blank" rel="noopener noreferrer">iPhone Screen Time</a></li>
                            <li><a href="https://support.google.com/android/answer/9346420" target="_blank" rel="noopener noreferrer">Android Digital Wellbeing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">Get in touch</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/contact">Contact us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-(--secondary-accent) pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-(--secondary-accent)">
                    <p>Disconnect Society — Madison, WI</p>
                    <p>This site does not use cookies or track your activity.</p>
                </div>
            </div>
        </footer>
    );
}
