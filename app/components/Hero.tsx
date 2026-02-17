export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center text-center w-full font-space-grotesk text-xl">
      <div className="flex justify-center w-full max-w-7xl">
        <h1 className="font-handjet text-4xl sm:text-6xl md:text-8xl font-bold py-8">WE WERE PROMISED CONNECTION<br/><span className="text-5xl sm:text-7xl md:text-9xl">WE GOT THE ATTENTION ECONOMY</span></h1>
      </div>
      <div className="flex justify-center w-full max-w-5xl">
        <p>Social media platforms were built to capture and monetize our attention and personal data. Its makers have invested billions of dollars on platforms that reward <span className="font-bold">fear, outrage, and endless engagement</span>.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pt-6">
        <p>The social costs are hard to measure, but easy to feel.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl py-6">
        <p><span className="font-bold text-(--secondary-accent)">It doesn&apos;t need to be this way</span>, but change won&apos;t come from the top. It&apos;s up to us to protect ourselves and reengage with the world around us, <span className="border-b-5 border-(--primary-accent)">and we can</span>.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-6">
        <p>Join us in opting out of the attention economy and rediscover what <span className="font-bold">community</span> really means.</p>
      </div>
      <a href="/pledge" id="pledge-button" className="font-handjet text-3xl sm:text-5xl font-bold px-6 py-4 border-3 text-(--foreground) rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) max-w-md">PLEDGE TODAY</a>
    </div>
  );
}
