import Hero from "./components/Hero";
import PledgeCounter from "./components/PledgeCounter";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 text-center justify-center w-full sm:items-start sm:text-left">
      <PledgeCounter />
      <Hero />
    </div>
  );
}
