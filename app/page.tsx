import Hero from "./components/Hero";
import KidsCallout from "./components/KidsCallout";
import PledgeCounter from "./components/PledgeCounter";
import NewsCarousel from "@/app/components/NewsCarousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 text-center justify-center w-full sm:items-start sm:text-left">
      <PledgeCounter />
      <Hero />
      <KidsCallout />
      <NewsCarousel />
    </div>
  );
}
