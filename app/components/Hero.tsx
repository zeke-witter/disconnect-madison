export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center text-center w-full font-space-grotesk text-xl">
      <div className="flex justify-center w-full max-w-7xl">
        <h1 className="font-handjet text-4xl sm:text-4xl md:text-7xl font-bold py-8">DISCONNECT FROM THE ATTENTION ECONOMY<br /><span className="text-5xl sm:text-5xl md:text-8xl">RECONNECT WITH THE WORLD AROUND YOU</span></h1>
      </div>
      <div className="flex justify-center w-full max-w-5xl">
        <p>Social media platforms were built to capture and monetize our attention at any cost. They have invested billions of dollars on technology that rewards outrage and disinformation, disrupts our mental wellbeing, and isolates us from our communities.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pt-6">
        <p className="font-bold text-(--secondary-accent) text-2xl">The social costs are hard to measure, but easy to feel.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl py-6">
        <p>It doesn&apos;t need to be this way, but change won&apos;t come from the top. It&apos;s up to us to protect ourselves and reengage with the world around us, <span className="border-b-5 border-(--primary-accent)">and we can</span>.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-6">
        <p>Join us in opting out of the attention economy and rediscover what community really means.</p>
      </div>
      <a href="/pledge" id="pledge-button" className="font-handjet text-3xl sm:text-5xl font-bold px-6 py-4 border-3 text-(--foreground) rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) max-w-md">PLEDGE TODAY</a>
    </div>
  );
}
