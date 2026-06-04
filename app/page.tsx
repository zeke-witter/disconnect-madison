import Hero from "./components/Hero";
import KidsCallout from "./components/KidsCallout";
import PledgeCounter from "./components/PledgeCounter";
import NewsCarousel from "@/app/components/NewsCarousel";
import Doodle from "./components/Doodle";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 text-center justify-center w-full sm:items-start sm:text-left">
      <PledgeCounter />
      <Hero />

      {/*
        Full-width doodle strip anchored at the hero's bottom edge.
        h-0 + -mt-6 cancels the flex gap so the strip takes no layout space.
        Negative horizontal margins escape the main padding so doodles reach
        the true left/right edges of the content area (sidebar boundary).
        overflow-visible lets elements extend upward into the hero's margins.

        Cluster shape: 4-wide base row → 2-wide middle → 1 lone doodle at top.
        All elements stay within the ~220px side margins of the max-w-2xl CTA row.
      */}
      <div className="relative h-0 -mt-6 -mx-4 sm:-mx-8 lg:-mx-16 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)]">

        {/* ── Bottom-left cluster ── */}

        {/* Base row — 4 doodles at hero bottom, spreading right from the left edge */}
        <Doodle src="path_04.png"    className="bottom-2  left-0          w-14  rotate-[5deg]" />
        <Doodle src="wave_03.png"    className="bottom-0  left-12         w-14 -rotate-[8deg]" />
        <Doodle src="blob_02.png"    className="bottom-3  left-[6.5rem]   w-12  rotate-[14deg]" />
        <Doodle src="arch_01.png"    className="bottom-1  left-[11rem]    w-11 -rotate-[5deg]" />

        {/* Middle — 2 doodles, drifting inward and upward */}
        <Doodle src="leaf_04.png"    className="bottom-16 left-4          w-14  rotate-[20deg]" />
        <Doodle src="rainbow_02.png" className="bottom-20 left-[5rem]     w-12  rotate-[6deg]" />

        {/* Top — 1 lone doodle at the outermost-highest point */}
        <Doodle src="stones_04.png"  className="bottom-36 left-2          w-11 -rotate-[10deg]" />

        {/* ── Bottom-right cluster ── */}

        {/* Base row */}
        <Doodle src="seaweed_03.png"   className="bottom-2  right-0        w-12 -rotate-[8deg]" />
        <Doodle src="grass_04.png"     className="bottom-0  right-12       w-14  rotate-[10deg]" />
        <Doodle src="sun_01.png"       className="bottom-4  right-[6.5rem] w-14  rotate-[14deg]" />
        <Doodle src="landscape_02.png" className="bottom-1  right-[11rem]  w-12 -rotate-[6deg]" />

        {/* Middle */}
        <Doodle src="rainbow_01.png"   className="bottom-20 right-4        w-12  rotate-[8deg]" />
        <Doodle src="blob_04.png"      className="bottom-16 right-[5rem]   w-14 -rotate-[14deg]" />

        {/* Top */}
        <Doodle src="seaweed_02.png"   className="bottom-36 right-2        w-11  rotate-[6deg]" />

      </div>

      <KidsCallout />
      <NewsCarousel />
    </div>
  );
}
