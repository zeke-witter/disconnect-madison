export default function Hero() {
  return (
    <div id="hero" className="flex flex-col justify-center text-center w-full font-space-grotesk text-xl">
      <h1 className="font-handjet text-9xl font-bold py-8">SOCIAL MEDIA IS BAD FOR US</h1>
      <p className="lg:px-12">It was meant to <span className="font-bold">connect us</span>. Instead its makers have invested billions of dollars to keep you <span className="font-bold">addicted, distracted, and burned out</span> while they get rich by exploiting your attention. Meanwhile every platform is abused by monied interests who flood them with disinformation, rage bait, and fear mongering.</p>  
      <p className="lg:px-12 py-6"><span className="font-bold text-(--primary-accent)">No one is coming to save us from these abuses</span>. It's up to us to save ourselves, <span className="border-b-5 border-(--primary-accent)">AND WE CAN</span>.</p>
      <p className="lg:px-12 pb-6">Join us in opting out of the exploitation economy and rediscover what <span className="font-bold">COMMUNITY</span> really means.</p>
      <a href="/pledge" className="self-center font-handjet text-5xl font-bold px-6 py-4 border-3 rounded-md bg-(--primary-accent) hover:bg-(--primary-accent-hover) max-w-md">PLEDGE TODAY</a>
    </div>
  );
}