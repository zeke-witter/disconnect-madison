import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="w-full border-t border-(--accent-muted) mt-16 font-body">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div>
                        <h2 className="mb-3">
                            <Logo variant="primary" height={44} alt="Disconnect Madison" bare />
                        </h2>
                        <p className="text-sm text-(--muted)">
                            A registered 501(c)(3) nonprofit encouraging intentional choices about social media, AI, and screen time.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-bold mb-3">Pages</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/learn">Learn</a></li>
                            <li><a href="/learn/kids">Effects on kids</a></li>
                            <li><a href="/parents">Parents guide</a></li>
                            <li><a href="/learn/dependency">Device dependency</a></li>
                            <li><a href="/breathe">Breathe</a></li>
                            <li><a href="/help-yourself">How to reduce</a></li>
                            <li><a href="/quiz">Take the quiz</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/internship-2026">Internship 2026</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/pledge">Take the Pledge</a></li>
                            <li><a href="/before-you-go">How to quit</a></li>
                            <li><a href="/sources">Sources</a></li>
                            <li><a href="/news">News archive</a></li>
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
                            <li><a href="/grow">Help us grow</a></li>
                            <li><a href="/donate">Donate</a></li>
                            <li><a href="/pledge">Join our mailing list</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-(--accent-muted) pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-(--muted)">
                    <p>Disconnect Madison — Madison, WI</p>
                    <p>This site does not use cookies or track your activity.</p>
                </div>
            </div>
        </footer>
    );
}
