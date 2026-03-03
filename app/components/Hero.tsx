export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center text-center w-full font-space-grotesk text-xl">
      <div className="flex justify-center w-full max-w-7xl">
        <h1 className="font-handjet text-4xl sm:text-4xl md:text-7xl font-bold py-8">WHAT ARE YOU GETTING FROM SOCIAL MEDIA?<br /><span className="text-5xl sm:text-5xl md:text-8xl">WHAT IS IT GETTING FROM YOU?</span></h1>
      </div>
      <div className="flex justify-center w-full max-w-5xl">
        <p>Most of us use it out of habit more than intention. And while social media can connect people, the platforms aren&apos;t designed around your wellbeing. They&apos;re built around your attention, and they&apos;re very good at keeping it.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pt-6">
        <p className="font-bold text-(--secondary-accent) text-2xl">The consequences are hard to measure, but easy to feel.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl py-6">
        <p>This project started with one person deleting accounts one by one, and finding that life quietly got better. It&apos;s grown into a small community of people making the same experiment, and we aim to help as many people as we can.</p>
      </div>
      <div className="flex justify-center w-full max-w-5xl pb-8">
        <p>Take the quiz if you&apos;re curious where you stand. Make a pledge if you&apos;re ready to try something different.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
        <a href="/pledge" id="pledge-button" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 text-[#EDEBE6] rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) flex-1 text-center">PLEDGE TODAY</a>
        <a href="/quiz" className="font-handjet text-3xl sm:text-4xl font-bold px-6 py-4 border-3 border-(--primary-accent) text-(--primary-accent) rounded-md hover:bg-(--primary-accent)/10 transition-colors flex-1 text-center">TAKE THE QUIZ</a>
      </div>
    </div>
  );
}
