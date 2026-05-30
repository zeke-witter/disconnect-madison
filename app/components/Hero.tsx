export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center text-center w-full font-body text-xl">
      <div className="flex justify-center w-full max-w-7xl">
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl py-8">THERE&apos;S NEVER BEEN A BETTER TIME TO DISCONNECT</h1>
      </div>
      <div className="flex justify-center w-full max-w-6xl">
        <p>Most of us are spending more time with our screens than we consciously chose. Social media, streaming, and constant notifications are quietly shaping how we think, sleep, and connect with the people around us.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pt-6">
        <p className="font-accent text-3xl sm:text-4xl text-forest">You&apos;re not the only one who noticed.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl py-6">
        <p>This is a growing community of people choosing to step back and reconnect with the world around us. Whether you want to reduce your screen time, take a break from social media, or quit for good, you don&apos;t have to do it alone.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
        <a href="/pledge" id="pledge-button" className="font-display text-3xl sm:text-4xl font-bold px-6 py-4 border-3 border-(--accent) text-(--on-cta) rounded-md bg-cta hover:bg-cta-hover flex-1 text-center">PLEDGE TODAY</a>
        <a href="/quiz" className="font-display text-3xl sm:text-4xl font-bold px-6 py-4 border-3 border-(--accent) text-(--accent) rounded-md hover:bg-(--accent)/10 transition-colors flex-1 text-center">TAKE THE QUIZ</a>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-8">
        <p className="text-xs text-(--muted) pt-6">
          A registered 501(c)(3) nonprofit. Nothing to sell you, no tracking, no data collection, no spam. This is <em>truly</em> free.
        </p>
      </div>
    </div>
  );
}
