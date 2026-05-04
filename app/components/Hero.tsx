export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center text-center w-full font-space-grotesk text-xl">
      <div className="flex justify-center w-full max-w-7xl">
        <h1 className="font-handjet text-4xl sm:text-4xl md:text-7xl py-8">HELLO TANISHA<br /><span className="text-5xl sm:text-5xl md:text-8xl">WHAT IS IT GETTING FROM YOU?</span></h1>
      </div>
      <div className="flex justify-center w-full max-w-6xl">
        <p>Most of us use it out of habit or social pressure more than intention. While social media <em>can</em> connect people, the platforms aren&apos;t designed around your wellbeing. They&apos;re designed around your attention, and they&apos;re very good at keeping it.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pt-6">
        <p className="font-bold text-(--secondary-accent) text-2xl">The price you&apos;re paying may surprise you.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl py-6">
        <p>This project started with one person deleting accounts one by one and finding that life quietly got better. It&apos;s a growing community of people choosing intention over habit, and we aim to help as many people as we can.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-8">
        <p>Take the quiz if you&apos;re curious where you stand. Make a <span className="font-bold">FREE</span> pledge if you&apos;re ready to try something different.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
        <a href="/pledge" id="pledge-button" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 text-[#EDEBE6] rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) flex-1 text-center">PLEDGE TODAY</a>
        <a href="/quiz" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 border-(--primary-accent) text-(--primary-accent) rounded-md hover:bg-(--primary-accent)/10 transition-colors flex-1 text-center">TAKE THE QUIZ</a>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-8">
        <p className="text-xs text-(--secondary-accent) pt-6">
          A registered 501(c)(3) nonprofit. Nothing to sell you, no tracking, no data collection, no spam. This is <em>truly</em> free.
        </p>
      </div>
    </div>
  );
}
